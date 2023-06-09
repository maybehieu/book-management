import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { NavbarContext } from './NavBarContext';
const NavBar = () => {
  const { isLoggedIn, activeUser, isAdmin, isPageSwitch } = useContext(AuthContext);
  const { updateLoginStatus, updateAdminStatus, updateActiveUser } = useContext(AuthContext);

  const { reRender } = useContext(NavbarContext)

  const [showIndicator, isShowIndicator] = useState(false)
  const [numIndicator, setNumIndicator] = useState(0)

  const logoutHandle = () => {
    updateActiveUser('')
    updateAdminStatus(false)
    updateLoginStatus(false)
  }

  useEffect(() => {
    if (isLoggedIn) {
      var api = ''

      if (isAdmin) {
        api = 'http://localhost:9091/server/pending-orders'
      } else {
        api = 'http://localhost:9091/server/cart/' + activeUser
      }
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            console.log(data.length)
            isShowIndicator(true)
            setNumIndicator(data.length)
          } else {
            isShowIndicator(false)
          }
        })
        .catch((err) => console.log(err))
    }
  }, [activeUser, isPageSwitch, reRender])
  return (
    <div>
      {/* <!-- Navbar --> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* <!-- Container wrapper --> */}
        <div className="container-fluid">
          {/* <!-- Collapsible wrapper --> */}
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            {/* <!-- Navbar brand --> */}
            <a className="navbar-brand mt-2 mt-lg-0" href="http://localhost:3000/">
              {/* <img
                src="https://media.istockphoto.com/id/1338909550/vector/open-book-logo-emblem-for-a-bookstore-or-typography-in-a-minimal-style-of-thin-lines.jpg?s=612x612&w=0&k=20&c=8Zo_oTs31xuGwPkBU2RE1IdnVPKWEPAoCkDh2fpstkI="
                height="55"
                alt="Bookstore Logo"
                loading="lazy"
              /> */}
              <i className="fa fa-book fa-lg" aria-hidden="true"></i>
            </a>
            {/* <!-- Left links --> */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="http://localhost:3000/">Home</a>
              </li>
            </ul>
            {/* <!-- Left links --> */}
          </div>
          {/* <!-- Collapsible wrapper --> */}

          {/* <!-- Right elements --> */}
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center me-3">
              <p className="text-reset mb-0">
                {isLoggedIn ? `Hello, ${activeUser}!` : ''}
              </p>
            </div>

            <div className="d-flex align-items-center me-3">
              {
                isLoggedIn && (
                  <a className="text-reset" href="http://localhost:3000/cart">
                    {isAdmin ? (
                      <>
                        <i className="fas fa-truck fa-lg"></i>
                        {
                          showIndicator && (
                            <span className="position-absolute translate-middle badge bg-primary circle">
                              {numIndicator}
                            </span>
                          )
                        }
                      </>
                    ) : (
                      <>
                        <i className="fas fa-shopping-cart fa-lg"></i>
                        {
                          showIndicator && (
                            <span className="position-absolute translate-middle badge bg-primary circle">
                              {numIndicator}
                            </span>
                          )
                        }
                      </>
                    )}
                  </a>)
              }
            </div>

            <div className="d-flex align-items-center me-3">
              {isLoggedIn ? (
                <a className="text-reset" href="http://localhost:3000/login" onClick={logoutHandle}>
                  <i className="fas fa-sign-out fa-lg"></i>
                </a>
              ) : (
                <a className="text-reset" href="http://localhost:3000/login">
                  <i className="fas fa-sign-in fa-lg"></i>
                </a>
              )}
            </div>
          </div>
          {/* <!-- Right elements --> */}
        </div>
        {/* <!-- Container wrapper --> */}
      </nav>
      {/* <!-- Navbar --> */}
    </div>
  )
}

export default NavBar