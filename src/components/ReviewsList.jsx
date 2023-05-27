import { useEffect } from "react";
import { fetchReviews } from "../utils/api";
import ReviewCard from "./ReviewCard";
import { Typography } from "@mui/material";
import Loading from "./Loading";

const ReviewsList = ({ reviews, setReviews, isLoading, setIsLoading }) => {
  useEffect(() => {
    setIsLoading(true);
    fetchReviews().then((data) => {
      setReviews(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Typography className="font-bold flex justify-center dark:text-white">
          Getting Those Reviews...
          <br /> (this may take some time...)
        </Typography>
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center bg-light dark:bg-dark">
      {reviews.map((review) => (
        <ReviewCard
          key={review.review_id}
          title={review.title}
          owner={review.owner}
          designer={review.designer}
          img_url={review.review_img_url}
          review_body={review.review_body}
          created_at={review.created_at}
          category={review.category}
          votes={review.votes}
          reviewId={review.review_id}
        />
      ))}
    </div>
  );
};

export default ReviewsList;

// const test = {
//   comment_id: 29,
//   body: "Ex id ipsum dolore non cillum anim sint duis nisi anim deserunt nisi minim.",
//   review_id: 15,
//   author: "jessjelly",
//   votes: 9,
//   created_at: "2021-03-27T14:15:31.110Z",
// };
