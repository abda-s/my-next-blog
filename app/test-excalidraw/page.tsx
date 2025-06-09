'use client';

import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import { useEffect, useState } from "react";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  },
);

// Skeleton Loader Component
const ExcalidrawSkeletonLoader = () => (
  <div className="h-full w-full flex items-center justify-center bg-gray-800 rounded-lg animate-pulse">
    <div className="text-gray-500 text-lg">
      Loading Excalidraw... 
    </div>
  </div>
);

export default function TestExcalidraw() {
  const [excalidrawData, setExcalidrawData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true); // New state to track loading

  useEffect(() => {
    const loadExcalidrawFile = async () => {
      console.log('Starting to load Excalidraw file...');
      setIsLoading(true); // Set loading to true
      try {
        const response = await fetch('/drawings/PID-Controller.excalidraw');
        console.log('File fetch response:', response.status, response.statusText);
        
        const text = await response.text();
        console.log('File content length:', text.length);
        
        const data = JSON.parse(text);
        console.log('Parsed data:', {
          type: data.type,
          version: data.version,
          elementsCount: data.elements?.length // Only log elementsCount for .excalidraw files
        });

        // Log the appState from the parsed file
        console.log('Parsed appState from file:', data.appState);

        const elements = data.elements || [];
        const appState = {
          ...(data.appState || {}), // Keep other appState properties from the file
          zoom: { value: 0.5 }, // Override with a default zoom level
          scrollX: 0, // Override with a default scroll position
          scrollY: 0, // Override with a default scroll position
        };
        const files = data.files || {}; // Extract files data

        const initialConfig: any = {
          elements: elements,
          appState: appState,
          files: files, 
        };

        setExcalidrawData(initialConfig);
        console.log('Excalidraw data set successfully');
      } catch (error) {
        console.error('Error loading Excalidraw file:', error);
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or error
      }
    };

    loadExcalidrawFile();
  }, []);

  return (
    <div className="p-4">
      <div className="h-[calc(100vh-120px)] w-full max-w-[1200px] mx-auto rounded-lg overflow-hidden">
        {isLoading ? (
          <ExcalidrawSkeletonLoader />
        ) : (
          excalidrawData && (
            <Excalidraw 
              theme="dark" 
              viewModeEnabled={true}
            //   gridModeEnabled={false}
              initialData={excalidrawData}
            />
          )
        )}
      </div>
    </div>
  );
} 