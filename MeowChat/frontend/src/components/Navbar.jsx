import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">MeowChat</a>
        </div>
        {/* {authUser && ( */}
        <div className="navbar-end">
          <Link to={"/profile"}>
            <button className="btn btn-ghost btn-circle">
              <User className="size-6 " />
            </button>
          </Link>

          <button className="btn btn-ghost btn-circle" onClick={logout}>
            <div className="indicator">
              <LogOut className="size-5" />
            </div>
          </button>
        </div>
        {/* )} */}
      </div>
    </header>
  );
};
export default Navbar;

// {authUser && (
//   <>
//     <Link to={"/profile"} className={`btn btn-sm gap-2`}>
//       <User className="size-5" />
//       <span className="hidden sm:inline">Profile</span>
//     </Link>

//     <button className="flex gap-2 items-center" onClick={logout}>
//       <LogOut className="size-5" />
//       <span className="hidden sm:inline">Logout</span>
//     </button>
//   </>
// )}
