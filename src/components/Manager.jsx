import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
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
    <div className='flex justify-center items-center flex-col w-screen'>
      <h1 className='text-5xl font-bold text-[#92c6f9] mt-10'>
        <span className='text-[#2f0bef]'>&lt;</span>
        <span>Lock</span>
        <span className='text-[#2f0bef]'>s</span>
        <span className='text-[#7e05ec]'>y</span>
        <span className='text-[#2f0bef]'>/</span>
        <span className='text-[#2f0bef]'>&gt;</span>
      </h1>
      <p className='text-black mt-2'>Manage your own passwords</p>

      <div className='mt-4 flex flex-col gap-2.5 p-5'>
        <input value={form.site} onChange={handlechange} className='w-full border-2 border-[#7e05ec] p-3 rounded-2xl' type="text" name='site' placeholder='URL' />
        <div className='relative'>
          <input value={form.name} onChange={handlechange} className='border-3 border-[#6193c5] mr-2 rounded-2xl p-2' type="text" name='name' placeholder='username' />
          <input ref={passref} value={form.pass} onChange={handlechange} className='border-3 border-[#6193c5] ml-2 rounded-2xl p-2' type="password" name='pass' placeholder='password' />
          <span>
            <img ref={ref} className='absolute right-3 top-2 w-7.5 cursor-pointer' src="../show.gif" onClick={showpassword} alt="" />
          </span>
        </div>
        <button onClick={savepassword} className='button_add'><img className='w-10' src="../add.gif" alt="" />{save}</button>
      </div>

      <div className="passwordtable mt-3 h-[30vh] overflow-auto scrollbar-hide w-screen flex justify-center items-start relative">
        {passwordarray.length === 0 && <div>No passwords are saved yet </div>}
        {passwordarray.length !== 0 &&
          <table className="text-left border-collapse border w-10/12">
            <thead>
              <tr className="border-b border-gray-300 bg-[#7e05ec]">
                <th className="p-3">Site</th>
                <th className="p-3">Username</th>
                <th className="p-3">Password</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className='overflow-auto scroll h-[10vh] bg-[#cac5ef]'>
              {passwordarray.map((items) => {
                return <tr key={items.id} className="border-b border-gray-200">
                  <td className="p-3 border relative">
                    <a href={items.site.startsWith('http') ? items.site : `https://${items.site}`} target='_blank' rel='noreferrer'>{items.site}</a>
                    <img onClick={() => copytext(items.site)} className='w-8 absolute top-[25%] cursor-pointer active:scale-85 right-5' src="../copy.gif" alt="" />
                  </td>
                  <td className="p-3 border relative">{items.name} <img onClick={() => copytext(items.name)} className='w-8 absolute top-[25%] cursor-pointer active:scale-85 right-5' src="../copy.gif" alt="" /></td>
                  <td className="p-3 border relative">{items.pass} <img onClick={() => copytext(items.pass)} className='w-8 absolute top-[25%] cursor-pointer active:scale-85 right-5' src="../copy.gif" alt="" /></td>
                  <td className="p-3 border relative">
                    <span className='w-full flex items-center justify-end gap-3 pr-3'>
                      <img onClick={() => { deletepassword(items.id) }} className='w-8 cursor-pointer active:scale-90' src="../delete.gif" alt="" />
                      <img onClick={() => { editpassword(items.id) }} className='w-8 cursor-pointer active:scale-90' src="../edit.gif" alt="" />
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
