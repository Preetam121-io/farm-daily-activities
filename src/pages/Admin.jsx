import { useState } from "react";
import NewPostForm from "../components/NewPostForm";
import PostList from "../components/PostList";

export default function Admin() {
  const [refresh, setRefresh] = useState(0);

  const handleSuccess = () => {
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="admin">
      <h1>Admin Dashboard</h1>
      <NewPostForm onSuccess={handleSuccess} />
      <hr />
      <h2>All Posts</h2>
      <PostList key={refresh} />
    </div>
  );
}
