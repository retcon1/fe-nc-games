import { FormControl, InputLabel, Select } from "@mui/material";

const SortByBox = ({ setSortBy }) => {
  return (
    <div className="flex justify-center">
      <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 250 }}>
        <InputLabel htmlFor="grouped-native-select" className="dark:text-white">
          Sort By
        </InputLabel>
        <Select
          native
          className="dark:text-white"
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
