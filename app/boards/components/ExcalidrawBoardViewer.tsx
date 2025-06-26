"use client";

import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import { useEffect, useState } from "react";
import type { ExcalidrawInitialDataState } from '@excalidraw/excalidraw/types';

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => <ExcalidrawSkeletonLoader />,
  },
);

function ExcalidrawSkeletonLoader() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-800 rounded-lg animate-pulse">
      <div className="text-gray-500 text-lg">
        Loading Excalidraw...
      </div>
    </div>
  );
}

export default function ExcalidrawBoardViewer({ board, drawing }: { board: string, drawing: string }) {
  const [excalidrawData, setExcalidrawData] = useState<ExcalidrawInitialDataState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadExcalidrawFile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const jsonPath = `/drawings-json/${encodeURIComponent(board)}/${encodeURIComponent(drawing)}.json`;
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error('Failed to fetch file');
        const text = await response.text();
        const data = JSON.parse(text);
        const initialConfig: ExcalidrawInitialDataState = {
          ...(data as ExcalidrawInitialDataState),
          appState: { ...(data.appState || {}), zoom: { value: 0.5 }, scrollX: 0, scrollY: 0 },
        };
        if (isMounted) setExcalidrawData(initialConfig);
      } catch (err: unknown) {
        console.error('Error loading Excalidraw file:', err);
        if (isMounted) setError('Failed to load drawing.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadExcalidrawFile();
    return () => { isMounted = false; };
  }, [board, drawing]);

  return (
    <div className="h-[calc(100vh-180px)] w-full max-w-[1200px] mx-auto rounded-lg overflow-hidden">
      {isLoading || !excalidrawData ? (
        <ExcalidrawSkeletonLoader />
      ) : error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : (
        <Excalidraw
          theme="dark"
          viewModeEnabled={true}
          initialData={excalidrawData}
        />
      )}
    </div>
  );
} 