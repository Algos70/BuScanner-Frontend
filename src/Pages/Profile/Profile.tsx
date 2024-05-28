import { useEffect } from "react";
import "./Profile.css";
import PageLayout from "../LayoutComponent/Layout";
import { getLocalUserInfo, notify } from "../../Utils/Utils";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { userEmail } = useParams<{ userEmail: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `BuScanner | User Profile`;
    const user = JSON.parse(getLocalUserInfo() || "{}");
    if (!user.email) {
      notify("You must be logged in to view this page", "error");
      navigate("../login");
    }
  }, []); // eslint-disable-line

  return (
    <PageLayout>
      <div className="profile-container">
        <div className="profile-info">Profile Info of {userEmail}</div>
      </div>
    </PageLayout>
  );
}

export default Profile;
