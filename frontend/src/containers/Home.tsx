import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import MovieCard from '../components/atoms/MovieCard';

interface Movie {
  _id: string;
  name: string;
  imageUrl: string;
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    axiosInstance
      .get<Movie[]>('/api/movies')
      .then((response) => setMovies(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container mx-auto p-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
