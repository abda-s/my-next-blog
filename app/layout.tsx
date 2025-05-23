import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'My Blog',
  description: 'A personal blog built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-gray-100 min-h-screen">
        <header className="bg-gray-800 shadow-md">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
              My Blog
            </Link>
            <div className="flex space-x-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/all-posts" className="text-gray-300 hover:text-white transition-colors">
                Posts
              </Link>
            </div>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-800 text-gray-400 py-8">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} My Blog. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}