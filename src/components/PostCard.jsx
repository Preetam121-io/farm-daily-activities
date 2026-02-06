import {
  db,
  doc,
  updateDoc,
} from "../firebase";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import CommentsSection from "./CommentsSection";

export default function PostCard({ post, onChanged }) {
  const { isAdmin } = useAuth();
  const [likeLoading, setLikeLoading] = useState(false);

  const handleLike = async () => {
    setLikeLoading(true);
    const ref = doc(db, "posts", post.id);
    await updateDoc(ref, {
      likes: (post.likes || 0) + 1,
    });
    setLikeLoading(false);
    onChanged();
  };

  return (
    <article className="post-card">
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      {post.mediaUrl && (
        <div className="media-wrapper">
          {post.mediaType === "image" ? (
            <img src={post.mediaUrl} alt={post.title} />
          ) : (
            <video src={post.mediaUrl} controls />
          )}
        </div>
      )}

      <div className="post-meta">
        <button onClick={handleLike} disabled={likeLoading}>
          👍 Like ({post.likes || 0})
        </button>
      </div>

      <CommentsSection postId={post.id} isAdmin={isAdmin} />
    </article>
  );
}
