import { useEffect, useState } from "react";
import { fetchReviews } from "../api";
import ReviewCard from "./ReviewCard";
import { Button, Typography } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";

const ReviewsList = ({ reviews, setReviews }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    fetchReviews().then((data) => {
      setReviews(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Typography>Getting Those Reviews You Wanted...</Typography>;
  }

  return (
    <>
      <div className="flex flex-wrap justify-center">
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
    </>
  );
};

export default ReviewsList;
