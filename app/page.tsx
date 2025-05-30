import { Metadata } from 'next';
import { getPosts } from './lib/posts';
import PostsList from './components/PostsList';
import Hero from './components/Hero';

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
