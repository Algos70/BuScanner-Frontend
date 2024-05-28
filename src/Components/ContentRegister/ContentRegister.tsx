import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { RegisterFormInterface } from "../../Models/models";
import { useState } from "react";
import { register } from "../../Utils/APIUtils";
import CustomModal from "../Modal/CustomModal";
import { notify } from "../../Utils/Utils";
import "./ContentRegister.css";

function ContentRegister() {
  const [registerForm, setRegisterForm] = useState<RegisterFormInterface>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const passwordValidationRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|/<>])[A-Za-z\d!@#$%^&*(),.?":{}|/<>]{8,}$/;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confPasswordError, setConfPasswordError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "userName") {
      e.target.value.length <= 6
        ? setUsernameError("Username must be longer than 6 characters.")
        : setUsernameError("");
    } else if (e.target.name === "password") {
      !passwordValidationRegex.test(e.target.value)
        ? setPasswordError(
            "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
          )
        : setPasswordError("");
    } else if (e.target.name === "confirmPassword") {
      e.target.value !== registerForm.password
        ? setConfPasswordError("Both passwords must be identical!")
        : setConfPasswordError("");
    }
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (registerForm.userName.length <= 6) {
      setUsernameError("Username must be longer than 6 characters.");
      return;
    } else if (!passwordValidationRegex.test(registerForm.password)) {
      setPasswordError(
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }
    const response = await register(registerForm).catch(() => {
      notify("Error registering user", "error");
    });
    if (response.succeeded) {
      setIsModalOpen(true);
      setRegisterForm({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  const validateForm = () => {
    return (
      registerForm.firstName.length > 0 &&
      registerForm.lastName.length > 0 &&
      registerForm.userName.length > 6 &&
      registerForm.email.length > 0 &&
      registerForm.password.length > 0 &&
      registerForm.confirmPassword.length > 0 &&
      registerForm.confirmPassword === registerForm.password
    );
  };

  const modelChildren = () => {
    return (
      <div className="e-mail-conf-container">
        <p>An email is sent to your mail, please check your inbox to confirm your account</p>
      </div>
    );
  };

  return (
    <div>
      <Container fluid className="login-container">
        <Row>
          <Col>
            <span className="login-text">Sign Up</span>
          </Col>
        </Row>
      </Container>
      <Container fluid className="loginForm-container">
        <Row>
          <Col>
            <Form className="loginForm">
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>
                  First Name:<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={registerForm.firstName}
                  name="firstName"
                  type="text"
                  required
                  placeholder="Enter first name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>
                  Last Name:<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={registerForm.lastName}
                  name="lastName"
                  type="text"
                  required
                  placeholder="Enter last name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicUserName">
                <Form.Label>
                  UserName:<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={registerForm.userName}
                  name="userName"
                  type="text"
                  required
                  placeholder="Enter a Username"
                  minLength={6}
                />
                {usernameError && (
                  <div className="text-danger">{usernameError}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  Email:<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={registerForm.email}
                  name="email"
                  type="email"
                  required
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>
                  Password:<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={registerForm.password}
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                />
                {passwordError && (
                  <div className="text-danger">{passwordError}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formConfirmBasicPassword">
                <Form.Label>
                  Confirm Password:<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={registerForm.confirmPassword}
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="Confirm Password"
                />
                {confPasswordError && (
                  <div className="text-danger">{confPasswordError}</div>
                )}
              </Form.Group>

              <Button
                onClick={handleRegister}
                disabled={!validateForm()}
                className="loginbtn"
                type="submit"
              >
                Sign up
              </Button>

              <Form.Text>
                Do you have an account ? <a href="/signin">Sign in</a>
              </Form.Text>
            </Form>
          </Col>
        </Row>
      </Container>
      <CustomModal modalShow={isModalOpen} setModalShow={setIsModalOpen}>
        {modelChildren()}
      </CustomModal>
    </div>
  );
}

export default ContentRegister;
