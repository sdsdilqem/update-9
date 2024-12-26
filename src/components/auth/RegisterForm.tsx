import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterFormProps {
  onSuccess: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Şifrələr uyğun gəlmir');
      return;
    }
    try {
      await login(formData.email, formData.password);
      onSuccess();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <div className="relative">
          <input
            type="text"
            id="username"
            placeholder="İstifadəçi adı"
            value={formData.username}
            onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
            className="w-full pl-4 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            required
          />
          <User className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full pl-4 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            required
          />
          <Mail className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <input
            type="password"
            id="password"
            placeholder="Şifrə"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className="w-full pl-4 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            required
          />
          <Lock className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <input
            type="password"
            id="confirmPassword"
            placeholder="Şifrəni təsdiqlə"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            className="w-full pl-4 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            required
          />
          <Lock className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3.5 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-medium"
      >
        Qeydiyyatdan keç
      </button>

      <div className="relative py-3">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-gray-500">və ya</span>
        </div>
      </div>

      <button
        type="button"
        className="w-full bg-white border border-gray-200 text-gray-700 py-3.5 rounded-xl hover:bg-gray-50 transition-all font-medium flex items-center justify-center space-x-2"
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
        <span>Google ilə davam et</span>
      </button>
    </form>
  );
}