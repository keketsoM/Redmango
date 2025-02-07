import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useGetAllShoppingCartQuery } from "../Apis/ShoppingCartApi";
import { Footer, Header } from "../Components/Layout";
import { userModel } from "../Interface";
import {
  AccessDenied,
  AuthenticationTest,
  AuthorizationTestAdmin,
  Home,
  Login,
  MenuItemDetails,
  NotFound,
  Register,
} from "../Pages";
import ShoppingCart from "../Pages/ShoppingCart";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
function App() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllShoppingCartQuery(
    "f3443504-018c-4d9d-beba-1bfebdc249a9"
  );

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { unique_name, nameid, email, role }: userModel =
        jwt_decode(localToken);
      dispatch(setLoggedInUser({ unique_name, nameid, email, role }));
    }
  }, []);
  useEffect(() => {
    if (!isLoading) {
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);

  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/AccessDenied" element={<AccessDenied />} />
          <Route path="/Authentication" element={<AuthenticationTest />} />
          <Route path="/Authorization" element={<AuthorizationTestAdmin />} />
          <Route
            path="/MenuItemDetails/:menuItemId"
            element={<MenuItemDetails />}
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
