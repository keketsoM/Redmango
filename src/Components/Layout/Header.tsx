import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetAllShoppingCartQuery } from "../../Apis/ShoppingCartApi";
import { cartItemModel, userModel } from "../../Interface";
import { RootState } from "../../Storage/Redux/store";
import {
  emptyUserState,
  setLoggedInUser,
} from "../../Storage/Redux/userAuthSlice";
let logo = require("../../Assets/Images/mango.png");

function Header() {
  const { data, isLoading } = useGetAllShoppingCartQuery(
    "f3443504-018c-4d9d-beba-1bfebdc249a9"
  );
  const shoppingCartFromDb: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartstore.cartItems ?? []
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthstore ?? []
  );
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState }));
    navigate("/");
  };
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
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
                    {shoppingCartFromDb?.length
                      ? `(${shoppingCartFromDb.length})`
                      : `(${0})`}
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to={"/authentication"}
                >
                  Authantication
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to={"/authorization"}
                >
                  Authorization
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
              <div className="d-flex" style={{ marginLeft: "auto" }}>
                {userData.nameid && (
                  <>
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        style={{
                          cursor: "pointer",
                          background: "transparent",
                          border: 0,
                        }}
                      >
                        Welcome, {userData.unique_name}
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px",
                        }}
                        className="btn btn-success btn-outline rounded-pill text-white mx-2"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
                {!userData.nameid && (
                  <>
                    <li>
                      <NavLink className="nav-link" to="/register">
                        Register
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px",
                        }}
                        className="btn btn-success btn-outline rounded-pill text-white mx-2"
                        to="/login"
                      >
                        Login
                      </NavLink>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Header;
