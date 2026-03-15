import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MovieGrid from '../components/MovieGrid';
import { fetchTrending, fetchPopular, fetchTopRated, fetchNowPlaying } from '../services/tmdb';
import './CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const loadCategory = async () => {
      setLoading(true);
      let data = [];
      let pageTitle = '';
      switch (category) {
        case 'trending':
          data = await fetchTrending();
          pageTitle = 'Trending Today';
          break;
        case 'popular':
          data = await fetchPopular();
          pageTitle = 'Popular Movies';
          break;
        case 'top-rated':
          data = await fetchTopRated();
          pageTitle = 'Top Rated';
          break;
        case 'now-playing':
          data = await fetchNowPlaying();
          pageTitle = 'Now Playing';
          break;
        default:
          data = [];
          pageTitle = 'Movies';
      }
      setMovies(data);
      setTitle(pageTitle);
      setLoading(false);
    };
    loadCategory();
  }, [category]);

  return (
    <>
      <Navbar />
      <div className="navbar-spacer"></div>
      <div className="category-page">
        <h1 className="category-page-title">{title}</h1>
        {loading ? <p>Loading...</p> : <MovieGrid movies={movies} />}
      </div>
    </>
  );
};

export default CategoryPage;