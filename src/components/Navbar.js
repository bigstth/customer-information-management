import React, { useState } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { ImMenu, ImCross } from 'react-icons/im';
import SidebarData from './SidebarData';
import NavbarStyle from './../styles/NavbarStyle';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const showSidebar = () => setSidebarStatus(!sidebarStatus);

  return (
    <>
      <NavbarStyle>
        <NavLink
          to="#"
          className="menu-icon"
          exact
          activeClassName="nav-active"
        >
          <ImMenu onClick={showSidebar}></ImMenu>
        </NavLink>
        <NavLink to="/sign-in" exact activeClassName="nav-active">
          <Button variant="outline-light" size="sm">
            Sign in
          </Button>
        </NavLink>
      </NavbarStyle>
      <Nav
        defaultActiveKey="/"
        className={
          sidebarStatus ? 'nav-menu active flex-column' : 'nav-menu flex-column'
        }
      >
        <Nav.Item className="navbar-toggle">
          <NavLink to="#" className="menu-icon" exact>
            <ImCross onClick={showSidebar}></ImCross>
          </NavLink>
        </Nav.Item>
        {SidebarData.map((item, index) => {
          return (
            <Nav.Item key={index} className={item.className}>
              <NavLink
                to={item.path}
                onClick={showSidebar}
                exact
                activeClassName="nav-active"
              >
                {item.icon} <span>{item.title}</span>
              </NavLink>
            </Nav.Item>
          );
        })}
      </Nav>
    </>
  );
};

export default Navbar;
