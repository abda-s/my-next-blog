'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Post } from '../app/types'

interface Props {
  posts: Post[]
  page: number
  totalPages: number
  pageSize: number
}

export default function PostsPage({ posts, page, totalPages, pageSize }: Props) {
  const router       = useRouter()
  const [size, setSize] = useState(pageSize)

  function onSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newSize = parseInt(e.target.value, 10)
    setSize(newSize)
    // reset to page=1 whenever pageSize changes
    router.push(`/?page=1&pageSize=${newSize}`)
  }

  return (
    <>
      {/* Posts-per-page selector */}
      <div className="mb-4 flex items-center">
        <label htmlFor="pageSize" className="mr-2 text-gray-200">
          Posts per page:
        </label>
        <select
          id="pageSize"
          onChange={onSizeChange}
          value={size}
          className="bg-gray-700 text-gray-200 px-2 py-1 rounded"
        >
          {[3, 5, 10, 20].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* Your grid of posts */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Link href={`/posts/${post.slug}`} className="block h-full">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-gray-300">{post.description}</p>
                <div className="mt-4 flex justify-end">
                  <span className="text-blue-400 hover:text-blue-300 inline-flex items-center">
                    Read more
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Pagination links */}
      <div className="mt-8 flex justify-center space-x-2">
        {page > 1 && (
          <Link
            href={`/?page=${page - 1}&pageSize=${size}`}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
          >
            Previous
          </Link>
        )}
        {page < totalPages && (
          <Link
            href={`/${page + 1}&pageSize=${size}`}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
          >
            Next
          </Link>
        )}
      </div>
    </>
  )
}