import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { toast } from 'sonner';
type AddMemberModalProps = {
  isVisible: boolean;
  boardId: string;
  onClose: () => void;
};


const AddMemberModal: React.FC<AddMemberModalProps> = ({isVisible , onClose, boardId}) => {
  
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
        toast.success("member added successfully");
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
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-xs">
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg animate-fade-in border border-gray-300">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Invite Member</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg text-base text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="example@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Role Selection */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Select Role
          </label>
          <div className="relative">
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg text-base text-gray-800 shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.role ? 'border-red-500' : 'border-gray-300'
              } bg-white`}
            >
              {roles.map((roleOption) => (
                <option key={roleOption.value} value={roleOption.value}>
                  {roleOption.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  </div>
);
}

export default AddMemberModal