# My New Blog

This is a personal blog built with Next.js, Tailwind CSS, and Markdown.

## Features

- Markdown-based posts
- Pagination and items per page selector
- Tag filtering
- Search functionality with scoring (prioritizing title/tag matches)
- Draft post handling (drafts not shown in main lists but accessible via direct link)
- Responsive design
- About page

## Setup

Follow these steps to set up and run the project locally:

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd my-new-blog
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or using yarn
    # yarn install
    # or using pnpm
    # pnpm install
    ```

3.  **Run the development server:**

```bash
npm run dev
    # or using yarn
    # yarn dev
    # or using pnpm
    # pnpm dev
```

    The blog will be available at `http://localhost:3000`.

    *Note: Ensure you are in the project's root directory when running these commands.*

4.  **Build for production (optional):**

    ```bash
    npm run build
    # or using yarn
    # yarn build
    # or using pnpm
    # pnpm build
    ```

    This will create a production build in the `.next` folder.

## Project Structure

(Optional: Add a brief overview of key directories like `app/`, `posts/`, `lib/`, `components/` if helpful)

## Writing Posts

Create new markdown files (`.md` or `.mdx`) in the `posts/` directory. Include frontmatter at the top of each file for post metadata (title, date, description, tags, draft status). Example:

```markdown
---
title: "My First Blog Post"
date: "2023-10-26"
description: "This is a description of my first blog post."
tags: ["example", "markdown"]
draft: false
---

This is the content of my blog post.
```

Set `draft: true` to exclude the post from the main blog lists.

