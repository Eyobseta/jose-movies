import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MovieGrid from '../components/MovieGrid';
import { searchMovies } from '../services/tmdb';
import './SearchPage.css';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    const loadSearch = async () => {
      setLoading(true);
      const results = await searchMovies(query);
      setMovies(results);
      setLoading(false);
    };
    loadSearch();
  }, [query]);

  return (
    <>
      <Navbar />
      <div className="search-page">
        <h2 className="search-header">Results for: "{query}"</h2>
        {loading ? (
          <p className="loading">Searching...</p>
        ) : (
          <MovieGrid movies={movies} />
        )}
      </div>
    </>
  );
};

export default SearchPage;