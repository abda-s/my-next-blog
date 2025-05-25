import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'My Blog',
    description: 'A personal blog built with Next.js',
  };
}