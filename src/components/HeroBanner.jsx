import { useNavigate } from 'react-router-dom';
import './HeroBanner.css';

const HeroBanner = ({ movie }) => {
  const navigate = useNavigate();
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` 
    : '';
  const title = movie.title;
  const overview = movie.overview;

  const handleDetails = () => navigate(`/movie/${movie.id}`);
  const handleTelegram = () => {
    // Placeholder: you'll replace with actual Telegram link later
    alert('Telegram link will go here');
  };

  return (
    <div 
      className="hero-banner" 
      style={{ backgroundImage: `url(${backdropUrl})` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-overview">{overview.substring(0, 150)}…</p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={handleDetails}>View Details</button>
          <button className="btn btn-secondary" onClick={handleTelegram}>Download on Telegram</button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;