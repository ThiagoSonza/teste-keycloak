import { Key, SignOut } from "phosphor-react";
import { Link } from "react-router-dom";
import "./style.css";
import { useContext } from "react";
import { AuthContext } from "../../context";

export default function Menu() {
  const { logout, user } = useContext(AuthContext);
  
  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    logout();
  }

  return (
    <div className="menu">
      <Link to={"/"}>
        <span> Clientes </span>
      </Link>

      <div>
        <div className="user">
          <span>{user?.name}</span>
          <span>{user?.cargo ?? "-.-"}</span>
        </div>

        <Link to={"https://keycloak-k8s.bemdev.com.br/realms/poc-keycloak/account/"} target="_blank">
          <Key weight="thin" size={24} />
        </Link>

        <Link to={""} onClick={handleLogout}>
          <SignOut weight="thin" size={24} />
        </Link>
      </div>

    </div>
  );
}
