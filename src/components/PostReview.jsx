import {
  Button,
  FormControl,
  TextField,
  Typography,
  Select,
  MenuItem,
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
    <div className="bg-light dark:bg-dark text-center max-h-screen-2xl">
      <Typography className="dark:text-white font-bold text-lg mt-10 mb-5">
        Write Your Own Review!
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <Typography className="dark:text-white font-bold">Title</Typography>
        <TextField
          required
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="bg-light dark:bg-light-accent rounded-lg w-1/2 m-5 min-w-fit"
        />
        <Typography className="dark:text-white font-bold">Review</Typography>
        <TextField
          required
          multiline
          rows={10}
          name="review_body"
          value={formData.review_body}
          onChange={handleChange}
          className="bg-light dark:bg-light-accent rounded-lg w-4/5 m-5"
        />
        <Typography className="dark:text-white font-bold">
          Review Image URL
        </Typography>
        <TextField
          required
          name="review_img_url"
          multiline
          maxRows={2}
          value={formData.review_img_url}
          onChange={handleChange}
          className="bg-light dark:bg-light-accent rounded-lg m-5 min-w-fit w-1/3 "
        />
        <Typography className="dark:text-white font-bold">
          What category is this game in?
        </Typography>
        <FormControl
          fullWidth
          required
          className="bg-light dark:bg-light-accent rounded-lg m-5 min-w-fit max-w-xs"
        >
          <Select
            value={formData.category}
            name="category"
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <MenuItem key={categories.indexOf(cat)} value={cat.slug}>
                {cat.slug}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {currentUser.name === "Guest" ? (
          <Typography className="dark:text-red-400 font-bold">
            Please sign in as a user before posting a review!
          </Typography>
        ) : (
          <>
            <Typography className="dark:text-white">
              Author: {currentUser.name}
            </Typography>
            <Button
              type="submit"
              variant="contained"
              className="bg-dark-accent disabled:text-gray-300 m-2 h-12 my-3"
            >
              Post Your Review!
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default PostReview;
