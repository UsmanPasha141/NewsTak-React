import "./App.css";
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default function App() {
  const [progress, setProgress] = useState(0);
  const API_KEY = process.env.REACT_APP_NEWS_API;

  const pageSize = 3;
  return (
    <div>
      <Router>
        <NavBar />
        {/* below code is the red line in the UI*/}
        <LoadingBar color="#f11946" progress={progress} />
        <Routes>
          {/* the number of results displed per page */}
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={(progress) => setProgress(progress)}
                API_KEY={API_KEY}
                key="general"
                noResultsPerPage={pageSize}
                country="in"
                category="general"
              />
            }
          />
          {/* <News setProgress = {setProgress(progress)} setProgress = {setProgress(progress)} key="" /> it will take the default values which we passed at the last in the News key="" Components */}
          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={(progress) => setProgress(progress)}
                API_KEY={API_KEY}
                key="business"
                noResultsPerPage={pageSize}
                country="in"
                category="business"
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={(progress) => setProgress(progress)}
                API_KEY={API_KEY}
                key="entertainment"
                noResultsPerPage={pageSize}
                country="in"
                category="entertainment"
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={(progress) => setProgress(progress)}
                API_KEY={API_KEY}
                key="health"
                noResultsPerPage={pageSize}
                country="in"
                category="health"
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={(progress) => setProgress(progress)}
                API_KEY={API_KEY}
                key="science"
                noResultsPerPage={pageSize}
                country="in"
                category="science"
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={(progress) => setProgress(progress)}
                API_KEY={API_KEY}
                key="sports"
                noResultsPerPage={pageSize}
                country="in"
                category="sports"
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={(progress) => setProgress(progress)}
                API_KEY={API_KEY}
                key="technology"
                noResultsPerPage={pageSize}
                country="in"
                category="technology"
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
