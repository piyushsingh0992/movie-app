import React from 'react';

interface MovieInfoProps {
  movie: {
    name: string;
    description: string;
    runningTime: string;
    imageUrl: string;
  };
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{movie.name}</h1>
      <img src={movie.imageUrl} alt={movie.name} className="w-full h-auto rounded-lg mb-4" />
      <p className="text-lg mb-4">{movie.description}</p>
      <p className="text-gray-600 mb-4">Running time: {movie.runningTime}</p>
    </div>
  );
};

export default MovieInfo;
