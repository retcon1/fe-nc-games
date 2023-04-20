import { Button, Typography } from "@mui/material";
import ReviewsList from "./ReviewsList";
import { useNavigate } from "react-router-dom";

const Home = ({ reviews, setReviews }) => {
  const navigate = useNavigate();
  const handleClick = (event) => {
    event.preventDefault();
    navigate("/reviews");
  };
  return (
    <div className="flex flex-col items-center">
      <Button
        variant="contained"
        className="m-5 w-auto color bg-primary hover:bg-light-accent"
        onClick={handleClick}
      >
        See All Reviews
      </Button>
      <Typography variant="h5" className="flex justify-center">
        Most Recent Reviews
      </Typography>
      <ReviewsList reviews={reviews} setReviews={setReviews} />
    </div>
  );
};

export default Home;
