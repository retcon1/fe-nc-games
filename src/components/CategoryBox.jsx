import { FormControl, InputLabel, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchCategories } from "../utils/api";

const CategoryBox = ({ setCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <div className="flex justify-center">
      <FormControl
        sx={{ m: 1, minWidth: 120, maxWidth: 250 }}
        className=" text-body-color-light border-light-accent dark:text-white"
      >
        <InputLabel htmlFor="grouped-native-select" className="dark:text-white">
          Categories
        </InputLabel>
        <Select
          native
          defaultValue=""
          id="grouped-native-select"
          label="Grouping"
          className="dark: text-white"
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        >
          <option aria-label="None" value="" />
          {categories.map((cat) => (
            <option key={categories.indexOf(cat)} value={cat.slug}>
              {cat.slug}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CategoryBox;
