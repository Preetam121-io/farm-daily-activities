import { useEffect, useState } from "react";
import {
  db,
  collection,
  getDocs,
  query,
  orderBy,
} from "../firebase";
import PostCard from "./PostCard";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadPosts() {
    setLoading(true);
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (!posts.length) return <div>No posts yet.</div>;

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onChanged={loadPosts} />
      ))}
    </div>
  );
}
