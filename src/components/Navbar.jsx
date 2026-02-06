src/components/Navbar.jsximport { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { signInWithGoogle, logOut } from "../firebase";

export default function Navbar() {
  const { user, isAdmin } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          Farmers Community
        </Link>
      </div>
      <div className="navbar-right">
        {isAdmin && <Link to="/admin">Admin</Link>}
        {user ? (
          <>
            <span className="user-name">{user.displayName}</span>
            <button onClick={logOut}>Logout</button>
          </>
        ) : (
          <button onClick={signInWithGoogle}>Login with Google</button>
        )}
      </div>
    </nav>
  );
}
