import { Container, Row } from "react-bootstrap";
import Carousel from "../Carousel/Carousel";
import ProvinceCard from "../ProvinceCard/ProvinceCard";
import "./ContentHome.css";
import { ProvinceModel } from "../../Models/models";

import { useEffect, useState } from "react";
import { CompanyModel } from "../../Models/models";
import { getAllBusCompanies } from "../../Utils/APIUtils";
import CompanyCard from "../CompanyCard/CompanyCard";

interface ProvinceListProps {
  provinces: ProvinceModel[];
}

function ContentHome(props: ProvinceListProps) {
  const [companies, setCompanies] = useState<CompanyModel[]>([]);
 

  useEffect(() => {
    getAllBusCompanies().then((response) => {
      setCompanies(response.data);
    });
  }, []);

  
  return (
    <div>
      <Carousel />
      <Container className="cardContainer">
        <div className="popular-provinces-header">
          <div>
            <h2>Popular right now</h2>
            <h6>Other travelers are loving these destinations.</h6>
          </div>
          <a href="/provinces">View More</a>
        </div>

        <Row className="mt-4 justify-content-evenly">
          {props.provinces.map((province, key) => {
            return <ProvinceCard key={key} province={province} />;
          })}
        </Row>
      </Container>

      <Container className="cardContainer">
        <div className="popular-provinces-header">
          <div>
            <h2>Our Companies</h2>
            <h6>Here are some of our companies</h6>
          </div>
          <a href="/companies">View More</a>
        </div>

        <Row className="mt-4 justify-content-evenly">
          {companies.map((company, key) => {
            return <CompanyCard key={key} company={company} />;
          })}
        </Row>
      </Container>
    </div>
  );
}

export default ContentHome;
