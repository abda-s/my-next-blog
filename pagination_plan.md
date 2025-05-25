# Pagination Plan for Home Page Posts

This plan outlines the steps to implement pagination on the home page for the posts, which are fetched from local Markdown files.

## Goals

*   Implement pagination to display posts in a manageable way.
*   Provide clear navigation controls for users.
*   Ensure proper SEO for paginated content.

## Steps

1.  **Identify the home page component:**
    *   Determine which component is responsible for displaying the posts on the home page (e.g., `app/page.tsx`).

2.  **Read all Markdown files:**
    *   Use the `fs` module (or a similar module like `fs/promises` for asynchronous operations) to read the contents of the `posts` directory.
    *   For each file:
        *   Parse the Markdown content (e.g., using `gray-matter` or a similar library) to extract the frontmatter (metadata) and the content.
        *   Store the parsed posts in an array of objects.

3.  **Implement pagination logic:**
    *   Define a `pageSize` (e.g., 5 or 10 posts per page).
    *   Use the `useSearchParams` hook to get the current page from the URL query parameters. If no page is specified, default to page 1.
    *   Calculate the `startIndex` and `endIndex` based on `currentPage` and `pageSize`.
    *   Slice the array of posts to display only the posts for the current page.

4.  **Render the paginated posts:**
    *   Display the sliced posts on the home page.

5.  **Add pagination controls:**
    *   Create "Previous" and "Next" buttons.
    *   Use the `useRouter` hook to navigate to the previous and next pages, updating the URL query parameters.
    *   Disable the "Previous" button on the first page.
    *   Disable the "Next" button on the last page.
    *   Optionally, add page number indicators.

6.  **Consider SEO:**
    *   Use the `generateMetadata` function to set the canonical URL for each paginated page.
    *   Include appropriate meta tags (e.g., `description`, `keywords`) in the `generateMetadata` function.

## Implementation Details

*   **Libraries:**
    *   `fs` (or `fs/promises`) for reading files.
    *   `gray-matter` (or a similar library) for parsing Markdown.
    *   `useSearchParams` and `useRouter` from Next.js.

*   **File Structure:**
    *   The changes will primarily affect the home page component (e.g., `app/page.tsx`).

## Mermaid Diagram (Example)

```mermaid
graph LR
    A[Home Page Component (app/page.tsx)] --> B{Fetch Posts from Markdown Files}
    B --> C{Implement Pagination Logic}
    C --> D{Render Paginated Posts}
    C --> E{Add Pagination Controls}
    D --> F[Display Posts]
    E --> G[Previous Button]
    E --> H[Next Button]
    F --> I{SEO Optimization (generateMetadata)}