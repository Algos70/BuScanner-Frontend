import { useEffect, useState } from "react";
import { CompanyModel, ReviewtModel, UserInterface } from "../../Models/models";
import Review from "../Review/Review";
import "./ContentCompany.css";
import {
  createReview,
  getBusCompanyReviews,
  getBusRating,
} from "../../Utils/APIUtils";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { getLocalUserInfo, notify } from "../../Utils/Utils";
import CustomModal from "../Modal/CustomModal";
import { Rating } from "@mui/material";

interface ContentCompanyProps {
  company: CompanyModel;
}

function ContentCompany(props: ContentCompanyProps) {
  const [reviews, setReviews] = useState<ReviewtModel[]>([]);
  const [value, setValue] = useState<number | null>(1);

  const [reviewModalShow, setReviewModalShow] = useState<boolean>(false);
  const [canReview, setCanReview] = useState<boolean>(false);
  const userInfo: UserInterface = JSON.parse(getLocalUserInfo()!)
    ? JSON.parse(getLocalUserInfo()!)
    : { userName: "", jwToken: "" };
  const [reviewText, setReviewText] = useState<string>("");
  const [companyRating, setCompanyRating] = useState<number>(0);

  const handleSubmitReview = () => {
    createReview(
      {
        busId: Number(props.company.id),
        rate: Number(value!),
        commentText: reviewText,
      },
      userInfo.jwToken
    ).then(() => {
      getBusCompanyReviews(props.company.id)
        .then((response) => {
          notify("Review submitted successfully", "success");
          setReviewModalShow(false);
          setReviews(response.data);
          setCanReview(
            response.data.some(
              (review: ReviewtModel) =>
                review.userName !== userInfo.userName &&
                review.busId === props.company.id
            )
          );
          getBusRating(props.company.id).then((response) => {
            setCompanyRating(response.data);
          });
        })
        .catch(() => {
          notify("Error submitting review", "error");
        });
    });
    console.log("submit review");
  };

  const modelChildren = () => {
    return (
      <div className="review-modal-container">
        <h4>Review</h4>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(_event, newValue) => {
            setValue(newValue);
          }}
        />

        <FloatingLabel controlId="reviewArea" label="">
          <Form.Control
            className="review-textarea"
            as="textarea"
            placeholder="Write your review here"
            size="lg"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </FloatingLabel>
        <Button onClick={handleSubmitReview} variant="primary">
          Submit
        </Button>
      </div>
    );
  };

  useEffect(() => {
    getBusCompanyReviews(props.company.id).then((response) => {
      setReviews(response.data);
      console.log(
        "canReview",
        response.data.some(
          (review: ReviewtModel) => review.userName !== userInfo.userName
        )
      );
      userInfo.id &&
        setCanReview(
          !response.data.some(
            (review: ReviewtModel) => review.userName === userInfo.userName
          )
        );
      getBusRating(props.company.id).then((response) => {
        setCompanyRating(response.data);
      });
    });
    console.log(props.company);
  }, [props.company.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleButtonClick = () => {
    setReviewModalShow(true);
  };

  return (
    <div className="content-company-container">
      <div className="content-company-review">
        <div className="review-header">
          <h3>User Reviews</h3>

          <Button
            disabled={!canReview}
            onClick={handleButtonClick}
            variant="primary"
          >
            Write a review
          </Button>
        </div>
        <div className="review-list">
          {userInfo &&
            reviews.map((review, key) => <Review key={key} review={review} />)}
        </div>
      </div>
      <div className="content-company-info">
        <img
          src={props.company.imageLink}
          alt={props.company.name}
          className="company-image"
        />
        <div className="company-header">
          <h2>{props.company.name}</h2>
          <Rating name="read-only" value={companyRating} readOnly />
        </div>
        <div>{props.company.description}</div>
      </div>
      <CustomModal
        modalShow={reviewModalShow}
        setModalShow={setReviewModalShow}
        children={modelChildren()}
      />
    </div>
  );
}

export default ContentCompany;
