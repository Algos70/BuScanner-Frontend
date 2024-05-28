import { useEffect } from "react";
import "./Follows.css";
import { useParams } from "react-router-dom";
import PageLayout from "../LayoutComponent/Layout";

function Follows() {
  const { userEmail } = useParams<{ userEmail: string }>();

  useEffect(() => {
    document.title = `BuScanner | Follows`;
    console.log(userEmail);
  }, []); // eslint-disable-line

  return (
    <PageLayout>
      <div className="follows-container">
        <div className="follows-info">Followed Tickets</div>
        <div className="follows-ticket-list">

        </div>
      </div>
    </PageLayout>
  );
}

export default Follows;
