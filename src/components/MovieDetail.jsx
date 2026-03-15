import { useParams,useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovieDetails } from '../services/tmdb';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      const data = await fetchMovieDetails(id);
      setMovie(data);
      setLoading(false);
    };
    loadMovie();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!movie) return <div className="error">Movie not found</div>;

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : '/placeholder-poster.jpg';
  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` 
    : '';
  const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
  const genres = movie.genres.map(g => g.name).join(', ');
  const cast = movie.credits?.cast?.slice(0, 5).map(c => c.name).join(', ') || 'N/A';
  const director = movie.credits?.crew?.find(c => c.job === 'Director')?.name || 'N/A';

  return (
    <div className="movie-detail">
      <div className="detail-header" style={{ backgroundImage: `url(${backdropUrl})` }}>
        <div className="header-overlay"></div>
        <div className="header-content">
          <img src={posterUrl} alt={movie.title} className="detail-poster" />
          <div className="detail-info">
            <h1 className="detail-title">{movie.title}</h1>
            <div className="detail-meta">
              <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
              <span>{year}</span>
              <span>{movie.runtime} min</span>
              <span>{genres}</span>
            </div>
            <p className="detail-overview">{movie.overview}</p>
            <button className="btn btn-primary" onClick={() => alert('Telegram link here')}>
              Download on Telegram
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/')}>
  Back to Home
</button>
          </div>
        </div>
      </div>
      <div className="detail-extra">
        <div className="extra-item"><strong>Cast:</strong> {cast}</div>
        <div className="extra-item"><strong>Director:</strong> {director}</div>
        <div className="extra-item"><strong>Language:</strong> {movie.spoken_languages.map(l => l.name).join(', ')}</div>
        <div className="extra-item"><strong>Country:</strong> {movie.production_countries.map(c => c.name).join(', ')}</div>
        <div className="extra-item"><strong>Status:</strong> {movie.status}</div>
      </div>
      {/* Similar movies can be added later with another API call */}
    </div>
  );
};

export default MovieDetail;