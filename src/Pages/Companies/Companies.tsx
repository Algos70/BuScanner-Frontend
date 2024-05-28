import { useEffect, useState } from "react";
import CompaniesList from "../../Components/CompaniesList/CompaniesList";
import PageLayout from "../LayoutComponent/Layout";
import "./Companies.css";
import { CompanyModel } from "../../Models/models";
import { getAllBusCompanies } from "../../Utils/APIUtils";

function Companies() {
  const [companies, setCompanies] = useState<CompanyModel[]>([]);

  useEffect(() => {
    document.title = "BuScanner | Companies";
    getAllBusCompanies().then((response) => {
      setCompanies(response.data);
    }
    );
    // setCompanies(response.data);
  }, []);

  return (
    <PageLayout>
      <CompaniesList companies={companies} />
    </PageLayout>
  );
}

export default Companies;
