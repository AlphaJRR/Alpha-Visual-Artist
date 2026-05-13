import { useEffect, useState } from "react";
import { Link } from "wouter";
type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  featured: boolean;
  createdAt: string;
};

export function BlogListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((payload) => setPosts(payload.data ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-sora mb-8">Blog</h1>
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <a className="block bg-gray-900 p-6 rounded border border-gray-800 hover:border-[#00E6FF]">
                <h2 className="text-2xl font-bold">{post.title}</h2>
                {post.featured && <span className="text-[#00E6FF] text-xs">Featured</span>}
                <p className="text-gray-400">{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
