import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import MovieInfo from './MovieInfo';
import CommentSection from './CommentSection';
import FavoriteButton from './FavoriteButton';
import { useAuth } from '../contexts/AuthContext';

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

interface MovieDetailResponse {
  movie: Movie;
  usersWhoLiked: User[];
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [usersWhoLiked, setUsersWhoLiked] = useState<User[]>([]);
  const { user:currentUser } = useAuth();
  useEffect(() => {
    axiosInstance.get<MovieDetailResponse>(`/api/movies/${id}`)
      .then(response => {
        setMovie(response.data.movie);
        setUsersWhoLiked(response.data.usersWhoLiked);
      })
      .catch(error => console.error(error));
  }, [id]);


  if (!movie) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
        <MovieInfo movie={movie} />
        <div className="mt-6 flex justify-center">
          <FavoriteButton movieId={movie._id}          isFavorite={usersWhoLiked.some(user => user.username === currentUser?.username ?? '')}   />
        </div>
        <CommentSection movieId={movie._id} comments={movie.comments} />
      </div>
    </div>
  );
};

export default MovieDetail;
