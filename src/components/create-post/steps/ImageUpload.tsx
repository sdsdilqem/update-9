import React, { useState } from 'react';
import { ImagePlus, X, ArrowLeft, Check } from 'lucide-react';

interface ImageUploadProps {
  initialImages: string[];
  onBack: () => void;
  onSubmit: (data: { images: string[] }) => void;
}

export default function ImageUpload({ initialImages, onBack, onSubmit }: ImageUploadProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const maxImages = 8;

  const handleImageUpload = () => {
    // Simulate image upload - in real app, implement actual upload
    const mockImage = `https://images.unsplash.com/photo-${Math.random()}`;
    if (images.length < maxImages) {
      setImages([...images, mockImage]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (images.length > 0) {
      onSubmit({ images });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-xl p-4 flex items-start space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Check className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-blue-900">Avtomatik kateqoriya</h3>
          <p className="text-sm text-blue-700 mt-0.5">
            Sistem məhsulunuzun kateqoriyasını avtomatik təyin edəcək
          </p>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-4 gap-2">
        {[...Array(maxImages)].map((_, index) => (
          <div
            key={index}
            className="aspect-square relative rounded-xl overflow-hidden"
          >
            {index < images.length ? (
              <div className="relative group">
                <img
                  src={images[index]}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleImageUpload}
                disabled={images.length >= maxImages}
                className={`w-full h-full flex items-center justify-center border-2 border-dashed rounded-xl transition-colors
                  ${index === images.length
                    ? 'border-blue-500 bg-blue-50 hover:bg-blue-100'
                    : 'border-gray-200 bg-gray-50'
                  }`}
              >
                <ImagePlus className={`w-6 h-6 ${index === images.length ? 'text-blue-500' : 'text-gray-400'}`} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Helper Text */}
      <p className="text-sm text-gray-500 text-center">
        {images.length === 0
          ? 'Məhsulun şəkillərini əlavə edin'
          : `${images.length} şəkil seçildi · ${maxImages - images.length} şəkil əlavə edə bilərsiniz`}
      </p>

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-4">
        <button
          onClick={onBack}
          className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Geri</span>
        </button>
        <button
          onClick={handleSubmit}
          disabled={images.length === 0}
          className={`flex-1 py-3 rounded-xl font-medium transition-colors
            ${images.length > 0
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
        >
          Paylaş
        </button>
      </div>
    </div>
  );
}