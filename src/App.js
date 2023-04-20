import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ReviewsList from "./components/ReviewsList";
import AllReviews from "./components/AllReviews";
import SingleReview from "./components/SingleReview";
import Home from "./components/Home";
import { fetchReviews } from "./utils/api";

function App() {
  const [reviews, setReviews] = useState();
  const [totalReviews, setTotalReviews] = useState(null);

  fetchReviews().then((reviews) => {
    setTotalReviews(reviews[0].total_count);
  });
  return (
    <div id="root">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home reviews={reviews} setReviews={setReviews} />}
        />
        <Route
          path="/reviews"
          element={
            <AllReviews
              totalReviews={totalReviews}
              reviews={reviews}
              setReviews={setReviews}
            />
          }
        />
        <Route path="/reviews/:id" element={<SingleReview />} />
      </Routes>
    </div>
  );
}

export default App;
