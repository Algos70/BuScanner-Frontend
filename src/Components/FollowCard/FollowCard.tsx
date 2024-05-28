import { Card } from "react-bootstrap";
import "./FollowCard.css";

interface FollowCardProps {
  from: string;
  to: string;
  date: string;
}

function FollowCard(props: FollowCardProps) {
  return (
    <div className="follow-card-container">
      <Card className={`ticket-container}`}>
        <Card.Body className="card-container follow-card-info">
          <div className="follow-from">{props.from}</div>
          <div className="follow-from">-</div>
          <div className="follow-to">{props.to}</div>
          <div className="follow-from">:</div>
          <div className="follow-date">{props.date}</div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default FollowCard;
