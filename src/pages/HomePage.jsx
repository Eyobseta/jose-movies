import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import CategoryRow from "../components/CategoryRow";
import {
  fetchTrending,
  fetchPopular,
  fetchTopRated,
  fetchNowPlaying,
} from "../services/tmdb";

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
      setHeroMovie(trendingData[0]); 
    };
    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <HeroBanner movie={heroMovie} />
      <CategoryRow
        title="Trending Today"
        movies={trending}
        limit={5}
        viewAllLink="/category/trending"
      />
      <CategoryRow
        title="Popular Movies"
        movies={popular}
        limit={5}
        viewAllLink="/category/popular"
      />
      <CategoryRow
        title="Top Rated"
        movies={topRated}
        limit={5}
        viewAllLink="/category/top-rated"
      />
      <CategoryRow
        title="Now Playing"
        movies={nowPlaying}
        limit={5}
        viewAllLink="/category/now-playing"
      />
    </>
  );
};

export default HomePage;
