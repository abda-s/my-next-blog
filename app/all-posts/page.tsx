import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  date: Date;
}

async function getAllPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = await fs.readdir(postsDirectory);
  const posts: Post[] = [];

  for (const filename of filenames) {
    if (!filename.endsWith('.md')) continue;

    const slug = filename.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, filename);
    try {
      const fileContents = await fs.readFile(fullPath, 'utf8');
      const matchTitle = fileContents.match(/title:\s*(.*)/i);
      const title = matchTitle ? matchTitle[1].trim().replace(/["']/g, '') : slug;

      const matchDate = fileContents.match(/date:\s*(\d{4}-\d{2}-\d{2})/i);
      const dateStr = matchDate ? matchDate[1].trim() : null;
      const date = dateStr ? new Date(dateStr) : new Date(0);

      posts.push({ slug, title, date });
    } catch (error) {
      console.error(`Failed to read file ${filename}:`, error);
    }
  }

  // Sort posts by date descending (newest first)
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());

  return posts;
}

export default async function AllPosts() {
  const posts = await getAllPosts();

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