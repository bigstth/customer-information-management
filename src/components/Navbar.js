import React, { useState, useEffect } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { ImMenu, ImCross } from 'react-icons/im';
import SidebarData from './SidebarData';
import NavbarStyle from './../styles/NavbarStyle';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { UserStoreContext } from '../context/UserContext';
const Navbar = () => {
  const history = useHistory();
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const showSidebar = () => setSidebarStatus(!sidebarStatus);

  const userStore = React.useContext(UserStoreContext);
  const getProfile = () => {
    const profileValue = JSON.parse(localStorage.getItem('profile'));
    if (profileValue) {
      userStore.updateProfile(profileValue);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    userStore.updateProfile(null);
    history.replace('/sign-in');
  };
  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        <div>
          {userStore.profile ? (
            <>
              <span className="text-light">{userStore.profile.full_name}</span>
              <Button
                variant="light"
                size="sm"
                className="mx-2"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/register" activeClassName="nav-active">
                <Button variant="outline-light" size="sm" className="mr-2">
                  Register
                </Button>
              </NavLink>
              <NavLink to="/sign-in" activeClassName="nav-active">
                <Button variant="outline-light" size="sm">
                  Sign in
                </Button>
              </NavLink>
            </>
          )}
        </div>
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
