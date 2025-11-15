import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Layout from "./layouts/Layout/Layout";

import Home from "./pages/Home/Home";
import Calculator from "./pages/Calculator/Calculator";
import Component from "./pages/components/Components/component";
import Animation from "./pages/Animation/animation";
import Todos from "./pages/Todos/Todos";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";

import { fetchProducts } from "./data/products";
import { verifyUser } from "./data/users";

import "./App.css";

function App() {
  const [tab, setTab] = useState("");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => setProducts(fetchProducts()), [])
  useEffect(() => console.log(products), [products])

  if (!user) {
    return <Login setUser={setUser} verifyUser={verifyUser} />;
  }


  return (
    <div className="app-container">
      <HashRouter>
        <Routes>
          <Route
            element={
              <Layout
                products={products}
                cart={cart}
                tab={tab}
                setTab={setTab}
                user={user}
                setUser={setUser}
              />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/animation" element={<Animation />} />
            <Route path="/components" element={<Component />} />
            <Route path="/todos" element={<Todos />} />
            <Route
              path="/products"
              element={
                <Products products={products} cart={cart} setCart={setCart} />
              }
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} setCart={setCart} />}
            />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
