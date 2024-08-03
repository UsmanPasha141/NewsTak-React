import React from "react";

export default function NewsItem(props) {
  const { title, description, imageUrl, newsUrl, author, date, sourceName } =
    props;
  return (
    // <div className="card mx-4 h-100 my-200" style={{ width: "18rem" }}>
    <div className="card my-3 ">
      <img src={imageUrl} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <small className="text-body-secondary">
            Published Channel <b>{sourceName}</b>
          </small>
        </p>
        <p className="card-text">
          <small className="text-body-secondary">
            By <b>{author}</b> on <b>{date}</b>
          </small>
        </p>
        <a
          rel="noreferrer"
          href={newsUrl}
          target="_blank"
          className="btn btn-sm btn-primary"
        >
          Read More
        </a>
        <span
          className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
          style={{ left: "90%", zindex: "1" }}
        >
          {Math.abs(Number(date.substring(5, 7)) - new Date().getDate())} days
          ago
        </span>
        {/* <p>{content}</p> */}
      </div>
    </div>
  );
}
