import PostList from "../components/PostList";

export default function Home() {
  return (
    <div className="home">
      <h1>Farmers Community</h1>
      <p>Welcome to our farming community! Stay updated with the latest posts.</p>
      <PostList />
    </div>
  );
}
