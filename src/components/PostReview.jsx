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
import { validateImageURL } from "../utils/validateImageURL";

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
  const [tooShort, setTooShort] = useState(false);
  const [invalidImage, setInvalidImage] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    setInvalidImage(false);
    setTooShort(false);
    if (formData.review_body.length < 280) {
      setTooShort(true);
    }
    validateImageURL(formData.review_img_url)
      .then(() => {
        postReview(formData)
          .then((data) => {
            console.log(data);
            setSubmitted(true);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        setInvalidImage(true);
      });
  };

  if (submitted) {
    return (
      <div className="bg-light dark:bg-dark text-center max-h-screen-2xl">
        <Typography className="dark:text-white font-bold text-xl mt-20 mb-5">
          Thanks for your review, it's live now!
        </Typography>
      </div>
    );
  }

  return (
    <div className="bg-light dark:bg-dark text-center max-h-screen-2xl">
      <Typography className="dark:text-white font-bold text-lg mt-10 mb-5">
        Write Your Own Review!
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <Typography className="dark:text-white font-bold underline">
          Title
        </Typography>
        <TextField
          required
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="bg-light dark:bg-light-accent rounded-lg w-1/2 m-5 min-w-fit"
        />
        <Typography className="dark:text-white font-bold underline">
          Review
        </Typography>
        <TextField
          required
          multiline
          rows={10}
          name="review_body"
          value={formData.review_body}
          onChange={handleChange}
          className="bg-light dark:bg-light-accent rounded-lg w-4/5 m-5"
        />
        {tooShort ? (
          <Typography className="text-red-700 dark:text-red-400 font-bold mb-3">
            Please make your review over 280 characters in length, it's not a
            tweet!
          </Typography>
        ) : null}
        <Typography className="dark:text-white font-bold underline">
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
        {invalidImage ? (
          <Typography className="text-red-700 dark:text-red-400 font-bold mb-3">
            Please Enter a Valid URL
          </Typography>
        ) : null}
        <Typography className="dark:text-white font-bold underline">
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
            <Typography className="dark:text-white font-bold">
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
