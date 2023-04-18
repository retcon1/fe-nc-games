import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

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
      <Card sx={{ maxWidth: 300, margin: '10px',}} className='review_card'>
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{ height: 200 }}
            image={img_url}
            alt={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div" className='font-bold'>
              {title}
            </Typography>
            <Typography 
            gutterBottom variant="h9" component="div">
              Author: {designer}
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