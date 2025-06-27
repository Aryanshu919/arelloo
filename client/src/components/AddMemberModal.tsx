import axios from 'axios';
import React from 'react'
import { useState } from 'react';

const AddMemberModal = ({isVisible , onClose, boardId}) => {
  
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('viewer');
  const [errors, setErrors] = useState<{ email?: string; role?: string }>({});

  const roles = [
    { value: 'VIEWER', label: 'Viewer' },
    { value: 'EDITOR', label: 'Editor' },
    { value: 'ADMIN', label: 'Admin' }
  ];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { email?: string; role?: string } = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!role) {
      newErrors.role = 'Role is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
        const res = await axios.post(`http://localhost:3000/api/board/${boardId}/members`,{email, role}, {withCredentials: true});
        console.log(res)
    } catch (error) {
        console.error(error);
        console.log("error while adding members");
    
    }
    
    setEmail('');
    setRole('VIEWER');
    onClose();
    

    // setErrors({});
    // onSubmit({ email, role });
    
    // Reset form
    // setEmail('');
    // setRole('viewer');
    // onClose();
  };


  if(!isVisible) return null;
  return (
     <div className='absolute inset-0 top-40 p-10 max-w-xl max-h-1/2 bg-white rounded-sm mx-auto border-4 border-gray-400'>
        <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border text-black font-semibold text-base rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter email address"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Role Selection */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <div className="relative">
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`w-full px-3 text-base text-black font-semibold py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none bg-white ${
                errors.role ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {roles.map((roleOption) => (
                <option key={roleOption.value} value={roleOption.value}>
                  {roleOption.label}
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => onClose()}
            className="px-4 py-2 text-sm font-medium text-white bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Add User
          </button>
        </div>
      </form>
    </div>  
  )
}

export default AddMemberModal