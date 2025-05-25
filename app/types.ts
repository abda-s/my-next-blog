export interface NavLink {
  name: string;
  href: string;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  draft?: boolean;
  tags?: string[];
  content?: string;
}