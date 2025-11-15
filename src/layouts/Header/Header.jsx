import "./Header.css";

function Header() {
  return (
    <div className="header-container">
      <h1>
        <span className="badge bg-danger">C</span>
        <span className="badge bg-success">S</span>
        <span className="badge bg-primary">I</span>
        <span className="badge bg-info">2</span>
        <span className="badge bg-warning">0</span>
        <span className="badge bg-secondary">5</span>
      </h1>
    </div>
  );
}

export default Header; 