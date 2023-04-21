import { Button, Typography } from "@mui/material";
import ReviewsList from "./ReviewsList";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchReviews } from "../utils/api";
import CategoryBox from "./CategoryBox";
import SortByBox from "./SortByBox";

const AllReviews = ({ reviews, setReviews, totalReviews }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalInCat, setTotalInCat] = useState(totalReviews);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageQuery = searchParams.get("p") || "1";
  const setPage = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("p", page);
    setSearchParams(newParams);
  };

  const catQuery = searchParams.get("category");
  const setCategory = (category) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("category", category);
    newParams.set("p", "1");
    setSearchParams(newParams);
  };

  const sortQuery = searchParams.get("sort_by");
  const setSortBy = (sortBy) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", sortBy);
    setSearchParams(newParams);
  };

  const orderQuery = searchParams.get("order");
  const setOrder = (order) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", order);
    setSearchParams(newParams);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchReviews(pageQuery, catQuery, sortQuery, orderQuery).then((data) => {
      setReviews(data);
      setTotalInCat(data[0].total_count ? data[0].total_count : data.length);
      setIsLoading(false);
    });
  }, [pageQuery, catQuery, sortQuery, orderQuery]);

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
      <div className="flex justify-between items-center">
        <CategoryBox setCategory={setCategory} />
        <SortByBox setSortBy={setSortBy} />
        <Button
          variant="outlined"
          className="text-body-color-light border-light-accent mx-1"
          onClick={() => {
            orderQuery === "asc" ? setOrder("desc") : setOrder("asc");
          }}
        >
          ASC/DESC
        </Button>
      </div>
      <ReviewsList reviews={reviews} setReviews={setReviews} />
      <div>
        <Button
          className="flex-bottom"
          variant="text"
          onClick={(event) => {
            handlePageClick(event, "previous");
          }}
          disabled={+pageQuery === 1 || isLoading}
        >
          Previous Page
        </Button>
        <Button
          className="flex-bottom"
          variant="text"
          onClick={(event) => {
            handlePageClick(event, "next");
          }}
          disabled={10 * +pageQuery >= totalInCat || isLoading}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default AllReviews;
