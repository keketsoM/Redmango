import { NavLink } from "react-router-dom";
import { useGetAllShoppingCartQuery } from "../../Apis/ShoppingCartApi";
import { MiniLoader } from "../Page/Common";
let logo = require("../../Assets/Images/mango.png");

function Header() {
  const { data, isLoading } = useGetAllShoppingCartQuery(
    "f3443504-018c-4d9d-beba-1bfebdc249a9"
  );

  console.dir(data);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <NavLink to={"/"}>
            <img
              src={logo}
              alt="Mango"
              className="navbar-brand"
              style={{ height: "35px", verticalAlign: "top" }}
            ></img>
          </NavLink>

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
                <NavLink className="nav-link" aria-current="page" to={"/"}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to={"/shoppingCart"}
                >
                  <i className="bi bi-cart4"></i>
                  <span className="badge">
                    {isLoading ? (
                      <MiniLoader />
                    ) : data == undefined || data.result.cartItems.length == null ? (
                      0
                    ) : (
                      data.result.cartItems.length
                    )}
                  </span>
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin Panel
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>

                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Header;
