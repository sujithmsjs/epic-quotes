
import { Outlet } from "react-router-dom";

export default function Content() {
  return (
    <div className="container-md mt-2">
      <Outlet />
    </div>
  );
}
