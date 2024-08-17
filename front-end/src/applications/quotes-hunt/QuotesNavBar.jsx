import { NavLink, Outlet } from "react-router-dom";

const QuotesNavBar = () => {
    return (<>
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
            <div class="container">
                <ul class="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link active" to="" end>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="add" >New</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="tags">Tags</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="add-tag">Add Tag</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
        <Outlet />
    </>)
}

export default QuotesNavBar;