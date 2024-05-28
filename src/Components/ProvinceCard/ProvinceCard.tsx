import { Col, Row } from "react-bootstrap";
import "./ProvinceCard.css";
import { Link } from "react-router-dom";
import { ProvinceModel } from "../../Models/models";
import { increaseCityPopularityById } from "../../Utils/APIUtils";

interface ProvinceCardProps {
  province: ProvinceModel;
}

function ProvinceCard({ province }: ProvinceCardProps) {

  const handleClicked = () => {
    increaseCityPopularityById(province.id);
  }

  return (
    <Col onClick={handleClicked} md={6} className="mb-4">
      <Link
        to={'../province/' + province.name}
        className="card province-card text-decoration-none"
      >
        <Row className="g-0">
          <Col className="col-6" md={4}>
            <img
              src={province.imageLink}
              className="card-image"
              alt={province.name}
            />
          </Col>
          <Col className="col-6" md={5}>
            <div className="card-body d-flex flex-column">
              <div className="h-100">
                <h5 className="card-title">{province.name}</h5>
              </div>
            </div>
          </Col>
        </Row>
      </Link>
    </Col>
  );
}

export default ProvinceCard;
