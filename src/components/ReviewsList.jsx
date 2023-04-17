import { useEffect, useState } from "react";
import { fetchReviews } from "../api";
import ReviewCard from "./ReviewCard";
import { Button, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

const ReviewsList = ({ reviews, setReviews }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handlePageClick = (event, direction) => {
    event.preventDefault();
    if (direction === "previous") {
      setPage((currentPage) => {
        const newPage = currentPage - 1;
        navigate(`/reviews?p=${newPage}`);
        return newPage;
      });
    } else if (direction === "next") {
      setPage((currentPage) => {
        const newPage = currentPage + 1;
        navigate(`/reviews?p=${newPage}`);
        return newPage;
      });
    }
  };

  useEffect(() => {
    fetchReviews(page).then((data) => {
      console.log(data);
      setReviews(data);
      setIsLoading(false);
    });
  }, [page]);

  if (isLoading) {
    return <Typography>Getting Those Reviews You Wanted...</Typography>;
  }

  return (
    <div className="reviews_list">
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
      <Button
        className="previous"
        variant="text"
        onClick={(event) => {
          handlePageClick(event, "previous");
        }}
        disabled={page === 1}
      >
        Previous Page
      </Button>
      <Button
        className="next"
        variant="text"
        onClick={(event) => {
          handlePageClick(event, "next");
        }}
        // disabled={PAGE_LENGTH * page >= totalCount}
      >
        Next Page
      </Button>
    </div>
  );
};

export default ReviewsList;
