import { Placeholder } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "../App.module.css";
export default function Header() {
    const username = useSelector((state) => state.auth.username);
    //const username = 'Username place holder';
    return (
        <div className={"container-fluid m-0 text-white bg-success p-5 text-center Header"}>
            <h4>React Router</h4>
            <h3>Welcome {username}</h3>
        </div>
    );
}
n