import { useSelector } from "react-redux";

export default function Home() {
  const username = useSelector((store) => store.dfgfg);
  return (
    <>
      <h1>Welcome {username}</h1>
    </>
  );
}
