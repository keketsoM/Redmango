import { Route, Routes } from "react-router-dom";
import { Footer, Header } from "../Components/Layout";
import { Home, ShoppingCart } from "../Pages";

function App() {
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<ShoppingCart />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
