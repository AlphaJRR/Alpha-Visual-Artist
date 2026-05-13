import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import ReactMarkdown from "react-markdown";
type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  createdAt: string;
};
type Comment = {
  id: string;
  body: string;
  createdAt: string;
};

export function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!params?.slug) return;
    fetch(`/api/blog/${params.slug}`)
      .then((r) => r.json())
      .then((payload) => {
        const found: Post | null = payload.data ?? null;
        setPost(found);
        return found
          ? fetch(`/api/blog/${found.id}/comments`).then((r) => r.json())
          : { data: [] };
      })
      .then((payload) => setComments(payload.data ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params?.slug]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!post) return <div className="p-8">Post not found</div>;

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold font-sora mb-4">{post.title}</h1>
        <div className="text-gray-400 mb-8">
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <div className="prose prose-invert max-w-none mb-12">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        <h2 className="text-2xl font-bold mb-6">Comments</h2>
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="bg-gray-900 p-4 rounded">
              <div className="text-gray-400 text-sm mb-2">
                {new Date(c.createdAt).toLocaleDateString()}
              </div>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
