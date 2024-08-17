import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavBarList = ({ ...props }) => {

    const dupProps = Object.assign({}, props);
    const { label } = dupProps;
    delete dupProps.label;

    return (
        <li className="nav-item">
            <NavLink {...props}>
                {label}
            </NavLink>
        </li>
    )
}
