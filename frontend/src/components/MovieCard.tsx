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
    <Link key={movie._id} to={`/movie/${movie._id}`}>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img src={movie.imageUrl} alt={movie.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold">{movie.name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
