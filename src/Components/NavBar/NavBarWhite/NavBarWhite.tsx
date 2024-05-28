import { Container, Button } from "react-bootstrap";
import "./NavBarWhite.css";
import { getLocalUserInfo } from "../../../Utils/Utils";
import { useEffect, useState } from "react";
import UserAvatar from "../../UserAvatar/UserAvatar";

function NavBarWhite() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userData, setUserData] = useState<string | null>(getLocalUserInfo());

  useEffect(() => {
    setUserData(getLocalUserInfo());
  }, []);

  return (
    <Container fluid className="navbar-white">
      <Container className="navwhiteContainer">
        <a href="/" className="nav-w-text">
          BuScanner
        </a>
        {userData ? (
          <UserAvatar userInfo={JSON.parse(userData)} />
        ) : (
          <div className="navlargeItems">
            <a href="/signup">
              <Button className="navWhiteButton">Sign Up</Button>
            </a>
            <a href="/signin">
              <Button className="navWhiteButton">Sign in</Button>
            </a>
          </div>
        )}
      </Container>
    </Container>
  );
}

export default NavBarWhite;
