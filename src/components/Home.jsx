import { Button, Typography } from "@mui/material";
import ReviewsList from "./ReviewsList";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../App";

const Home = ({ reviews, setReviews }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
