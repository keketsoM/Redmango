import { Route, Routes } from "react-router-dom";
import { Footer, Header } from "../Components/Layout";
import { Home, MenuItemDetails, ShoppingCart } from "../Pages";

function App() {
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<ShoppingCart />} />
          <Route
            path="/MenuItemDetails/:menuItemId"
            element={<MenuItemDetails />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
