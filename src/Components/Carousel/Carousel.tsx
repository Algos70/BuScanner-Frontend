import "./Carousel.css";
import { Container } from "react-bootstrap";

function Carousel() {
  const handleClick = () => {
    window.location.href = "/provinces";
  };

  return (
    <Container className="carousel-container">
      <div className="left-carousel">
        <div className="left-carousel-content">
          <div className="carousel-texts">
            <h1 className="carousel-header">
              Check Out Our Diverse Provinces Guide!
            </h1>
            <p className="carousel-p">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consectetur dolorum eius consequuntur error, quidem aperiam? Eius
              voluptate, a in minus enim adipisci, doloribus harum culpa quia
              ducimus, similique quis mollitia!
            </p>
          </div>

          <button onClick={handleClick} className="carousel-btn">
            Learn More
          </button>
        </div>
      </div>
      <div className="right-carousel">
        <img
          className="carousel-img"
          src="https://i.imgur.com/2PWBtib.jpeg"
          alt="beachMan"
        />
      </div>
    </Container>
  );
}

export default Carousel;
