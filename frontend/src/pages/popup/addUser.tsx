import React, { useState } from 'react'
import AddUserForms from '../../components/AddUserForms'

const AddUserPopup = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col gap-8 bg-white p-8 rounded-lg shadow-lg w-1/2 h[600px]">
        <div className="flex flex-col gap-4 items-center justify-center">
          <h2 className="text-2xl font-bold text-black">Forms - Add User</h2>
        </div>
        <AddUserForms setUsername={setUsername} setName={setName} setEmail={setEmail} setPassword={setPassword} setRole={setRole} />
      </div>
    </div>
  );
};

export default AddUserPopup;