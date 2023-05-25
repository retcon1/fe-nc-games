import { Typography } from "@mui/material";
import ReviewsList from "./ReviewsList";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = ({ reviews, setReviews }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-col items-center">
      <Typography variant="h5" className="flex justify-center my-2">
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
