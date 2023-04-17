// import { Typography } from "@mui/material";

// const ReviewCard = ({
//   title,
//   owner,
//   designer,
//   img_url,
//   review_body,
//   created_at,
//   category,
//   votes,
//   reviewId,
// }) => {
//   return (
//     <div className="review_card">
//       <h4 className="review_title">{title}</h4>
//       <img src={img_url} alt={title} className="review_img"/>
//     </div>
//   );
// };

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

// const ReviewCard = ({
//     title,
//     owner,
//     designer,
//     img_url,
//     review_body,
//     created_at,
//     category,
//     votes,
//     reviewId,
// }) => {
//     return (
//         <ImageList sx={{ width: 700, height: 450 }} cols={2}>
    

//       <ImageListItem key={reviewId}>
//         <img
//           src={`${img_url}?w=248&fit=crop&auto=format`}
//           srcSet={`${img_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
//           alt={title}
//           loading="lazy"
//           />
//         <ImageListItemBar
//           title={title}
//           subtitle={<span>Author: {designer}</span>}
//           />
//       </ImageListItem>
//     </ImageList>
//   );
// };
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
      <Card sx={{ maxWidth: 400 }} className='review_card'>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={img_url}
            alt={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {created_at}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

export default ReviewCard;