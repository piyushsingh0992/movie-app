import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
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
      axiosInstance.post<Comment>(`/api/movies/${id}/comments`, { text: newComment })
        .then(response => {
          setComments([...comments, response.data]);
          setNewComment('');
        })
        .catch(error => console.error(error));
    }
  };

  const toggleFavorite = () => {
    if (user) {
      axiosInstance.post(`/users/favorites/${id}`)
        .then(response => setMovie(response.data))
        .catch(error => console.error(error));
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{movie.name}</h1>
      <img src={movie.imageUrl} alt={movie.name} className="w-full h-auto rounded-lg mb-4" />
      <p className="text-lg mb-4">{movie.description}</p>
      <p className="text-gray-600 mb-4">Running time: {movie.runningTime}</p>
      <button
        onClick={toggleFavorite}
        className={`px-4 py-2 rounded ${movie.favorite ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
      >
        {movie.favorite ? 'Unmark Favorite' : 'Mark Favorite'}
      </button>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.map(comment => (
          <div key={comment._id} className="bg-gray-100 p-4 rounded-lg mb-4">
            <p>{comment.text}</p>
          </div>
        ))}
        {user && (
          <div className="mt-4">
            <textarea
              className="w-full p-2 border rounded-lg"
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={addComment}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Comment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
