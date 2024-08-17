import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Store() {
  const data = useSelector((prev) => prev);

  return (
    <div>
      <h1>Store</h1>
      <h4>
        <pre>{JSON.stringify(data, null, 5)}</pre>
      </h4>

      <NavLink className="nav-link" to="/profile">
        Profile
      </NavLink>
      <NavLink className="nav-link" to="/todos">
        Todos
      </NavLink>
      <NavLink className="nav-link" to="/login">
        Login
      </NavLink>
      <NavLink className="nav-link" to="/signup">
        Signup
      </NavLink>
    </div>
  );
}
