'use client';

import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import { useEffect, useState } from "react";
import brotliPromise from "brotli-wasm";

// Dynamically import Excalidraw with only ssr: false and loading
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => <ExcalidrawSkeletonLoader />,
  },
);

// Skeleton Loader Component
function ExcalidrawSkeletonLoader() {
  return (
  <div className="h-full w-full flex items-center justify-center bg-gray-800 rounded-lg animate-pulse">
    <div className="text-gray-500 text-lg">
      Loading Excalidraw... 
    </div>
  </div>
);
}

export default function TestExcalidraw() {
  const [excalidrawData, setExcalidrawData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadExcalidrawFile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch the Brotli-compressed file as ArrayBuffer
        const response = await fetch('/drawing-compressed/PID-Controller.excalidraw.br');
        if (!response.ok) throw new Error('Failed to fetch file');
        const arrayBuffer = await response.arrayBuffer();
        // Decompress using brotli-wasm
        const brotli = await brotliPromise;
        const decompressed = brotli.decompress(new Uint8Array(arrayBuffer));
        // Decode to string
        const text = new TextDecoder().decode(decompressed);
        // Parse JSON
        const data = JSON.parse(text);
        const elements = data.elements || [];
        const appState = {
          ...(data.appState || {}),
          zoom: { value: 0.5 },
          scrollX: 0,
          scrollY: 0,
        };
        const files = data.files || {};
        const initialConfig: any = {
          elements: elements,
          appState: appState,
          files: files, 
        };
        if (isMounted) setExcalidrawData(initialConfig);
      } catch (err: any) {
        console.error('Error loading Excalidraw file:', err);
        if (isMounted) setError('Failed to load drawing.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadExcalidrawFile();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="p-4">
      <div className="h-[calc(100vh-120px)] w-full max-w-[1200px] mx-auto rounded-lg overflow-hidden">
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
    </div>
  );
} 