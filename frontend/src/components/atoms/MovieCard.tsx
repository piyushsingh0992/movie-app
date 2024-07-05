import React from 'react';
import { Link } from 'react-router-dom';

interface Movie {
  _id: string;
  name: string;
  imageUrl: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link
      key={movie._id}
      to={`/movie/${movie._id}`}
      className="block transform hover:scale-105 transition-transform duration-300"
    >
      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-xs mx-auto">
        <div className="relative w-full" style={{ paddingBottom: '150%' }}> {/* This ensures a consistent 2:3 aspect ratio */}
          <img
            src={movie.imageUrl}
            alt={movie.name}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800">{movie.name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
