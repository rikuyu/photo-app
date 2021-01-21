import React, { useState, useEffect } from "react";
import "./App.css";

type Photo = {
  id: number;
  urls: {
    regular: string;
  };
  alt_description: string;
};

const App: React.FC<Photo> = () => {
  const [images, setImages] = useState([]);
  const [text, setText] = useState<string>("");
  const [query, setQuery] = useState<string>("cat");

  useEffect(() => {
    fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_CLIENT_ID}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setImages(data.results);
      });
  }, [query]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(text);
    setText("");
  };

  return (
    <div className="App">
      <div className="main">
        <form onSubmit={onSubmit}>
          <h1>Photo Search App</h1>
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
            value={text}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="container">
        {images.map((image: Photo) => (
          <div key={image.id} className="card">
            <img
              src={image.urls.regular}
              className="card-img"
              alt={image.alt_description}
            />
            <div className="card-content">
              <h1 className="card-title">{image.alt_description}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
