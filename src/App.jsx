import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [text, setText] = useState("");
  const [query, setQuery] = useState("apple");

  useEffect(() => {
    console.log("useEffect was called");
    fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_CLIENT_ID}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setImages(data.results);
      });
  }, [query]);

  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(text);
    setText("");
    console.log("onSubmit was called");
  };

  return (
    <div className="App">
      <div className="main">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="container">
        {images.map((image) => (
          <div key={image.id} className="card">
            <img src={image.urls.regular} className="card-img" alt="" />
            <div className="card-content">
              <h1 className="card-title">{image.alt_description}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
