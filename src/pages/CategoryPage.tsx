import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { categories } from '../components/categories/constants';
import PostGrid from '../components/PostGrid';
import CarFilters from '../components/filters/CarFilters';
import { mockSubcategoryProducts } from '../data/mockSubcategoryProducts';

export default function CategoryPage() {
  const { name } = useParams();
  
  const parentCategory = categories.find(c => 
    c.subcategories.some(sub => 
      sub.name.toLowerCase() === decodeURIComponent(name || '').toLowerCase()
    )
  );
  
  const subcategory = parentCategory?.subcategories.find(
    sub => sub.name.toLowerCase() === decodeURIComponent(name || '').toLowerCase()
  );
  
  const products = subcategory ? mockSubcategoryProducts[subcategory.name] || [] : [];
  const isCarCategory = subcategory?.name === 'Avtomobillər';

  if (!parentCategory || !subcategory) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Kateqoriya tapılmadı</h1>
        <Link to="/" className="text-blue-500 hover:text-blue-600 mt-4 inline-block">
          Ana səhifəyə qayıt
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto py-6 px-4">
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Geri</span>
        </Link>
      </div>

      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
          <subcategory.icon className="w-6 h-6 text-gray-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{subcategory.name}</h1>
          <p className="text-sm text-gray-500">{parentCategory.name} kateqoriyası</p>
        </div>
      </div>

      {isCarCategory && <CarFilters />}

      {products.length > 0 ? (
        <PostGrid posts={products} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Bu kateqoriyada hələ heç bir məhsul yoxdur</p>
        </div>
      )}
    </div>
  );
}