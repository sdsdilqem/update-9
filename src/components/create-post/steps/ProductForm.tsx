import React, { useState } from 'react';
import { PostFormData } from '../../../types/post';
import { formatPhoneNumber } from '../../../utils/phone';
import FormInput from '../form/FormInput';
import FormTextArea from '../form/FormTextArea';

interface ProductFormProps {
  initialData: PostFormData;
  submitLabel: string;
  onSubmit: (data: Partial<PostFormData>) => void;
}

export default function ProductForm({
  initialData,
  submitLabel,
  onSubmit
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    title: initialData.title,
    description: initialData.description,
    price: initialData.price,
    phone: initialData.phone,
    sellerName: initialData.sellerName || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        id="title"
        label="Başlıq"
        value={formData.title}
        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        placeholder="Məsələn: iPhone 13 Pro"
        required
      />

      <FormInput
        id="price"
        label="Qiymət"
        type="number"
        value={formData.price}
        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
        placeholder="0.00"
        prefix="₼"
        required
      />

      <FormTextArea
        id="description"
        label="Təsvir"
        value={formData.description}
        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        placeholder="Məhsul haqqında ətraflı məlumat..."
        required
      />

      <FormInput
        id="sellerName"
        label="Satıcı adı"
        value={formData.sellerName}
        onChange={(e) => setFormData(prev => ({ ...prev, sellerName: e.target.value }))}
        placeholder="Ad və Soyad"
        required
      />

      <FormInput
        id="phone"
        label="Əlaqə nömrəsi"
        type="tel"
        value={formData.phone}
        onChange={handlePhoneChange}
        placeholder="0XX XXX XX XX"
        required
      />

      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
      >
        {submitLabel}
      </button>
    </form>
  );
}