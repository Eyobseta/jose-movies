import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import './CategoryRow.css';

const CategoryRow = ({ title, movies, limit = 5, viewAllLink }) => {
  if (!movies || movies.length === 0) return null;

  const displayedMovies = movies.slice(0, limit);

  return (
    <section className="category-row">
      <h2 className="category-title">{title}</h2>
      <div className="movie-row">
        {displayedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {viewAllLink && (
        <div className="view-all-container">
          <Link to={viewAllLink} className="view-all-link">View All →</Link>
        </div>
      )}
    </section>
  );
};

export default CategoryRow;