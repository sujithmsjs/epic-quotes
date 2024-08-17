import { useSelector } from "react-redux";
import Illigal from "../my-ui/Illegal";

export default function Signup() {
  const username = useSelector((store) => store.auth.username);
  const isLogin = useSelector((store) => store.auth.login);

  return (
    <>
      <h1>Signup</h1>
      <h5>Welcome {username}</h5>
      <Illigal isLoginRequired={false} />
    </>
  );
}
