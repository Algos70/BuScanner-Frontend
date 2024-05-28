import { Container } from 'react-bootstrap';
import './NavBarSmall.css';

function NavBarSmall() {
  return (
    <Container fluid className="navbar-large">
    <Container className="navlargeContainer">
      <a href="/" className="nav-text">
        BuScanner
      </a>
    </Container>
  </Container>
  )
}

export default NavBarSmall