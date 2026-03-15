import MovieCard from './MovieCard';
import './CategoryRow.css';

const CategoryRow = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="category-row">
      <h2 className="category-title">{title}</h2>
      <div className="movie-row">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default CategoryRow;