import { LogOut, MessageSquareQuote, Settings, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          <MessageSquareQuote />
          GUFF
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        {authUser ? (
          <>
            <Link to="/setting" className="btn btn-ghost">
              <Settings />
              Settings
            </Link>
            <Link to="/profile" className="btn btn-ghost">
              <User />
              Profile
            </Link>
            <button className="btn btn-ghost" onClick={logout}>
              <LogOut />
              Logout
            </button>
          </>
        ) : (
          <Link to="/setting" className="btn btn-ghost">
            <Settings />
            Settings
          </Link>
        )}
      </div>

      <div className="md:hidden dropdown dropdown-end">
        {authUser ? (
          <>
            <button
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={authUser.profilePic || "/default.png"}
                  className="rounded-full w-[80px] h-[40px]"
                />
              </div>
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] mt-3 w-52 space-y-2 rounded-box bg-base-100 p-2 shadow"
            >
              {authUser ? (
                <>
                  <li>
                    <Link to="/setting">
                      <Settings />
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile">
                      <User />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={logout}>
                      <LogOut />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/setting">
                    <Settings />
                    Settings
                  </Link>
                </li>
              )}
            </ul>
          </>
        ) : (
          <Link to="/setting" className="btn btn-ghost">
            <Settings />
            Settings
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
