import React from 'react';
import { PostFormData } from '../../../types/post';
import ProductForm from './ProductForm';

interface ProductDetailsProps {
  initialData: PostFormData;
  onNext: (data: Partial<PostFormData>) => void;
}

export default function ProductDetails({ initialData, onNext }: ProductDetailsProps) {
  return (
    <ProductForm
      initialData={initialData}
      submitLabel="Növbəti"
      onSubmit={onNext}
    />
  );
}