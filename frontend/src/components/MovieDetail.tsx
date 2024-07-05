import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import MovieInfo from './MovieInfo';
import CommentSection from './CommentSection';
import FavoriteButton from './FavoriteButton';

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
  favorite: boolean;
  comments: Comment[];
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    axiosInstance.get<Movie>(`/api/movies/${id}`)
      .then(response => setMovie(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleToggleFavorite = (isFavorite: boolean) => {
    if (movie) {
      setMovie({ ...movie, favorite: isFavorite });
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <MovieInfo movie={movie} />
      <FavoriteButton movieId={movie._id} isFavorite={movie.favorite} onToggleFavorite={handleToggleFavorite} />
      <CommentSection movieId={movie._id} comments={movie.comments} />
    </div>
  );
};

export default MovieDetail;
