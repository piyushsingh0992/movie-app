
// CommentList.tsx
import React from 'react';
import axiosInstance from '../api/axiosInstance';
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
  comments: Comment[];
}

interface CommentListProps {
  movieId: string;
  comments: Comment[];
  onCommentDeleted: (commentId: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({ movieId, comments, onCommentDeleted }) => {
  const { user } = useAuth();

  const deleteComment = (commentId: string) => {
    if (user && user.role === 'admin') {
      axiosInstance.delete(`/api/movies/${movieId}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          onCommentDeleted(commentId);
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4">Comments</h3>
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        comments.map(comment => (
          <div key={comment._id} className="mb-4 p-4 border rounded-lg bg-gray-50">
            <p className="text-gray-700">{comment.text} - <em className="text-gray-500">{comment.user.username}</em></p>
            {user && user.role === 'admin' && (
              <button
                onClick={() => deleteComment(comment._id)}
                className="mt-2 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Delete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;
