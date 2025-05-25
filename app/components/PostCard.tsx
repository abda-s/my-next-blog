'use client'

import Link from 'next/link';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article>
      <Link 
        href={`/posts/${post.slug}`}
        className="block bg-gray-800 rounded-lg p-6 md:hover:bg-gray-700 transition-colors"
      >
        <h3 className="text-xl font-semibold text-blue-400 md:hover:text-blue-300 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-400 text-sm mt-1">{formatDate(post.date)}</p>
        <p className="text-gray-300 mt-3 leading-relaxed">{post.description}</p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4 text-blue-400 md:hover:text-blue-300 transition-colors flex items-center">
          Read more
          <svg 
            className="w-4 h-4 ml-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </div>
      </Link>
    </article>
  );
} 