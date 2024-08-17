import { useSelector } from "react-redux";
import { useRef } from "react";
import useCopy from "../hooks/useCopy";
import Illigal from "../my-ui/Illegal";

export default function Profile() {
  const username = useSelector((store) => store.auth.username);
  const isLogin = useSelector((store) => store.auth.login);
  const [about, handleAbout] = useCopy();

  return (
    <>
      <h1>Profile</h1>
      <h5 ref={about}>Welcome {username}</h5>
      <button className="btn btn-sm btn-success" onClick={handleAbout}>
        Copy
      </button>
      <Illigal isLoginRequired={true} />
    </>
  );
}
