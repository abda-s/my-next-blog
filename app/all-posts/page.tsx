import Link from 'next/link';
import { getPosts } from '../lib/posts';

export default async function AllPosts() {
  const posts = await getPosts(false); // false means exclude drafts

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">All Posts</h1>
      <ul className="list-disc list-inside space-y-2">
        {posts.map(({ slug, title }) => (
          <li key={slug}>
            <Link href={`/posts/${slug}`} className="text-blue-400 hover:underline">
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}