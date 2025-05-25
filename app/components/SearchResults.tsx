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

function searchPosts(posts: Post[], query: string) {
  if (!query.trim()) return [];
  
  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  
  // Score each post
  const scoredPosts = posts.map(post => {
    let score = 0;
    const title = post.title.toLowerCase();
    const description = post.description?.toLowerCase() || '';
    const tags = post.tags?.map(tag => tag.toLowerCase()) || [];
    
    // Check each search term
    searchTerms.forEach(term => {
      // Title matches get highest priority (3 points per term)
      if (title.includes(term)) {
        score += 3;
      }
      
      // Tag matches get second priority (2 points per term per tag)
      tags.forEach(tag => {
        if (tag.includes(term)) {
          score += 2;
        }
      });
      
      // Description matches get lowest priority (1 point per term)
      if (description.includes(term)) {
        score += 1;
      }
    });
    
    return { post, score };
  });
  
  // Filter out posts with no matches and sort by score
  return scoredPosts
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ post }) => post);
}

export default function SearchResults({ posts }: SearchResultsProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    const results = searchPosts(posts, searchQuery);
    setFilteredPosts(results);
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