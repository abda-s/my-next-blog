import React from 'react';

export default function HeroBoards() {
  return (
    <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-gray-800 mb-12 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent opacity-40"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="relative z-10 max-w-3xl mx-4 text-center mt-12 md:mt-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 pb-2 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Boards: My Drawing Showcase
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
          Welcome! This section is where I share all my Excalidraw sketches and diagrams, sorted by topic. Whether it&#39;s a quick idea, a technical concept, or something I just found interesting, you&#39;ll find it here.
        </p>
        <ul className="text-gray-400 text-base mb-4 mx-auto max-w-xl list-disc list-inside text-left">
          <li><b>See what I&#39;m working on:</b> Each board is a peek into a subject or project I&#39;ve explored.</li>
          <li><b>Curious?</b> Click any drawing to view it up close. Maybe you&#39;ll spot something cool or useful!</li>
        </ul>
        <p className="text-gray-400 text-sm mt-2">
          Thanks for stopping by and checking out my work. Hope you enjoy looking around as much as I enjoyed making these!
        </p>
      </div>
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  );
} 