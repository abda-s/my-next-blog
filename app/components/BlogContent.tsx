'use client';

import React, { useRef, useEffect, useState } from 'react';
import hljs from 'highlight.js';

interface BlogContentProps {
  content: string | Promise<string>;
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle Promise<string> content
  useEffect(() => {
    const loadContent = async () => {
      if (content instanceof Promise) {
        const resolvedContent = await content;
        setHtmlContent(resolvedContent);
      } else {
        setHtmlContent(content);
      }
    };
    
    loadContent();
  }, [content]);

  useEffect(() => {
    if (!contentRef.current || !htmlContent) return;

    // Find all pre > code elements
    const codeBlocks = contentRef.current.querySelectorAll('pre > code');
    
    codeBlocks.forEach((codeBlock) => {
      // Apply syntax highlighting
      hljs.highlightElement(codeBlock as HTMLElement);
      
      const pre = codeBlock.parentElement;
      if (!pre) return;
      
      // Add relative positioning to the pre element for absolute positioning of the copy button
      pre.style.position = 'relative';
      
      // Get the text content of the code block
      const codeText = codeBlock.textContent || '';
      
      // Create a copy button (icon size only)
      const copyButton = document.createElement('button');
      copyButton.className = 'absolute top-1 right-1 p-0.5 rounded-sm bg-gray-700 hover:bg-gray-600 transition-colors';
      copyButton.setAttribute('aria-label', 'Copy code to clipboard');
      copyButton.setAttribute('title', 'Copy code to clipboard');
      
      // Add copy functionality
      copyButton.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(codeText);
          
          // Show copied state
          copyButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          `;
          
          // Reset after 2 seconds
          setTimeout(() => {
            copyButton.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            `;
          }, 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      });
      
      // Set initial button content
      copyButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
        </svg>
      `;
      
      // Append the button to the pre element
      pre.appendChild(copyButton);
    });
  }, [htmlContent]);

  return (
    <div
      ref={contentRef}
      className="prose prose-lg dark:prose-invert prose-headings:text-white prose-a:text-blue-400 prose-strong:text-white prose-code:text-blue-300 prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700 max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default BlogContent;