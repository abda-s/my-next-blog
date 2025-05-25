import Link from 'next/link';

export const metadata = {
  title: "About - My Blog",
  description: "Learn more about me and my blog",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Abdullah Salameh</h1>
        <p className="text-blue-400 text-xl md:text-2xl">Full Stack Developer</p>
      </header>

      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Abdullah Salameh
        </h1>
        <p className="text-xl text-gray-300 mb-6">
          Electrical Engineering Student, Full Stack Developer & Embedded Systems Enthusiast
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="https://github.com/abda-s" 
            target="_blank"
            className="px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            GitHub
          </Link>
          <Link 
            href="https://www.linkedin.com/in/abdullah-salameh/" 
            target="_blank"
            className="px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            LinkedIn
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">About Me</h2>
        <p className="text-gray-300 leading-relaxed">
          I&apos;m an Electrical Engineering student with a deep passion for embedded systems and control engineering. 
          My journey combines the theoretical foundations of electrical engineering with practical applications 
          in software development and IoT. I specialize in creating smart, efficient solutions that bridge the 
          gap between hardware and software, from embedded systems to full-stack applications.
        </p>
      </section>

      {/* Interests & Goals Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Interests & Goals</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-2">Technical Interests</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Real-time embedded systems and control</li>
              <li>• IoT and smart device development</li>
              <li>• Full-stack web applications</li>
              <li>• System architecture and design</li>
            </ul>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-2">Future Goals</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Develop innovative IoT solutions</li>
              <li>• Contribute to open-source projects</li>
              <li>• Master advanced control systems</li>
              <li>• Create impactful embedded applications</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Skills & Technologies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Hardware & Embedded</h3>
            <ul className="text-gray-300 space-y-1">
              <li>Microcontrollers</li>
              <li>Control Systems</li>
              <li>Circuit Design</li>
              <li>IoT Development</li>
            </ul>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Software</h3>
            <ul className="text-gray-300 space-y-1">
              <li>Embedded C/C++</li>
              <li>Python</li>
              <li>JavaScript/TypeScript</li>
              <li>RESTful APIs</li>
            </ul>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Tools & Others</h3>
            <ul className="text-gray-300 space-y-1">
              <li>Git/GitHub</li>
              <li>Docker</li>
              <li>Linux</li>
              <li>PCB Design</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6">Contact</h2>
        <p className="text-gray-300 mb-4">Feel free to reach out to me:</p>
        <ul className="flex justify-center space-x-6">
          <li>
            <a 
              href="https://github.com/abda-s" 
              target="_blank"
              className="px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              GitHub
            </a>
          </li>
          <li>
            <a 
              href="https://www.linkedin.com/in/abdullah-salameh/" 
              target="_blank"
              className="px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
