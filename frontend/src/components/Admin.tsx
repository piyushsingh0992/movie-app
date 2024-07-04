import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../contexts/AuthContext';

interface Movie {
  _id: string;
  name: string;
  description: string;
  runningTime: string;
  imageUrl: string;
  comments: { _id: string, text: string }[];
}

const Admin: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [runningTime, setRunningTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    axiosInstance.get<Movie[]>('/api/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error(error));
  }, []);

  const addMovie = () => {
    if (user && user.role === 'admin') {
      axiosInstance.post<Movie>('/api/movies', { name, description, runningTime, imageUrl }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => setMovies([...movies, response.data]))
      .catch(error => console.error(error));
    }
  };

  const deleteComment = (movieId: string, commentId: string) => {
    if (user && user.role === 'admin') {
      axiosInstance.delete(`/api/movies/${movieId}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(() => {
        setMovies(movies.map(movie => {
          if (movie._id === movieId) {
            return {
              ...movie,
              comments: movie.comments.filter(comment => comment._id !== commentId)
            };
          }
          return movie;
        }));
      })
      .catch(error => console.error(error));
    }
  };

  return (
    <div>
      <h1>Admin</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Running Time"
          value={runningTime}
          onChange={(e) => setRunningTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button onClick={addMovie}>Add Movie</button>
      </div>
      <div className="movie-list">
        {movies.map(movie => (
          <div key={movie._id}>
            <h2>{movie.name}</h2>
            <p>{movie.description}</p>
            <p>Running time: {movie.runningTime}</p>
            <img src={movie.imageUrl} alt={movie.name} />
            <h3>Comments</h3>
            {movie.comments.map(comment => (
              <p key={comment._id}>
                {comment.text}
                <button onClick={() => deleteComment(movie._id, comment._id)}>Delete</button>
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
