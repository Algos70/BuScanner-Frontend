import "./Provinces.css";
import ProvincesList from "../../Components/ProvincesList/ProvincesList";
import PageLayout from "../LayoutComponent/Layout";
import { getAllProvinces } from "../../Utils/APIUtils";
import { useEffect, useState } from "react";
import { ProvinceModel } from "../../Models/models";

function Provinces() {
  const [provinces, setProvinces] = useState<ProvinceModel[]>([]);

  useEffect(() => {
    document.title = "BuScanner | Provinces";
    
    getAllProvinces().then((response) => {
      setProvinces(response.data);
    }
    );
  }, []);

  return (
    <PageLayout>
      <ProvincesList provinces={provinces}/>
    </PageLayout>
  );
}

export default Provinces;
