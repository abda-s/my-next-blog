import { Metadata } from 'next';
import { Post } from './types'
import PostsList from './components/PostsList'
import Hero from './components/Hero'
import { getPosts } from './lib/posts';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'Explore my thoughts, ideas, and experiences through these blog posts.',
};

export default async function Home() {
  const allPosts = await getPosts();
  
  // Get unique tags from all posts
  const allTags = Array.from(new Set(
    allPosts.flatMap(post => post.tags || [])
  )).sort();

  return (
    <>
      <Hero tags={allTags} />
      <PostsList posts={allPosts} />
    </>
  );
}
