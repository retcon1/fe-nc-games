import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import AllReviews from "./components/AllReviews";
import SingleReview from "./components/SingleReview";
import Home from "./components/Home";
import { fetchReviews } from "./utils/api";
import Users from "./components/Users";

function App() {
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(null);

  useEffect(() => {
    fetchReviews().then((reviews) => {
      console.log(reviews);
      setTotalReviews(reviews[0].total_count);
    });
  }, []);

  return (
    <div id="root" className="bg-light">
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
        <Route path="/users" element={<Users />} />
        <Route path="/reviews/:id" element={<SingleReview />} />
      </Routes>
    </div>
  );
}

export default App;
