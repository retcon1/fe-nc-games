import { Button, Typography } from "@mui/material";
import ReviewsList from "./ReviewsList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchReviews } from "../utils/api";

const AllReviews = ({ reviews, setReviews, totalReviews }) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchReviews(page).then((data) => {
      setReviews(data);
      setIsLoading(false);
    });
  }, [page]);

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
  return (
    <div>
      <Typography variant="h4" className="flex justify-center">
        All Reviews
      </Typography>
      <ReviewsList reviews={reviews} setReviews={setReviews} />
      <div>
        <Button
          className="flex-bottom"
          variant="text"
          onClick={(event) => {
            handlePageClick(event, "previous");
          }}
          disabled={page === 1}
        >
          Previous Page
        </Button>
        <Button
          className="flex-bottom"
          variant="text"
          onClick={(event) => {
            handlePageClick(event, "next");
          }}
          disabled={10 * page >= totalReviews}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default AllReviews;
