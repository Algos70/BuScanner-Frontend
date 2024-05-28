import { Col, Row } from "react-bootstrap";
import "./CompanyCard.css";
import { Link } from "react-router-dom";
import { CompanyModel } from "../../Models/models";
import {BusCompanyIds} from "../../Utils/Enums";
import { toCamelCase } from "../../Utils/Utils";

interface CompanyCardProps {
  company: CompanyModel;
}

function CompanyCard({ company }: CompanyCardProps) {
  const companyKey = toCamelCase(company.normalizedName) as keyof typeof BusCompanyIds;
  console.log(companyKey);
  return (
    <Col md={6} className="mb-4">
      <Link
        to={"../company/" + BusCompanyIds[companyKey]}
        className="card company-card text-decoration-none"
      >
        <Row className="g-0">
          <Col className="col-6" md={4}>
            <img
              src={company.imageLink}
              className="card-image"
              alt={company.name}
            />
          </Col>
          <Col className="col-6" md={5}>
            <div className="card-body d-flex flex-column">
              <div className="h-100">
                <h5 className="card-title">{company.name}</h5>
              </div>
            </div>
          </Col>
        </Row>
      </Link>
    </Col>
  );
}

export default CompanyCard;
