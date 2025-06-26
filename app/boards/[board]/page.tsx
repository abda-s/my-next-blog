import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export async function generateStaticParams() {
  const drawingsDir = path.join(process.cwd(), 'drawings');
  let boards: string[] = [];
  try {
    boards = fs.readdirSync(drawingsDir).filter((name) => {
      const fullPath = path.join(drawingsDir, name);
      return fs.statSync(fullPath).isDirectory();
    });
  } catch {
    boards = [];
  }
  return boards.map((board) => ({ board }));
}

export default async function BoardPage({ params }: { params: Promise<{ board: string }> }) {
  const { board } = await params;
  const boardDir = path.join(process.cwd(), 'drawings', board);
  let drawings: string[] = [];
  try {
    drawings = fs.readdirSync(boardDir)
      .filter((name) => name.endsWith('.excalidraw'))
      .map((name) => name.replace(/\.excalidraw$/, ''));
    drawings.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
  } catch {
    drawings = [];
  }
  return (
    <div className="flex justify-center items-start py-8 mx-4 md:mx-0">
      <div className="w-full max-w-2xl">
        <div className="flex flex-row items-center mb-6 gap-x-4">
          <Link href="/boards" className="inline-flex items-center justify-center w-10 h-10 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Board: {board.replace(/-/g, ' ')}</h1>
        </div>
        <ul className="space-y-4">
          {drawings.length === 0 && <li className="text-gray-500">No drawings found.</li>}
          {drawings.map((drawing) => (
            <li key={drawing}>
              <Link href={`/boards/${encodeURIComponent(board)}/${encodeURIComponent(drawing)}`}
                className="block px-4 py-3 bg-gray-800 rounded hover:bg-gray-700 transition-colors text-lg font-medium">
                {drawing.replace(/-/g, ' ')}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 