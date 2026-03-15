import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
const { id, title, poster_path, release_date, vote_average, genre_ids: _genre_ids } = movie;
  const year = release_date ? release_date.split('-')[0] : 'N/A';
  const posterUrl = poster_path 
    ? `https://image.tmdb.org/t/p/w500${poster_path}` 
    : '/placeholder-poster.jpg'; // you can add a placeholder image

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img src={posterUrl} alt={title} className="movie-card-poster" />
      <div className="movie-card-info">
        <h4 className="movie-card-title">{title}</h4>
        <div className="movie-card-meta">
          <span className="rating">⭐ {vote_average.toFixed(1)}</span>
          <span className="year">{year}</span>
        </div>
        {/* Genre names would require another API call, we'll skip for now */}
      </div>
    </div>
  );
};

export default MovieCard;