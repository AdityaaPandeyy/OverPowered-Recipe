import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Navbar() {
  const [cookies,setCookies] = useCookies(["access_token"])
  
  const handleLogout = () => {
    setCookies("access_token","")
    window.localStorage.removeItem("userID")
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">OverPowered Recipe</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/" style={{"textDecoration":"bold"}}>Home</Link>
            </li>
            {!cookies.access_token ? (<li className="nav-item">
              <Link className="nav-link fs-5" to="/auth" style={{"textDecoration":"bold"}}>Login/Register</Link>
            </li>) : (<><li className="nav-item">
              <Link className="nav-link fs-5" to="/saved-recipes" style={{"textDecoration":"bold"}}>Saved Recipes</Link>
            </li><li className="nav-item">
              <Link className="nav-link fs-5" to="/auth" style={{"textDecoration":"bold"}} onClick = {handleLogout}>Logout</Link>
            </li></>)}
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/create-recipe" style={{"textDecoration":"bold"}}>Create Recipe</Link>
            </li>
          </ul>
          <form className="form-inline" style={{ display: "flex", marginLeft: "auto" }}>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-light" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
