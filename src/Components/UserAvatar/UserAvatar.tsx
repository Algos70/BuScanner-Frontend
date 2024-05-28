import "./UserAvatar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  generateBackground,
  getInitials,
  notify,
} from "../../Utils/Utils";
import { UserInterface } from "../../Models/models";
import { useNavigate } from "react-router-dom";

interface UserAvatarProps {
  userInfo: UserInterface;
}

function UserAvatar({ userInfo }: UserAvatarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    notify("Logged out successfully", "success");
    navigate("../");
    navigate(0);
  };

  return (
    <Navbar
      style={{ backgroundColor: generateBackground(userInfo.userName) }}
      className="user-avatar-container"
      color="white"
      expand="lg"
    >
      <Container fluid>
        <Navbar.Toggle />
        <Navbar.Collapse id="avatar-collapse">
          <Nav>
            <NavDropdown
              id="avatar-dropdown"
              title={getInitials(userInfo.userName)}
              className="no-caret"
            >
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserAvatar;
