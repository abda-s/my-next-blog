'use client'

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Post } from '../types';
import Pagination from './Pagination';

interface PostsListProps {
  posts: Post[];
}

export default function PostsList({ posts }: PostsListProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get unique tags from posts
  const allTags = useMemo(() => {
    return Array.from(new Set(posts.flatMap(post => post.tags || []))).sort();
  }, [posts]);

  // Filter posts by selected tag
  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter(post => post.tags?.includes(selectedTag));
  }, [posts, selectedTag]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredPosts.length / pageSize);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(e.target.value, 10);
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
    setCurrentPage(1); // Reset to first page when changing tags
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div className="flex flex-col space-y-6 mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            {selectedTag ? `Posts tagged with "${selectedTag}"` : 'Recent Posts'}
          </h2>
          <div className="flex items-center space-x-2">
            <label htmlFor="pageSize" className="text-gray-300">Items per page:</label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={handlePageSizeChange}
              className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTag === tag
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {paginatedPosts.map((post) => (
          <article key={post.slug} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <Link href={`/posts/${post.slug}`}>
              <h3 className="text-xl font-semibold text-white mb-2 hover:text-blue-400 transition-colors">
                {post.title}
              </h3>
            </Link>
            <p className="text-gray-400 mb-2">{formatDate(post.date)}</p>
            <p className="text-gray-300 mb-3">{post.description}</p>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredPosts.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
} 