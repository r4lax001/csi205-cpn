import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import "./Cart.css";

function Cart({ cart, setCart }) {
  const handleRemove = (id) => {
    setCart(cart.filter((c) => c.id !== id));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart <i class="bi bi-cart3"></i></h2>

      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <Card key={item.id} className="cart-card">
                <Card.Img
                  variant="top"
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="cart-img"
                />
                <Card.Body>
                  <Card.Text className="cart-text">{item.title}</Card.Text>
                  <Card.Text className="cart-price">
                    ${item.price.toFixed(2)}
                  </Card.Text>
                  <Button
                    variant="danger"
                    className="delete-btn"
                    onClick={() => handleRemove(item.id)}
                  >
                    Delete from Cart
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>

          <div className="cart-summary">
            <p>
              Products:{" "}
              <Badge bg="danger">{cart.length} items</Badge> - Total price:{" "}
              <Badge bg="success">${totalPrice.toFixed(2)}</Badge>
            </p>
            <Button variant="warning" className="checkout-btn">
              Checkout <i class="bi bi-credit-card"></i>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;