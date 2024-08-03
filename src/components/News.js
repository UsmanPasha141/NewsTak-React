import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News({
  noResultsPerPage = 3,
  country = "in",
  category = "general",
  setProgress,
  API_KEY,
}) {
  // console.log(noResultsPerPage, country);
  const [articles, setArticles] = useState([]);
  let [page, setPage] = useState(1);
  const [totRes, settotRes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [flagProcess, setFlagProcess] = useState(true);

  // Fetching the DATA
  // const noResultsPerPage = 15; // sent as the props
  const fetchData = async function (page) {
    try {
      // setting this will give the red line
      if (flagProcess) {
        setProgress(0);
      }
      // before fetching data it should be true bcz spinner should be displayed
      // setLoading(true);

      // const url = `https://newsapi.org/v2/everything?q=apple&from=2024-07-23&to=2024-07-26&sortBy=popularity&apiKey=${API_KEY}&page=${page}&pageSize=${noResultsPerPage}`;

      if (flagProcess) {
        setProgress(10);
      }

      //In below link we can cange the category and country also
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}&page=${page}&pageSize=${noResultsPerPage}`;

      // below "everyThing" url donot work with bussiness generalhealth entertainment (category based) donot work we should go with "top-headlines" if we need the categories that is above url
      // const url = `https://newsapi.org/v2/everything?q=india&apiKey=${API_KEY}&page=${page}&pageSize=${noResultsPerPage}`;
      // console.log(page);

      const response = await fetch(url); // returns promise

      // Check for 429 status and handle it
      if (response.status === 429) {
        throw new Error("Too many requests. Please try again later.");
      }

      const data = await response.json();
      // console.log(data);
      // console.log(data.totalResults);
      if (flagProcess) {
        setProgress(70);
      }
      // if (data.title === undefined) {
      //   return;
      // }

      // settting the totalResults state
      settotRes(data.totalResults);
      // console.log(totRes);

      // console.log(Math.ceil(totRes / noResultsPerPage));

      // settting the data or article state
      setArticles(articles.concat(data.articles));
      // console.log(this.state.articles);

      //arter fetching everything set it to false
      setLoading(false);

      // after the data is fetched from the api then it should be 1000
      if (flagProcess) {
        setProgress(100);
      }
      setFlagProcess(true);
    } catch (error) {
      alert(error);
      return;
    }
  };

  // Previous BTN. we removed this due to adding of infinite Scroll
  // const handlePrevClick = function () {
  // console.log("Prev button clicked");
  // console.log(page);
  // const pageNo = page--;
  // setPage(pageNo);
  // };

  // Next BTN. we removed this due to adding of infinite Scroll
  // const handleNextClick = function () {
  // console.log("Next btn is clicked");
  // console.log(Math.ceil(totRes / noResultsPerPage));
  // the above equation calculates the total no of pages

  // if (page > Math.ceil(totRes / noResultsPerPage)) {
  //   // console.log("man");
  //   // console.log(page);
  //   // console.log(Math.ceil(totRes / noResultsPerPage));
  //   alert("There are no Further pages, hit Previous Btn :)");
  //   // setPage(0);
  //   return;
  // }
  // console.log(page);
  // console.log(Math.ceil(totRes / noResultsPerPage));

  // const pageNo = page++;
  // setPage(pageNo);
  // };

  const fetchMoreData = () => {
    setFlagProcess(false);
    const pageNo = page + 1;
    setPage(pageNo);
  };

  // *** why? -> answer -> when ever the page varible changes the useEffect function will re-run the useEffect callBack function.
  useEffect(() => {
    fetchData(page);
  }, [page]);

  document.title = "NewsTak - " + category[0].toUpperCase() + category.slice(1);

  return (
    <>
      <h1 className="text-center" style={{ marginTop: "70px" }}>
        NewsTak - Top HeadLines - {category.toUpperCase()}
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totRes}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {/* this below syntex is, if i click the next btn the data on UI should be disappier spinner should display then after fetching the data then it should be appear */}
            {/* {!loading && */}
            {articles.map((article, i) => {
              // console.log(article);
              return (
                <div className="col-md-4" key={i}>
                  <NewsItem
                    title={
                      !article.title || article.title === undefined
                        ? ""
                        : article.title
                    }
                    description={article.description ? article.description : ""}
                    imageUrl={
                      article.urlToImage == null
                        ? "https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg"
                        : article.urlToImage
                    }
                    newsUrl={article.url}
                    //   content={article.content}
                    author={article.author ? article.author : "UnKnown Author"}
                    date={new Date(article.publishedAt)
                      .toGMTString()
                      .substring(0, 22)}
                    sourceName={article.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
        <button
          disabled={page <= 1}
          type="button"
          onClick={handlePrevClick}
          className="btn btn-secondary btn-sm"
        >
          &larr; Prev button
        </button>
        <button
          disabled={page >= Math.ceil(totRes / noResultsPerPage)}
          type="button"
          onClick={handleNextClick}
          className="btn btn-secondary btn-sm"
        >
          Next button &rarr;
        </button>
      </div> */}
    </>
  );
}

// deleted from the modren react
// News.defaultProps = {
//   country: "in",
//   noResultsPerPage: 9,
//   category: "general",
// };

News.propTypes = {
  country: PropTypes.string,
  noResultsPerPage: PropTypes.number,
  category: PropTypes.string,
};
