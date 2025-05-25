interface HeroProps {
  tags: string[];
}

export default function Hero({ tags }: HeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 mb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 pb-3 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Welcome to My Blog
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Exploring ideas, sharing experiences, and documenting my journey through code and creativity.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
          {tags.map(tag => (
            <span 
              key={tag}
              className="px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  );
} 