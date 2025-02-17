import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useGetAllShoppingCartQuery } from "../Apis/ShoppingCartApi";
import { Footer, Header } from "../Components/Layout";
import { userModel } from "../Interface";
import {
  AccessDenied,
  AllOrders,
  AuthenticationTest,
  AuthorizationTestAdmin,
  Home,
  Login,
  MenuItemDetails,
  MyOrders,
  NotFound,
  OrderConfirmed,
  OrderDetails,
  Payments,
  Register,
} from "../Pages";
import ShoppingCart from "../Pages/ShoppingCart";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import { RootState } from "../Storage/Redux/store";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userAuthstore);
  
  const { data, isLoading } = useGetAllShoppingCartQuery(userData.nameid);

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

          <Route path="/Payment" element={<Payments />} />
          <Route
            path="/Order/orderconfirmed/:id"
            element={<OrderConfirmed />}
          />
          <Route path="/Order/orderDetails/:id" element={<OrderDetails />} />
          <Route path="/Order/MyOrders" element={<MyOrders />} />
          <Route path="/Order/AllOrders" element={<AllOrders/>} />
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
