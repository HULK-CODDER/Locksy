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
    <div className='flex justify-center items-center flex-col w-full px-4 max-w-5xl mx-auto pb-10'>
      <h1 className='text-3xl sm:text-5xl font-bold text-[#92c6f9] mt-6 sm:mt-10 text-center'>
        <span className='text-[#2f0bef]'>&lt;</span>
        <span>Lock</span>
        <span className='text-[#2f0bef]'>s</span>
        <span className='text-[#7e05ec]'>y</span>
        <span className='text-[#2f0bef]'>/</span>
        <span className='text-[#2f0bef]'>&gt;</span>
      </h1>
      <p className='text-black mt-2 text-sm sm:text-base text-center font-medium'>Manage your own passwords securely</p>

      {/* Input Form Section */}
      <div className='mt-4 flex flex-col gap-3 p-4 sm:p-6 w-full max-w-xl bg-white/60 backdrop-blur-md rounded-3xl shadow-lg border border-purple-100'>
        <input 
          value={form.site} 
          onChange={handlechange} 
          className='w-full border-2 border-[#7e05ec] p-3 rounded-2xl outline-none text-sm sm:text-base bg-white' 
          type="text" 
          name='site' 
          placeholder='URL (e.g., https://google.com)' 
        />
        
        <div className='flex flex-col sm:flex-row gap-3 relative'>
          <input 
            value={form.name} 
            onChange={handlechange} 
            className='w-full sm:w-1/2 border-3 border-[#6193c5] rounded-2xl p-3 outline-none text-sm sm:text-base bg-white' 
            type="text" 
            name='name' 
            placeholder='Username' 
          />
          <div className='relative w-full sm:w-1/2 flex items-center'>
            <input 
              ref={passref} 
              value={form.pass} 
              onChange={handlechange} 
              className='w-full border-3 border-[#6193c5] rounded-2xl p-3 pr-12 outline-none text-sm sm:text-base bg-white' 
              type="password" 
              name='pass' 
              placeholder='Password' 
            />
            <span>
              <img 
                ref={ref} 
                className='absolute right-3 top-1/2 -translate-y-1/2 w-7 mix-blend-darken contrast-125 cursor-pointer hover:scale-110 transition-transform' 
                src="../show.gif" 
                onClick={showpassword} 
                alt="toggle visibility" 
              />
            </span>
          </div>
        </div>

        <button 
          onClick={savepassword} 
          className='button_add mix-blend-darken contrast-125 flex items-center justify-center gap-2 cursor-pointer mt-2 py-2 rounded-2xl font-semibold'
        >
          <img className='mix-blend-darken contrast-125 w-8 sm:w-9' src="../add.gif" alt="" />
          {save}
        </button>
      </div>

      {/* Password Table Section */}
      <div className="w-full mt-8">
        <h2 className='text-xl sm:text-2xl font-bold text-[#7e05ec] mb-3 text-center sm:text-left'>Your Vault</h2>
        
        {passwordarray.length === 0 && (
          <div className="text-gray-600 text-center py-8 bg-white/40 rounded-2xl border border-gray-200 text-sm sm:text-base">
            No passwords are saved yet 🔒
          </div>
        )}

        {passwordarray.length !== 0 && (
          <div className="shadow-xl rounded-2xl overflow-hidden border border-[#7e05ec]/20 bg-white">
            <div className="overflow-x-auto max-h-[45vh] scrollbar-hide">
              <table className="w-full text-left border-collapse min-w-[700px] text-sm sm:text-base">
                <thead>
                  <tr className="bg-[#7e05ec] text-white uppercase text-xs sm:text-sm tracking-wider">
                    <th className="p-3.5 sm:p-4">Site</th>
                    <th className="p-3.5 sm:p-4">Username</th>
                    <th className="p-3.5 sm:p-4">Password</th>
                    <th className="p-3.5 sm:p-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {passwordarray.map((items) => {
                    return (
                      <tr key={items.id} className="hover:bg-[#cac5ef]/20 transition-colors">
                        <td className="p-3.5 sm:p-4 relative pr-12 max-w-[100px] sm:max-w-xs truncate">
                          <a 
                            className="hover:underline text-blue-900 font-medium truncate block" 
                            href={items.site.startsWith('http') ? items.site : `https://${items.site}`} 
                            target='_blank' 
                            rel='noreferrer'
                          >
                            {items.site}
                          </a>
                          <img 
                            onClick={() => copytext(items.site)} 
                            className='w-6 sm:w-7 mix-blend-darken contrast-125 absolute top-1/2 -translate-y-1/2 cursor-pointer active:scale-85 right-3 hover:scale-110 transition-transform' 
                            src="../copy.gif" 
                            alt="copy site" 
                          />
                        </td>
                        <td className="p-3.5 sm:p-4 relative pr-12 max-w-[150px] sm:max-w-xs truncate text-gray-700">
                          {items.name} 
                          <img 
                            onClick={() => copytext(items.name)} 
                            className='w-6 sm:w-7 mix-blend-darken contrast-125 absolute top-1/2 -translate-y-1/2 cursor-pointer active:scale-85 right-3 hover:scale-110 transition-transform' 
                            src="../copy.gif" 
                            alt="copy username" 
                          />
                        </td>
                        <td className="p-3.5 sm:p-4 relative pr-12 text-gray-700 font-mono">
                          {"•".repeat(items.pass.length)} 
                          <img 
                            onClick={() => copytext(items.pass)} 
                            className='w-6 sm:w-7 mix-blend-darken contrast-125 absolute top-1/2 -translate-y-1/2 cursor-pointer active:scale-85 right-3 hover:scale-110 transition-transform' 
                            src="../copy.gif" 
                            alt="copy password" 
                          />
                        </td>
                        <td className="p-3.5 sm:p-4 relative">
                          <span className='w-full flex items-center justify-end gap-3 pr-2'>
                            <img 
                              onClick={() => { deletepassword(items.id) }} 
                              className='w-7 sm:w-8 cursor-pointer active:scale-90 hover:scale-110 transition-transform mix-blend-darken contrast-125' 
                              src="../delete.gif" 
                              alt="delete" 
                            />
                            <img 
                              onClick={() => { editpassword(items.id) }} 
                              className='w-7 sm:w-8 cursor-pointer active:scale-90 hover:scale-110 transition-transform mix-blend-darken contrast-125' 
                              src="../edit.gif" 
                              alt="edit" 
                            />
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Manager
