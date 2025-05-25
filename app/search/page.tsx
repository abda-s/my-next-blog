import { getPosts } from '../lib/posts';
import Link from 'next/link';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const allPosts = await getPosts(true); // Include drafts in search for completeness

  // Filter and score posts
  const scoredPosts = allPosts
    .map(post => {
      const lowerQuery = query.toLowerCase();
      let score = 0;

      // Title match gets highest priority
      if (post.title.toLowerCase().includes(lowerQuery)) {
        score += 2; // Higher score for title match
      }

      // Tag match gets next priority
      if (post.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) {
        score += 1; // Score for tag match
      }

      // Description match gets lowest priority
      if (post.description.toLowerCase().includes(lowerQuery)) {
        score += 0.5; // Score for description match
      }

      return { ...post, score };
    })
    .filter(post => post.score > 0); // Only keep posts with a positive score (at least one match)

  // Sort by score (descending) and then by date (descending)
  const sortedPosts = scoredPosts.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score; // Sort by score
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime(); // Sort by date for ties
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">
        Search Results{query && `: ${query}`}
      </h1>

      {!query && (
        <p className="text-gray-300">Please enter a search term.</p>
      )}

      {query && sortedPosts.length === 0 && (
        <p className="text-gray-300">No results found for &quot;{query}&quot;.</p>
      )}

      {sortedPosts.length > 0 && (
        <div className="space-y-6">
          {sortedPosts.map((post) => (
            <article key={post.slug} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <Link href={`/posts/${post.slug}`}>
                <h3 className="text-xl font-semibold text-white mb-2 hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
              </Link>
              {/* Use a fixed date format to avoid hydration mismatch */}
              <p className="text-gray-400 mb-2">{new Date(post.date).toISOString().slice(0, 10)}</p>
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
      )}
    </main>
  );
} 