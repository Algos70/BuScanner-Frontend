import { useEffect, useState } from "react";
import "./Company.css";
import { useParams } from "react-router-dom";
import PageLayout from "../LayoutComponent/Layout";
import { CompanyModel } from "../../Models/models";
import { getBusCompanyById } from "../../Utils/APIUtils";
import ContentCompany from "../../Components/ContentCompanyPage/ContentCompany";
import { getEnumKeyByValue } from "../../Utils/Utils";
import { BusCompanyIds } from "../../Utils/Enums";

function Company() {
  const { companyId } = useParams<{ companyId: string }>();
  const [company, setCompany] = useState<CompanyModel>({
    name: "",
    normalizedName: "",
    description: "",
    imageLink: "",
    webSiteUrl: "",
    userComments: [],
    id: 0,
   
  });

  useEffect(() => {
    document.title = `BuScanner | ${getEnumKeyByValue(BusCompanyIds ,String(companyId))}`;
    getBusCompanyById(Number(companyId)!).then((response) => {
      setCompany(response.data);
    }
    );
  }, [companyId]);

  return (
    <PageLayout>
      <ContentCompany company={company} />
    </PageLayout>
  );
}

export default Company;
