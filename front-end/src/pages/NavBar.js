import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { NavBarList } from "./NavBarList";

export default function NavBar() {
    const isLogin = useSelector((store) => store.auth.login);
    // const isLogin = true;
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <div className="container">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>
                    </li>
                    {isLogin && (
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/profile">
                                    Profile
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/todos">
                                    Todos
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/prods">
                                    Products
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/words">
                                    Words Hunt
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/quotes">
                                    Quotes
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/employees">
                                    employees
                                </NavLink>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Code Snippets
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                    <li><a class="dropdown-item" href="#">Switch</a></li>
                                    <li><a class="dropdown-item" href="#">Dropboxs</a></li>
                                    <li><a class="dropdown-item" href="#">Pagination</a></li>
                                    <li>
                                        <Link className="dropdown-item" to="/sample/location">
                                            Select Location v1
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/sample/location2">
                                            Select Location v2
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/sample/location3">
                                            Select Location v3
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/sample/location3">
                                            Select Location v3
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/sample/modelv1">
                                            Model v1
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/sample/modelv2">
                                            Model v2
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/sample/modelv3">
                                            Model v3
                                        </Link>
                                    </li>
                                    <NavBarList className="dropdown-item" to="/sample/offcanvas1" label='OffCanvas1' />
                                    <NavBarList className="dropdown-item" to="/sample/imgupload" label='Image upload' />
                                    <NavBarList className="dropdown-item" to="/sample/dljson" label='Download JSON' />
                                    <NavBarList className="dropdown-item" to="/sample/readjson" label='Read JSON' />
                                </ul>
                            </li>
                        </>
                    )}

                    {!isLogin && (
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signup">
                                    Signup
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">
                                    Login
                                </NavLink>
                            </li>
                        </>
                    )}

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/store">
                            Store
                        </NavLink>
                    </li>
                    {isLogin && (
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/cart">
                                    Cart
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/todo">
                                    Todo
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/logout" disabled>
                                    {/* <span
                  className="spinner-border spinner-border-sm me-1"
                  role="status"
                  aria-hidden="true"
                ></span> */}
                                    Logout
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
