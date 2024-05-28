import Card from "react-bootstrap/Card";
import "./Ticket.css";
import { getLocalUserInfo, notify, timeDifference, toCamelCase } from "../../Utils/Utils";
import { FormInterface } from "../../Models/models";
import { Dropdown, DropdownButton } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { BusCompanyIds } from "../../Utils/Enums";

interface TicketProps {
  start: string;
  end: string;
  img?: string;
  price: number;
  imageLink: string;
  purchaseLink: string;
  formData: FormInterface;
  busBrandName: string;
  className?: string;
}

function Ticket(props: TicketProps) {
  const companyId = toCamelCase(props.busBrandName) as keyof typeof BusCompanyIds;
  const userInfo = JSON.parse(getLocalUserInfo()!);

  const redirectToSite = () => {
    window.open(props.purchaseLink, "_blank");
  };

  const navigate = useNavigate();

  const handleFavorite = () => {
    try {
      //sent a create follow ticket
      notify(
        "Ticket succesfully followed, you can see the details at the follow page.",
        "success"
      );
    } catch (error) {
      console.log(error);
      notify("An error occured, please try again later!", "error");
    }
  };

  const handleImage = () => {
    navigate("/company/" + BusCompanyIds[companyId])

  }

  return (
    <Card className={`ticket-container ${props.className}`} >
      <Card.Body className="card-container">
        <div className="left">
          <div className="left-content">
            <img onClick={handleImage} className="company-logo" src={props.imageLink} />
            <div className="time">
              <div className="start-time">{props.start} </div>
              <div className="total-time">
                <div>{timeDifference(props.start, props.end)}</div>
                <hr style={{ fontWeight: "bolder" }} />
                <div>
                  {props.formData.from}-{props.formData.to}
                </div>
                <div>
                  {props.formData.date}
                </div>
              </div>
              <div className="end-time"> {props.end} </div>
            </div>
          </div>
        </div>
        <div className="vr"></div>
        <div className="right">
          <div className="right-content">
            <div className="price">{props.price} TL</div>
            <button onClick={redirectToSite} className="select-button">
              Select
            </button>
          </div>
        </div>
        {userInfo &&
        <div className="dropdown-container">
          <DropdownButton
            className="fav-options-dropdown"
            id="options-dropdown"
            title="..."
          >
            <Dropdown.Item onClick={handleFavorite}>Follow</Dropdown.Item>
          </DropdownButton>
        </div>}
      </Card.Body>
    </Card>
  );
}

export default Ticket;
