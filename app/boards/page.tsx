import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default async function BoardsPage() {
  const drawingsDir = path.join(process.cwd(), 'drawings');
  let boards: string[] = [];
  try {
    boards = fs.readdirSync(drawingsDir).filter((name) => {
      const fullPath = path.join(drawingsDir, name);
      return fs.statSync(fullPath).isDirectory();
    });
  } catch (e) {
    // If the folder doesn't exist or is empty
    boards = [];
  }
  return (
    <div className="max-w-2xl mx-auto py-8 mx-4 md:mx-0">
      <div className="flex flex-row items-center mb-6 gap-x-4">
        <Link href="/" className="inline-flex items-center justify-center mb-4 w-10 h-10 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
          <ArrowLeftIcon className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-bold mb-6">Boards</h1>
      </div>
      <ul className="space-y-4">
        {boards.length === 0 && <li className="text-gray-500">No boards found.</li>}
        {boards.map((board) => (
          <li key={board}>
            <Link href={`/boards/${encodeURIComponent(board)}`}
              className="block px-4 py-3 bg-gray-800 rounded hover:bg-gray-700 transition-colors text-lg font-medium">
              {board.replace(/-/g, ' ')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 