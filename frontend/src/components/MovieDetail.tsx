import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Comment {
  _id: string;
  text: string;
}

interface Movie {
  _id: string;
  name: string;
  description: string;
  runningTime: string;
  imageUrl: string;
  favorite: boolean;
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const { user } = useAuth();

  useEffect(() => {
    axiosInstance.get<Movie>(`/api/movies/${id}`)
      .then(response => setMovie(response.data))
      .catch(error => console.error(error));

    axiosInstance.get<Comment[]>(`/api/movies/${id}/comments`)
      .then(response => setComments(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const addComment = () => {
    if (user) {
      axiosInstance.post<Comment>(`/api/movies/${id}/comments`, { text: newComment }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        setComments([...comments, response.data]);
        setNewComment('');
      })
      .catch(error => console.error(error));
    }
  };

  const toggleFavorite = () => {
    if (user) {
      axiosInstance.post(`/api/users/favorites/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => setMovie(response.data))
      .catch(error => console.error(error));
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h1>{movie.name}</h1>
      <img src={movie.imageUrl} alt={movie.name} />
      <p>{movie.description}</p>
      <p>Running time: {movie.runningTime}</p>
      <button onClick={toggleFavorite}>
        {movie.favorite ? 'Unmark Favorite' : 'Mark Favorite'}
      </button>
      <div>
        <h2>Comments</h2>
        {comments.map(comment => (
          <p key={comment._id}>{comment.text}</p>
        ))}
        {user && (
          <div>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={addComment}>Add Comment</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
