import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Salameh',
  description: 'A personal blog built with love by Abdullah Salameh',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-gray-100 min-h-screen">
        <Navbar />
        <main>
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