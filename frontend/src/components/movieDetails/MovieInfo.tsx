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
    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
      <div className="md:w-1/4 w-full">
        <img
          src={movie.imageUrl}
          alt={movie.name}
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="md:w-1/2 w-full flex flex-col justify-center text-center md:text-left">
        <h1 className="text-4xl font-bold mb-4">{movie.name}</h1>
        <p className="text-lg mb-4">{movie.description}</p>
        <p className="text-gray-600 mb-4">Running time: {movie.runningTime}</p>
      </div>
    </div>
  );
};

export default MovieInfo;
