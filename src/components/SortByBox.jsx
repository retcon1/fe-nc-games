import { FormControl, InputLabel, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchCategories } from "../utils/api";

const SortByBox = ({ setSortBy }) => {
  return (
    <div className="flex justify-center">
      <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 250 }} className=" text-body-color-light border-light-accent">
        <InputLabel htmlFor="grouped-native-select">Sort By</InputLabel>
        <Select
          native
          defaultValue=""
          id="grouped-native-select"
          label="Grouping"
          onChange={(event) => {
            setSortBy(event.target.value);
          }}
        >
          <option aria-label="None" value="" />
          <option value="created_at">Date</option>
          <option value="comment_count">Comments</option>
          <option value="votes">Votes</option>
        </Select>
      </FormControl>
    </div>
  );
};

export default SortByBox;
