import { useEffect, useState } from "react";
import { fetchReviewById } from "../api";
import { useParams } from "react-router-dom";
import { Button, Paper, Typography } from "@mui/material";

const SingleReview = () => {
  const [singleReview, setSingleReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState("");
  const { id } = useParams();
  const formattedDate = date.toLocaleString();

  useEffect(() => {
    setIsLoading(true);
    fetchReviewById(id).then((data) => {
      setSingleReview(data);
      setDate(new Date(data.created_at));
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Typography>Getting That Review...</Typography>;
  }
  return (
    <Paper className="flex flex-wrap justify-left">
      <Typography className="mt-5" variant="h4">
        {singleReview.title}
      </Typography>
      <Typography className="text-gray-500" variant="p">
        {singleReview.designer}
      </Typography>
      <Typography className="text-gray-500 ml-5" variant="h9">
        {formattedDate}
      </Typography>
      <img
        src={singleReview.review_img_url}
        alt={`Review Image for ${singleReview.title}`}
      />
      <Typography className="my-5" variant="p">
        {singleReview.review_body}
      </Typography>
      <Typography className="mt-3 text-green-700" variant="p">
        {singleReview.votes} Votes
      </Typography>
      <Typography className="mt-3 ml-5 text-red-700" variant="p">
        {singleReview.comment_count} Comments
      </Typography>
      <Button variant="p">View Comments</Button>
    </Paper>
  );
};

export default SingleReview;
