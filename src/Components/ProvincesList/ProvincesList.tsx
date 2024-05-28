import { Row } from "react-bootstrap";
import ProvinceCard from "../ProvinceCard/ProvinceCard";
import "./ProvincesList.css";
import { ProvinceModel } from "../../Models/models";

interface ProvinceListProps {
  provinces: ProvinceModel[];
}

function ProvincesList(props: ProvinceListProps) {
  return (
    <div className="provinces-list">
      <div className="provinces-card-container">
        <Row className="mt-4 justify-content-evenly">
          {props.provinces.map((province, key) => {
            return <ProvinceCard key={key} province={province} />;
          })}
        </Row>
      </div>
    </div>
  );
}

export default ProvincesList;
