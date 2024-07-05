import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface User {
  _id: string;
  username: string;
}

interface Comment {
  _id: string;
  text: string;
  user: User;
}

interface CommentSectionProps {
  movieId: string;
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ movieId, comments: initialComments }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState<string>('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const addComment = () => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    axiosInstance.post<Comment>(`/api/movies/${movieId}/comments`, { text: newComment })
      .then(response => {
        setComments([...comments, response.data]);
        setNewComment('');
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {comments?.map(comment => (
        <div key={comment._id} className="bg-gray-100 p-4 rounded-lg mb-4 shadow">
          <p>{comment.text}</p>
          <p className="text-sm text-gray-600">by {comment.user.username}</p>
        </div>
      ))}
      {user ? (
        <div className="mt-4">
          <textarea
            className="w-full p-2 border rounded-lg"
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={addComment}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Comment
          </button>
        </div>
      ) : (
        <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded">
          <p>You need to log in to add a comment.</p>
          <button
            onClick={() => navigate('/login', { state: { from: location } })}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
