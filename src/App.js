import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ReviewsList from "./components/ReviewsList";

function App() {
  const [reviews, setReviews] = useState();
  return (
    <div>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route
          path="/reviews"
          element={<ReviewsList reviews={reviews} setReviews={setReviews} />}
        />
        <Route
          path="/reviews/p/:pageNum"
          element={<ReviewsList reviews={reviews} setReviews={setReviews} />}
        />
      </Routes>
    </div>
  );
}

export default App;
