import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Products.css';

function Products({ products, cart, setCart }) {
  const handleAddToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="products-container">
      <div className="products-items-container">
        {products.map((product) => (
          <Card
            style={{ width: '18rem' }}
            key={product.id}
            className="m-2 shadow-sm"
          >
            <Card.Img
              variant="top"
              src={product.thumbnailUrl}
              alt={product.title}
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body>
              <Card.Title style={{ fontSize: '1rem' }}>
                {product.title}
              </Card.Title>
              <Card.Text style={{ color: '#0d6efd', fontWeight: 'bold' }}>
                ${product.price.toFixed(2)}
              </Card.Text>

              {cart.find((c) => c.id === product.id) ? (
                <span className="btn btn-danger">Added to Cart</span>
              ) : (
                <Button
                  variant="outline-primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Products;