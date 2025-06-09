"use client"
import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = event.currentTarget;
    const email = form.querySelector('input[name="email"]') as HTMLInputElement;
    const fullName = form.querySelector('input[name="name"]') as HTMLInputElement;
    const message = form.querySelector('textarea[name="message"]') as HTMLTextAreaElement;

    const formData = new FormData();
    formData.append('entry.984568658', email.value);
    formData.append('entry.1994126310', fullName.value);
    formData.append('entry.401660184', message.value);

    try {
      await fetch('https://docs.google.com/forms/d/e/1FAIpQLSckbwI86tPYpDiJ8Pqlky_a7WK3BXcnbjxBy8DSWle-hWcnZA/formResponse?usp=pp_url', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });

      form.reset();
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-white">Get in Touch</h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-white">Send a Message</h2>
          <form id="myForm" onSubmit={handleSubmit} className="space-y-4">
          <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
            </label>
            <input
              type="text"
              id="name"
                name="name"
                required
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Your name"
            />
          </div>
          <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
                name="email"
                required
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              Message
            </label>
            <textarea
              id="message"
                name="message"
                required
                rows={4}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                placeholder="Your message..."
              />
          </div>
          <button
            type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
              {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
            {submitStatus === 'success' && (
              <p className="text-green-400 text-center">Message sent successfully!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-400 text-center">Failed to send message. Please try again.</p>
            )}
        </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">Connect With Me</h2>
            <p className="text-gray-300 mb-6">
              Feel free to reach out through any of these platforms. I&apos;m always interested in hearing about new projects and opportunities.
            </p>
            <div className="space-y-4">
              <Link
                href="https://github.com/abda-s"
                target="_blank"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/abdullah-salameh/"
                target="_blank"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">Location</h2>
            <p className="text-gray-300">
              Based in Jordan
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
