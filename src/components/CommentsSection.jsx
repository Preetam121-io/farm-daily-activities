import {
  db,
  collection,
  query,
  where,
  orderBy,
  addDoc,
  onSnapshot,
} from "../firebase";
import { useState, useEffect } from "react";

export default function CommentsSection({ postId, isAdmin }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("postId", "==", postId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "comments"), {
        postId,
        text: newComment,
        createdAt: new Date(),
      });
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments ({comments.length})</h3>

      {isAdmin && (
        <form onSubmit={handleSubmit} className="comment-form">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      )}

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.text}</p>
            <small>
              {comment.createdAt?.toDate().toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
