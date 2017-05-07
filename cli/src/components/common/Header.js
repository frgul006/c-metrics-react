import React from "react";
import { NavLink } from 'react-router-dom';
import "./Header.css";

// Stateless Functional Component
const Header = () => {
    return (
        <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
                {/*<!-- Title -->*/}
                <span className="mdl-layout-title">Campanja Assignment</span>
                {/*<!-- Add spacer, to align navigation to the right -->*/}
                <div className="mdl-layout-spacer" />
                {/*<!-- Navigation -->*/}
                <nav className="mdl-navigation">
                    <NavLink to="/" className="mdl-navigation__link" activeClassName="mdl-navigation__link--active">Home</NavLink>
                    <NavLink to="/metrics" className="mdl-navigation__link" activeClassName="mdl-navigation__link--active">Metrics</NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;