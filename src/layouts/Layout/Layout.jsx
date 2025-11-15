import { Outlet } from "react-router";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Layout.css";

function Layout({ products, cart, tab, setTab, user, setUser }) {
  return (
    <div>
      <Header />
      <Navbar
        tab={tab}
        setTab={setTab}
        products={products}
        cart={cart}
        user={user}
        setUser={setUser}
      />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;