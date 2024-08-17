import { useDispatch } from "react-redux";
import { logout } from "../store/AuthReducer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate("/store");
  }, []);

  return <h1>Logout</h1>;
}

const action = () => {};
