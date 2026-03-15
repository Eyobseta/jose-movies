import MovieCard from './MovieCard';
import './MovieGrid.css';

const MovieGrid = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p className="no-results">No movies found.</p>;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;