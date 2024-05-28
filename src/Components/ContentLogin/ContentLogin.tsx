import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./ContentLogin.css";
import { LoginFormInterface } from "../../Models/models";
import { useState } from "react";
import { login } from "../../Utils/APIUtils";
import { useNavigate } from "react-router-dom";
import { notify } from "../../Utils/Utils";

function ContentLogin() {
  const [loginForm, setLoginForm] = useState<LoginFormInterface>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    login(loginForm.email, loginForm.password)
      .then((response) => {
        if (response.succeeded) {
          notify("Logged in successfully", "success");
          navigate("../");
        }
      })
      .catch(() => {
        notify("Invalid email or password", "error");
        setLoginForm({
          ...loginForm,
          password: "",
        });
      });
  };

  const handleChange = (value: string, type: "email" | "password") => {
    setLoginForm({
      ...loginForm,
      [type]: value,
    });
  };

  return (
    <div>
      <Container fluid className="login-container">
        <Row>
          <Col>
            <span className="login-text">Sign in</span>
          </Col>
        </Row>
      </Container>
      <Container fluid className="loginForm-container">
        <Row>
          <Col>
            <Form className="loginForm">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  Email:<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  onChange={(e) => {
                    handleChange(e.target.value, "email");
                  }}
                  value={loginForm.email}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>
                  Password:<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  onChange={(e) => {
                    handleChange(e.target.value, "password");
                  }}
                  value={loginForm.password}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Button onClick={handleLogin} className="loginbtn" type="submit">
                Sign in
              </Button>

              <Form.Text>
                Don't have an account ? <a href="/signup">Sign Up</a>
              </Form.Text>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContentLogin;
