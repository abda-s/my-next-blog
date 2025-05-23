import { notFound } from 'next/navigation';
import { readdirSync } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import 'highlight.js/styles/github-dark.css';
import Script from 'next/script';
import Link from 'next/link';
import CodeBlock from '../../components/CodeBlock';

// Configure marked
marked.setOptions({ gfm: true, breaks: true });

/**
 * Synchronously read the /posts folder so Next infers
 * { slug: string }[] (not Promise<any>).
 */
export function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'posts');
  const files    = readdirSync(postsDir);
  return files.map((f) => ({ slug: f.replace(/\.md$/, '') }));
}

/** Load & parse one markdown file */
async function getPostData(slug: string) {
  const fullPath = path.join(process.cwd(), 'posts', `${slug}.md`);
  try {
    const raw = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(raw);
    const html = marked.parse(content);

    const dateStr = data.date instanceof Date
      ? data.date.toLocaleDateString()
      : String(data.date);

    return {
      slug,
      title:       data.title,
      date:        dateStr,
      description: data.description ?? '',
      content:     html,
    };
  } catch (err) {
    console.error(`Error loading "${slug}":`, err);
    return null;
  }
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// This is a Server Component
export default async function Page(props: PageProps) {
  const params = await props.params;
  const slug = params.slug;

  const postData = await getPostData(slug);
  if (!postData) return notFound();

  return (
    <>
      <Script src="https://polyfill.io/v3/polyfill.min.js?features=es6" />
      <Script
        id="MathJax-config"
        dangerouslySetInnerHTML={{
          __html: `
            window.MathJax = {
              tex: {
                inlineMath: [['$', '$']],
                displayMath: [['$$', '$$']],
                processEscapes: true
              },
              options: {
                ignoreHtmlClass: 'no-mathjax',
                processHtmlClass: 'mathjax'
              }
            };
          `,
        }}
      />
      <Script
        id="MathJax-script"
        async
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
      />
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{postData.title}</h1>
          <p className="text-gray-400">{postData.date}</p>
        </header>
        {/* Use the CodeBlock component to render the content with copy buttons and syntax highlighting */}
        <CodeBlock html={postData.content} />
        <div className="mt-12 pt-6 border-t border-gray-700">
          <Link href="/" className="text-blue-400 hover:text-blue-300 inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all posts
          </Link>
        </div>
      </article>
    </>
  );
}
