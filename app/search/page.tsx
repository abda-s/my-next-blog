import { Suspense } from 'react';
import { getPosts } from '../lib/posts';
import SearchResults from '../components/SearchResults';

export default async function SearchPage() {
  const allPosts = await getPosts(true); // Fetch all posts at build time

  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">
          Search Results
        </h1>
        <Suspense fallback={<div className="text-gray-300">Loading search results...</div>}>
          <SearchResults posts={allPosts} />
        </Suspense>
      </div>
    </main>
  );
} 