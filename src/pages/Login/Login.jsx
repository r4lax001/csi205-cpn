import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

function Login({ setUser, verifyUser }) {
  const [form, setForm] = useState({ user: "", pass: "" });
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = verifyUser(form.user, form.pass);

    if (result) {
      console.log("✅ Login success");
      console.log("👤 Username:", form.user);
      console.log("🎭 Role:", result.role);

      setUser({ user: form.user, role: result.role });
    } else {
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card border-0 shadow-sm">
        <Card.Body className="p-4">
          <h3 className="text-center fw-semibold mb-4 login-title">
            Login to continue
          </h3>

          <Form onSubmit={handleSubmit}>
            {/* Username */}
            <Form.Group className="mb-3">
              <div className="input-icon">
                <FaUser className="icon" />
                <Form.Control
                  type="text"
                  name="user"
                  placeholder="Username"
                  value={form.user}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-4">
              <div className="input-icon">
                <FaLock className="icon" />
                <Form.Control
                  type={showPass ? "text" : "password"}
                  name="pass"
                  placeholder="Password"
                  value={form.pass}
                  onChange={handleChange}
                />
                <span
                  className="toggle-pass"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </Form.Group>

            {/* Button */}
            <Button type="submit" className="w-100 login-btn">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;