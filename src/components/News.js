import React, { useState, useEffect } from 'react';
import './News.css'

const News = () => {
  const BASE_URL = 'https://saurav.tech/NewsAPI/';
  const topHeadlinesAPI = `${BASE_URL}top-headlines/category`;

  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('general');
  const [query, setQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      const url = `${topHeadlinesAPI}/${category}/in.json`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    
    fetchNews();
  }, [category]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <header>
        <h1>News Website</h1>
        <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      </header>

      <div className="container">
        <div className="filters">
          <select onChange={(e) => setCategory(e.target.value)} value={category}>
            <option value="general">General</option>
            <option value="technology">Technology</option>
            <option value="sports">Sports</option>
            <option value="business">Business</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="entertainment">Entertainment</option>
          </select>
          <input
            type="text"
            placeholder="Search news..."
            onInput={handleSearch}
            value={query}
          />
        </div>

        <div id="newsContainer">
          {news.filter((article) => article.title.toLowerCase().includes(query)).map((article) => (
            <div key={article.url} className="news-item">
              <h3>{article.title}</h3>
              <p>{article.description || 'No description available.'}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
