import React, { useState } from 'react';
import BottomSheet from '../common/BottomSheet';
import ProductDetails from './steps/ProductDetails';
import ImageUpload from './steps/ImageUpload';
import StepIndicator from './StepIndicator';
import { PostFormData } from '../../types/post';

interface CreatePostSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePostSheet({ isOpen, onClose }: CreatePostSheetProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    description: '',
    category: '',
    price: '',
    images: [],
    phone: '',
    sellerName: ''
  });

  const handleNext = (data: Partial<PostFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleSubmit = (data: Partial<PostFormData>) => {
    const finalData = { ...formData, ...data };
    console.log('Submitting post:', finalData);
    onClose();
    setStep(1);
    setFormData({
      title: '',
      description: '',
      category: '',
      price: '',
      images: [],
      phone: '',
      sellerName: ''
    });
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {step === 1 ? 'Məhsul məlumatları' : 'Şəkillər'}
        </h2>
        <StepIndicator currentStep={step} totalSteps={2} />
      </div>

      {step === 1 ? (
        <ProductDetails
          initialData={formData}
          onNext={handleNext}
        />
      ) : (
        <ImageUpload
          initialImages={formData.images}
          onBack={() => setStep(1)}
          onSubmit={handleSubmit}
        />
      )}
    </BottomSheet>
  );
}