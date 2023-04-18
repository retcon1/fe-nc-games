import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ReviewsList from "./components/ReviewsList";
import AllReviews from "./components/AllReviews";
import Home from "./components/Home";
import { fetchReviews } from "./api";

function App() {
  const [reviews, setReviews] = useState();
  const [totalReviews, setTotalReviews] = useState(null)
  fetchReviews().then((data) => {
    setTotalReviews(data[0].total_count);
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
          element={<AllReviews totalReviews={totalReviews} reviews={reviews} setReviews={setReviews} />}
        />
      </Routes>
    </div>
  );
}

export default App;
