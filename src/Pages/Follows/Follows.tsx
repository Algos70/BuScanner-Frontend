import { useEffect, useState } from "react";
import "./Follows.css";
import { useParams } from "react-router-dom";
import PageLayout from "../LayoutComponent/Layout";
import { Button, Form } from "react-bootstrap";
import CustomModal from "../../Components/Modal/CustomModal";
import {
  FollowModel,
  FollowResponseModel,
  UserInterface,
} from "../../Models/models";
import { createFollow, getFollowsByUser } from "../../Utils/APIUtils";
import { notify } from "../../Utils/Utils";
import FollowCard from "../../Components/FollowCard/FollowCard";

function Follows() {
  const { userEmail } = useParams<{ userEmail: string }>();
  const user: UserInterface = JSON.parse(localStorage.getItem("userInfo")!);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [followForm, setFollowForm] = useState<FollowModel>({
    city1CountryCode: "TR",
    city1NameOrPlateCode: "",
    city2CountryCode: "TR",
    city2NameOrPlateCode: "",
    date: "",
  });
  const [follows, setFollows] = useState<FollowResponseModel[]>([]);

  const handleChange = (
    value: string,
    type: "city1NameOrPlateCode" | "city2NameOrPlateCode" | "date"
  ) => {
    setFollowForm({
      ...followForm,
      [type]: value,
    });
  };

  const handleFollow = () => {
    createFollow(followForm, user.jwToken).then((response) => {
      if (response) {
        setShowModal(false);
      }
      notify("Follow operation is successfully executed", "success");
    });
  };

  const createModalContent = () => {
    return (
      <div className="follow-modal-container">
        <h3>Follow:</h3>
        <div className="follow-modal-inputs">
          <Form.Label>
            From:<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            onChange={(e) => {
              handleChange(e.target.value, "city1NameOrPlateCode");
            }}
            value={followForm.city1NameOrPlateCode}
            type="text"
            placeholder="Enter a province name or plate code"
          />
          <Form.Label>
            To:<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            onChange={(e) => {
              handleChange(e.target.value, "city2NameOrPlateCode");
            }}
            value={followForm.city2NameOrPlateCode}
            type="text"
            placeholder="Enter a province name or plate code"
          />
          <Form.Label>
            Date:<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            onChange={(e) => {
              handleChange(e.target.value, "date");
            }}
            value={followForm.date}
            type="date"
            placeholder="Enter a date"
          />
        </div>
        <Button onClick={handleFollow} className="follows-button">
          Follow
        </Button>
      </div>
    );
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    document.title = `BuScanner | Follows`;
    getFollowsByUser(user.jwToken).then((response) => {
      setFollows(response.data.data);
    });
  }, []); // eslint-disable-line

  return (
    <PageLayout>
      <div className="follows-container">
        <div className="follows-ticket-list">
          <div className="follow-header">
            <div className="follows-info">Followed Dates</div>
            <Button onClick={handleButtonClick} className="follows-button">
              Follow
            </Button>
          </div>
          {follows.map((follow, index) => (
            <FollowCard
              key={index}
              from={follow.city1Name}
              to={follow.city2Name}
              date={follow.date}
            />
          ))}
        </div>
      </div>
      <CustomModal
        children={createModalContent()}
        modalShow={showModal}
        setModalShow={setShowModal}
      />
    </PageLayout>
  );
}

export default Follows;
