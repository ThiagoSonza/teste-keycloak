import { Lock, SignOut } from "phosphor-react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Menu() {
  return (
    <div className="menu">
      <Link to={"/"}>
        <Lock weight="thin" size={24} />
      </Link>

      <Link to={"/private"}>
        <Lock weight="thin" size={24} />
      </Link>

      <hr />

      <Link to={"/login"}>
        <SignOut weight="thin" size={24} />
      </Link>
    </div>
  );
}
