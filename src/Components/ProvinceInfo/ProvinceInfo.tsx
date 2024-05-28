import { ProvinceModel } from "../../Models/models";
import "./ProvinceInfo.css";
interface ProvinceInfoProps {
  province: ProvinceModel;
}

function ProvinceInfo(props: ProvinceInfoProps) {
  return (
    <div className="province-info">
      <div className="province-info-content">
        <img className="province-image" src={props.province.imageLink} alt="Province Image" />
        <div className="province-info-text">
          <h1>{props.province.name}</h1>
          <div>{props.province.description}</div>
        </div>
      </div>
    </div>
  );
}

export default ProvinceInfo;
