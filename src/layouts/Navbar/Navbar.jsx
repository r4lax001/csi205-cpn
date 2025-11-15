import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ tab, setTab, products, cart, user, setUser }) {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="navbar-container">
      <Link to="/home">
        <button
          className={
            "btn " + (tab === "home" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("home")}
        >
          Home
        </button>
      </Link>

      <Link to="/calculator">
        <button
          className={
            "btn " +
            (tab === "calculator" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("calculator")}
        >
          Calculator
        </button>
      </Link>

      <Link to="/animation">
        <button
          className={
            "btn " +
            (tab === "animation" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("animation")}
        >
          Animation
        </button>
      </Link>

      <Link to="/components">
        <button
          className={
            "btn " +
            (tab === "components" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("components")}
        >
          Components
        </button>
      </Link>

      <Link to="/todos">
        <button
          className={
            "btn " + (tab === "todos" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("todos")}
        >
          Todos
        </button>
      </Link>

      <Link to="/products">
        <button
          className={
            "btn " +
            (tab === "products" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("products")}
        >
          Products ({products.length})
        </button>
      </Link>

      <Link to="/cart">
        <button
          style={{ position: "relative" }}
          className={
            "btn cart-btn " +
            (tab === "cart" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("cart")}
        >
          Cart
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cart.length}
            <span className="visually-hidden">unread messages</span>
          </span>
        </button>
      </Link>

      {user && (
        <button
          className="btn btn-outline-danger"
          onClick={handleLogout}
          style={{ marginLeft: "10px" }}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Navbar;