import { Typography } from "@mui/material";
import ReviewsList from "./ReviewsList";
import { useState } from "react";

const Home = ({ reviews, setReviews }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-col items-center dark:bg-dark">
      <Typography
        variant="h5"
        className="flex justify-center my-2 dark:text-white"
      >
        Most Recent Reviews
      </Typography>
      <ReviewsList
        reviews={reviews}
        setReviews={setReviews}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default Home;
