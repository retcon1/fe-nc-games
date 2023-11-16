import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import AllReviews from "./components/AllReviews";
import SingleReview from "./components/SingleReview";
import Home from "./components/Home";
import { fetchReviews } from "./utils/api";
import Users from "./components/Users";
import UserContext from "./components/UserContext";
import PostReview from "./components/PostReview";

function App() {
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    username: "guest",
    name: "Guest",
    avatar_url:
      "https://img.favpng.com/12/14/4/avatar-user-medicine-surgery-patient-png-favpng-5GPmZyxNjmTZRJtRW4aT9xw0h_t.jpg",
  });

  useEffect(() => {
    fetchReviews().then((reviews) => {
      setTotalReviews(reviews[0].total_count);
    });
  }, []);

  return (
    <div id="root" className="bg-light dark:bg-dark min-h-screen">
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
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
          <Route path="/post-review" element={<PostReview />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
