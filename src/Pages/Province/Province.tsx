import { useEffect, useState } from "react";
import "./Province.css";
import { useParams } from "react-router-dom";
import ProvinceInfo from "../../Components/ProvinceInfo/ProvinceInfo";
import PageLayout from "../LayoutComponent/Layout";
import { getProvinceByName } from "../../Utils/APIUtils";
import { ProvinceModel } from "../../Models/models";

function Province() {
  const { provinceName } = useParams<{ provinceName: string }>();
  const [province, setProvince] = useState<ProvinceModel>({
    id: -1,
    name: "",
    normalizedName: "",
    description: "",
    imageLink: "",
    countryCode: "",
    numberPlateCode: "",
  });

  useEffect(() => {
    document.title = `BuScanner | ${provinceName}`;
    getProvinceByName(provinceName!).then((response) => {
      setProvince(response.data);
    });
  }, [provinceName]);

  return (
    <PageLayout>
      <ProvinceInfo province={province} />
    </PageLayout>
  );
}

export default Province;
