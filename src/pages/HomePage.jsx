import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import CategoryRow from '../components/CategoryRow';
import { fetchTrending, fetchPopular, fetchTopRated, fetchNowPlaying } from '../services/tmdb';

const HomePage = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const trendingData = await fetchTrending();
      const popularData = await fetchPopular();
      const topRatedData = await fetchTopRated();
      const nowPlayingData = await fetchNowPlaying();

      setTrending(trendingData);
      setPopular(popularData);
      setTopRated(topRatedData);
      setNowPlaying(nowPlayingData);
      setHeroMovie(trendingData[0]); // first trending as hero
    };
    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <HeroBanner movie={heroMovie} />
      <CategoryRow title="Trending Today" movies={trending} />
      <CategoryRow title="Popular Movies" movies={popular} />
      <CategoryRow title="Top Rated" movies={topRated} />
      <CategoryRow title="Now Playing" movies={nowPlaying} />
    </>
  );
};

export default HomePage;