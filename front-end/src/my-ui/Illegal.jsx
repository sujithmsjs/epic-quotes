import { useSelector } from "react-redux";

export default function Illigal({ isLoginRequired }) {
  const username = useSelector((store) => store.auth.username);
  const isLogin = useSelector((store) => store.auth.login);

  return (
    <>
      {isLogin === isLoginRequired ? (
        <h4 className="text-success">legal access :)</h4>
      ) : (
        <h4 className="text-danger">illegal access :(</h4>
      )}
    </>
  );
}
