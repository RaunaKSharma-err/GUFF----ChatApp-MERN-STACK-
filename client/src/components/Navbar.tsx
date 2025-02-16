import { MessageSquareQuote, Settings } from "lucide-react";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">
            <MessageSquareQuote />
            GUFF
          </a>
        </div>
        <div className="flex-none">
          <button className="btn btn-ghost">
            <Settings />
            Settings
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
