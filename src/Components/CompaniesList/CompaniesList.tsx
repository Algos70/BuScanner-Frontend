import { Row } from "react-bootstrap";
import "./CompaniesList.css";
import CompanyCard from "../CompanyCard/CompanyCard";
import { CompanyModel } from "../../Models/models";

interface CompaniesListProps {
  companies: CompanyModel[];
}

function CompaniesList(props: CompaniesListProps) {
  return (
    <div className="companies-list">
      <div className="companies-card-container">
        <Row className="mt-4 justify-content-evenly">
          {props.companies.map((company) => {
            return <CompanyCard company={company} />;
          })}
        </Row>
      </div>
    </div>
  );
}

export default CompaniesList;
