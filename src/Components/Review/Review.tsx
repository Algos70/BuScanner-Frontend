import { ReviewtModel } from "../../Models/models";
import { formatTimestamp } from "../../Utils/Utils";
import BasicRating from "../RatingStar/RatingStar";
import "./Review.css";

interface ReviewProps {
  review: ReviewtModel;
}

function Review(props: ReviewProps) {
  return (
    <div className="review-container">
      <div className="user-name">{props.review.userName}</div>
      <div className="rating">
        <BasicRating rating={props.review.rate} />
      </div>
      <div className="review-date">{formatTimestamp(props.review.time)}</div>
      <div className="review-text">{props.review.commentText}</div>
    </div>
  );
}

export default Review;
