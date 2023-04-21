import { FormControl, InputLabel, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchCategories } from "../utils/api";

const CategoryBox = ({setCategory}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then((data) => {
      console.log(data);
      setCategories(data);
    });
  }, []);

  return (
    <div className="flex justify-center">
      <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 250 }}>
        <InputLabel htmlFor="grouped-native-select">Categories</InputLabel>
        <Select
          native
          defaultValue=""
          id="grouped-native-select"
          label="Grouping"
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        >
          <option aria-label="None" value="" />
            {categories.map((cat) => (
              <option value={cat.slug}>{cat.slug}</option>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CategoryBox;
