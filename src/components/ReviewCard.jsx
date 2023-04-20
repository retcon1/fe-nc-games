import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

const ReviewCard = ({
  title,
  owner,
  designer,
  img_url,
  review_body,
  created_at,
  category,
  votes,
  reviewId,
}) => {
  return (
    <Link to={`/reviews/${reviewId}`}>
      <Card
        sx={{ maxWidth: 300, margin: "10px" }}
        className="review_card bg-light"
        elevation={4}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{ height: 200 }}
            image={img_url}
            alt={title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className="font-bold text-body-color-light"
            >
              {title}
            </Typography>
            <Typography gutterBottom variant="h9" component="div">
              By {designer}
            </Typography>
            <Typography variant="body2" className="text-dark-accent">
              {new Date(created_at).toLocaleString()}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ReviewCard;
