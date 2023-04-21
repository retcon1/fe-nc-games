import { Button, Typography } from "@mui/material";
import ReviewsList from "./ReviewsList";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchReviews } from "../utils/api";
import CategoryBox from "./CategoryBox";

const AllReviews = ({ reviews, setReviews, totalReviews, setTotalReviews }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageQuery = searchParams.get("p") || "1";
  const setPage = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("p", page);
    setSearchParams(newParams);
    console.log(pageQuery);
  };

  const catQuery = searchParams.get("category");
  const setCategory = (category) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("category", category);
    newParams.set("p", "1");
    setSearchParams(newParams);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchReviews(pageQuery, catQuery).then((data) => {
      setReviews(data);
      setIsLoading(false);
    });
  }, [pageQuery, catQuery]);

  const handlePageClick = (event, direction) => {
    event.preventDefault();
    if (direction === "previous") {
      setPage(+pageQuery - 1);
    } else if (direction === "next") {
      setPage(+pageQuery + 1);
    }
  };
  return (
    <div className="bg-light">
      <Typography variant="h4" className="flex justify-center">
        All Reviews
      </Typography>
      <CategoryBox setCategory={setCategory} />
      <ReviewsList reviews={reviews} setReviews={setReviews} />
      <div>
        <Button
          className="flex-bottom"
          variant="text"
          onClick={(event) => {
            handlePageClick(event, "previous");
          }}
          disabled={+pageQuery === 1}
        >
          Previous Page
        </Button>
        <Button
          className="flex-bottom"
          variant="text"
          onClick={(event) => {
            handlePageClick(event, "next");
          }}
          disabled={10 * +pageQuery >= totalReviews || isLoading}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default AllReviews;
