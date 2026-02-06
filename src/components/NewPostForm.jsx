import {
  db,
  storage,
  collection,
  addDoc,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../firebase";
import { useState } from "react";

export default function NewPostForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let mediaUrl = null;
      let mediaType = null;

      if (media) {
        const storageRef = ref(storage, `posts/${Date.now()}_${media.name}`);
        await uploadBytes(storageRef, media);
        mediaUrl = await getDownloadURL(storageRef);
        mediaType = media.type.startsWith("image") ? "image" : "video";
      }

      await addDoc(collection(db, "posts"), {
        title,
        content,
        mediaUrl,
        mediaType,
        likes: 0,
        createdAt: new Date(),
      });

      setTitle("");
      setContent("");
      setMedia(null);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-post-form">
      <h2>Create New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setMedia(e.target.files[0])}
      />
      <button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Post"}
      </button>
    </form>
  );
}
