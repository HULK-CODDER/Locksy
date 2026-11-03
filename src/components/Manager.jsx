import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
 const API_URL = import.meta.env.VITE_API_URL || 'https://locksy-kpb4.onrender.com';
  const ref = useRef()
  const passref = useRef()
  const [save, setsave] = useState("Save")
  const [form, setform] = useState({ site: "", name: "", pass: "" })
  const [passwordarray, setpasswordarray] = useState([])

  const getPasswords = async () => {
    try {
      const req = await fetch(API_URL);
      const passwords = await req.json();
      setpasswordarray(passwords);
    } catch (error) {
      console.error('Failed to fetch passwords:', error);
    }
  };

  useEffect(() => {
    getPasswords()
  }, [])

  const copytext = (text) => {
    navigator.clipboard.writeText(text)
  }

  const showpassword = () => {
    if (ref.current.src.includes('show.gif')) {
      ref.current.src = '../hide.gif'
      passref.current.type = "text"
    } else {
      ref.current.src = '../show.gif'
      passref.current.type = "password"
    }
  }

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const savepassword = async () => {
    const id = uuidv4();
    const password = { ...form, id };

    setpasswordarray([...passwordarray, password]);

    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(password)
    });

    setform({ site: "", name: "", pass: "" });
    setsave("Save");
  };

  const deletepassword = async (id) => {
    let c = confirm('Are you sure?');

    if (c) {
      setpasswordarray(
        passwordarray.filter(items => items.id !== id)
      );

      await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });
    }
  };

  const editpassword = async (id) => {
    const passwordToEdit = passwordarray.find(item => item.id === id);

    if (!passwordToEdit) return;

    await fetch(API_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });

    setform(passwordToEdit);

    setpasswordarray(
      passwordarray.filter(item => item.id !== id)
    );

    setsave("Edit");
  };

  return (
    <div className='flex justify-center items-center flex-col w-full px-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl sm:text-5xl font-bold text-[#92c6f9] mt-6 sm:mt-10 text-center'>
        <span className='text-[#2f0bef]'>&lt;</span>
        <span>Lock</span>
        <span className='text-[#2f0bef]'>s</span>
        <span className='text-[#7e05ec]'>y</span>
        <span className='text-[#2f0bef]'>/</span>
        <span className='text-[#2f0bef]'>&gt;</span>
      </h1>
      <p className='text-black mt-2 text-sm sm:text-base text-center'>Manage your own passwords</p>

      {/* Input Form Section */}
      <div className='mt-4 flex flex-col gap-3 p-4 sm:p-5 w-full max-w-xl'>
        <input 
          value={form.site} 
          onChange={handlechange} 
          className='w-full border-2 border-[#7e05ec] p-3 rounded-2xl outline-none text-sm sm:text-base' 
          type="text" 
          name='site' 
          placeholder='URL' 
        />
        
        <div className='flex flex-col sm:flex-row gap-3 relative'>
          <input 
            value={form.name} 
            onChange={handlechange} 
            className='w-full sm:w-1/2 border-3 border-[#6193c5] rounded-2xl p-3 outline-none text-sm sm:text-base' 
            type="text" 
            name='name' 
            placeholder='username' 
          />
          <div className='relative w-full sm:w-1/2 flex items-center'>
            <input 
              ref={passref} 
              value={form.pass} 
              onChange={handlechange} 
              className='w-full border-3 border-[#6193c5] rounded-2xl p-3 pr-12 outline-none text-sm sm:text-base' 
              type="password" 
              name='pass' 
              placeholder='password' 
            />
            <span>
              <img 
                ref={ref} 
                className='absolute right-3 top-3.5 w-7 mix-blend-darken contrast-125 cursor-pointer' 
                src="../show.gif" 
                onClick={showpassword} 
                alt="toggle visibility" 
              />
            </span>
          </div>
        </div>

        <button 
          onClick={savepassword} 
          className='button_add mix-blend-darken contrast-125 flex items-center justify-center gap-2 cursor-pointer mt-1'
        >
          <img className='mix-blend-darken contrast-125 w-8 sm:w-10' src="../add.gif" alt="" />
          {save}
        </button>
      </div>

      {/* Password Table Section */}
      <div className="passwordtable mt-4 h-[35vh] sm:h-[40vh] overflow-x-auto overflow-y-auto scrollbar-hide w-full flex justify-center items-start relative px-2">
        {passwordarray.length === 0 && <div className="text-gray-600 text-sm sm:text-base">No passwords are saved yet</div>}
        {passwordarray.length !== 0 &&
          <table className="text-left border-collapse border w-full min-w-[650px] text-sm sm:text-base">
            <thead>
              <tr className="border-b border-gray-300 bg-[#7e05ec] text-white">
                <th className="p-3">Site</th>
                <th className="p-3">Username</th>
                <th className="p-3">Password</th>
                <th className="p-3 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className='overflow-auto scroll bg-[#cac5ef]'>
              {passwordarray.map((items) => {
                return <tr key={items.id} className="border-b border-gray-200">
                  <td className="p-3 border relative max-w-[150px] sm:max-w-xs truncate">
                    <a className="hover:underline text-blue-900 font-medium" href={items.site.startsWith('http') ? items.site : `https://${items.site}`} target='_blank' rel='noreferrer'>{items.site}</a>
                    <img onClick={() => copytext(items.site)} className='w-7 sm:w-8 mix-blend-darken contrast-125 absolute top-[25%] cursor-pointer active:scale-85 right-3' src="../copy.gif" alt="copy site" />
                  </td>
                  <td className="p-3 border relative max-w-[120px] sm:max-w-xs truncate">
                    {items.name} 
                    <img onClick={() => copytext(items.name)} className='mix-blend-darken contrast-125 w-7 sm:w-8 absolute top-[25%] cursor-pointer active:scale-85 right-3' src="../copy.gif" alt="copy username" />
                  </td>
                  <td className="p-3 border relative">
                    {"•".repeat(items.pass.length)} 
                    <img onClick={() => copytext(items.pass)} className='mix-blend-darken contrast-125 w-7 sm:w-8 absolute top-[25%] cursor-pointer active:scale-85 right-3' src="../copy.gif" alt="copy password" />
                  </td>
                  <td className="p-3 border relative">
                    <span className='w-full flex items-center justify-end gap-2 sm:gap-3 pr-2'>
                      <img onClick={() => { deletepassword(items.id) }} className='w-7 sm:w-8 cursor-pointer active:scale-90 mix-blend-darken contrast-125' src="../delete.gif" alt="delete" />
                      <img onClick={() => { editpassword(items.id) }} className='w-7 sm:w-8 cursor-pointer active:scale-90 mix-blend-darken contrast-125' src="../edit.gif" alt="edit" />
                    </span>
                  </td>
                </tr>
              })}
            </tbody>
          </table>}
      </div>
    </div>
  )
}

export default Manager
