import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useGetAllShoppingCartQuery } from "../Apis/ShoppingCartApi";
import { Footer, Header } from "../Components/Layout";
import { Home, Login, MenuItemDetails, NotFound, Register } from "../Pages";
import ShoppingCart from "../Pages/ShoppingCart";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";

function App() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllShoppingCartQuery(
    "f3443504-018c-4d9d-beba-1bfebdc249a9"
  );

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
