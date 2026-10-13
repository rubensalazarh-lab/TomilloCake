import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Layout from "./Components/layouts/Layout";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

