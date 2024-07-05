
// MovieList.tsx
import React from 'react';
import CommentList from './CommentList';


interface User {
  _id: string;
  username: string;
}

interface Comment {
  _id: string;
  text: string;
  user: User;
}

interface Movie {
  _id: string;
  name: string;
  description: string;
  runningTime: string;
  imageUrl: string;
  comments: Comment[];
}

interface MovieListProps {
  movies: Movie[];
  onCommentDeleted: (movieId: string, commentId: string) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onCommentDeleted }) => {
  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {movies.map(movie => (
        <div key={movie._id} className="bg-white rounded-lg shadow-md">
          <img src={movie.imageUrl} alt={movie.name} className="w-full h-64 object-cover rounded-t-lg" />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{movie.name}</h2>
            <p className="text-gray-700 mb-2">{movie.description}</p>
            <p className="text-gray-500 mb-4">Running time: {movie.runningTime}</p>
            <CommentList
              movieId={movie._id}
              comments={movie.comments}
              onCommentDeleted={(commentId) => onCommentDeleted(movie._id, commentId)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;