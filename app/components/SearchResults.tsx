'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Post } from '../types';

interface SearchResultsProps {
  posts: Post[];
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function SearchResults({ posts }: SearchResultsProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Filter posts whenever search query changes
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const results = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerCaseQuery) ||
          (post.description && post.description.toLowerCase().includes(lowerCaseQuery))
      );
      setFilteredPosts(results);
    } else {
      setFilteredPosts([]); // Show no results if query is empty
    }
  }, [searchQuery, posts]);

  return (
    <>
      {searchQuery === '' ? (
        <p className="text-gray-300">Please enter a search query.</p>
      ) : filteredPosts.length > 0 ? (
        <div className="space-y-6">
          <p className="text-gray-400">
            Found {filteredPosts.length} result{filteredPosts.length === 1 ? '' : 's'} for &quot;{searchQuery}&quot;
          </p>
          <ul className="space-y-4">
            {filteredPosts.map((post) => (
              <li key={post.slug} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
                <a href={`/posts/${post.slug}`} className="block">
                  <h2 className="text-xl font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {formatDate(post.date)}
                  </p>
                  {post.description && (
                    <p className="text-gray-300 mt-3 leading-relaxed">
                      {post.description}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-300">No results found for &quot;{searchQuery}&quot;.</p>
      )}
    </>
  );
} 