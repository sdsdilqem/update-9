import React, { useState } from 'react';
import { Heart, MessageCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Post as PostType } from '../types/post';

type PostProps = PostType;

export default function Post({
  id,
  image,
  title,
  price,
  username,
  avatar,
  likes,
  comments,
  isSponsored,
}: PostProps) {
  const navigate = useNavigate();

  const handlePostClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.tagName.toLowerCase() === 'button') {
      return;
    }
    navigate(`/product/${id}`);
  };

  return (
    <div
      className={`
        bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer 
        transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md
        ${isSponsored ? 'ring-2 ring-blue-500/20' : ''}
      `}
      onClick={handlePostClick}
    >
      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full aspect-square object-cover"
          loading="lazy"
        />

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg">
          <span className="font-semibold text-blue-600 text-xs sm:text-sm">
            ₼{price}
          </span>
        </div>

        {isSponsored && (
          <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium">
            Endirim mövcuddur
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm">
          {title}
        </h3>

        <div className="flex items-center space-x-3">
          <button className="group flex items-center space-x-1">
            {/*asagida sparkles yerine Heart yazmaq olar*/}
            <Sparkles className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
            <span className="text-xs text-gray-500">{likes}</span>
          </button>
          <button className="group flex items-center space-x-1">
            <MessageCircle className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <span className="text-xs text-gray-500">{comments}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
