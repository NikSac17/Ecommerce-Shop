import React from "react";
import { Link, useLocation,useHistory } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    history.push("/login");
    alert("Logged out successfully", "success");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          FitnessStore
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/" ? "active" : ""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about" ? "active" : ""}`} to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/products" ? "active" : ""}`} to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/cart" ? "active" : ""}`} to="/cart">
                Cart
              </Link>
            </li>
          </ul>

          {!localStorage.getItem("token") ? (<form>
            <Link className="btn btn-primary" role="button" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary mx-2" role="button" to="/signup">
              Signup
            </Link>
          </form>) : (<form>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
                {/* <i className="far fa-user-circle fa-lg"></i> */}
              </button>
              <div className="btn btn-primary mx-2">
                {localStorage.getItem("username").toLocaleUpperCase()}
              </div>
            </form>)}


        </div>
      </div>
    </nav>
  );
};

export default Navbar;
