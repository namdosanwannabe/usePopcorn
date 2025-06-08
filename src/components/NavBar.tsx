import React from "react";
import Logo from "./Logo";

const NavBar: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <nav className="nav-bar">
            <Logo />
            {children}
        </nav>
    );
};

export default NavBar;
