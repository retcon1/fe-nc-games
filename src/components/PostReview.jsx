import {
  Box as form,
  Button,
  FormControl,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import { fetchCategories, postReview } from "../utils/api";

const testReview = {
  title: "Culture a Love of Agriculture With Agricola",
  designer: "Uwe Rosenberg",
  owner: "tickle122",
  review_img_url:
    "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700",
  review_body:
    "You could sum up Agricola with the simple phrase 'Farmyard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
  category: "strategy",
};

const PostReview = () => {
  const { currentUser } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    review_img_url: "",
    review_body: "",
    designer: currentUser.name,
    owner: currentUser.username,
  });

  useEffect(() => {
    fetchCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postReview(formData)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Typography className="dark:text-white font-bold">
        Write Your Own Review!
      </Typography>
      <form onSubmit={handleSubmit}>
        <Typography className="dark:text-white">Title</Typography>
        <TextField
          required
          name="title"
          multiline
          maxRows={2}
          value={formData.title}
          onChange={handleChange}
          className="bg-light dark:bg-light-accent rounded-lg"
        />
        <Typography className="dark:text-white">Review</Typography>
        <TextField
          required
          multiline
          rows={10}
          name="review_body"
          value={formData.review_body}
          onChange={handleChange}
          className="bg-light dark:bg-light-accent rounded-lg"
        />
        <Typography className="dark:text-white">Review Image URL</Typography>
        <TextField
          required
          name="review_img_url"
          multiline
          maxRows={2}
          value={formData.review_img_url}
          onChange={handleChange}
          className="bg-light dark:bg-light-accent rounded-lg"
        />
        <Typography className="dark:text-white">
          What category is this game in?
        </Typography>
        <FormControl fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            name="category"
            onChange={handleChange}
            className="bg-light dark:bg-light-accent rounded-lg"
          >
            <MenuItem aria-label="None" value="" />
            {categories.map((cat) => (
              <MenuItem key={categories.indexOf(cat)} value={cat.slug}>
                {cat.slug}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography className="dark:text-white">
          Author: {currentUser.name}
        </Typography>
        <Button type="submit">Post Your Review!</Button>
      </form>
    </>
  );
};

export default PostReview;
