import React, { useEffect } from 'react';

interface MathJaxWrapperProps {
  children: React.ReactNode;
}

const MathJaxWrapper: React.FC<MathJaxWrapperProps> = ({ children }) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise().catch((err) =>
        console.error('MathJax typeset failed:', err)
      );
    }
  }, [children]);

  return <>{children}</>;
};

export default MathJaxWrapper;