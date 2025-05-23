import React from "react";

export const metadata = {
  title: "About - My Blog",
  description: "Learn more about me and my blog",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-white">About Me</h1>

      <div className="bg-gray-800 rounded-lg p-8 shadow-lg mb-8">
        <p className="text-gray-300 text-lg mb-4">
          Hello! I&apos;m a passionate writer and developer who loves sharing
          ideas and experiences through this blog.
        </p>

        <p className="text-gray-300 text-lg mb-4">
          I created this blog using Next.js, a powerful React framework that
          makes building modern web applications a breeze. The site features
          server-side rendering, static site generation, and a clean, responsive
          design.
        </p>
        <p className="text-gray-300 text-lg">
          Feel free to explore my posts and reach out if you have any questions
          or just want to connect!
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-white">My Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-white">
            Frontend Development
          </h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>React & Next.js</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>HTML & CSS</li>
          </ul>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-white">
            Backend Development
          </h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Node.js</li>
            <li>Express</li>
            <li>MongoDB</li>
            <li>RESTful APIs</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-white">My Journey</h2>
      <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
        <p className="text-gray-300 text-lg mb-4">
          I started my journey in web development several years ago, fascinated
          by the ability to create interactive experiences that can reach people
          worldwide.
        </p>
        <p className="text-gray-300 text-lg mb-4">
          Through continuous learning and practice, I&apos;ve developed a strong
          foundation in both frontend and backend technologies. I&apos;m particularly
          interested in creating performant, accessible, and user-friendly web
          applications.
        </p>
        <p className="text-gray-300 text-lg">
          This blog serves as both a platform to share my knowledge and a
          playground to experiment with new technologies and ideas.
        </p>
      </div>
    </div>
  );
}
