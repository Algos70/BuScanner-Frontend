import { Container, Row } from 'react-bootstrap';
import './Footer.css';

function Footer() {
  return (
    
    
    <Container>
        <Row>
            <div className="col-md-6 mx-auto text-center">
                <a className='footer-a' href='/about'><p>About us</p></a>
                <a className='footer-a' href='/sustainability'><p>Sustainability</p></a>
                <a className='footer-a' href='/advertisewithbuscanner'><p>Advertise with BuScanner</p></a>
                <a className='footer-a' href='/travelinsight'><p>Travel Insight</p></a>
            </div>
        </Row>
        <Container>
            <Row>
                <p className="col-sm">
                    &copy;{new Date().getFullYear()} BuScanner. All right reserved
                </p>
            </Row>
        </Container>
    </Container>
        
    
  )
}

export default Footer
