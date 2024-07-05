import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../api/axiosInstance';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

interface MovieFormProps {
  onMovieAdded: (movie: Movie) => void;
  onClose: () => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ onMovieAdded, onClose }) => {
  const { user } = useAuth();

  const initialValues = {
    name: '',
    description: '',
    runningTime: '',
    imageUrl: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required.'),
    description: Yup.string().required('Description is required.'),
    runningTime: Yup.string().required('Running time is required.'),
    imageUrl: Yup.string().required('Image URL is required.')
  });

  const handleSubmit = (values: typeof initialValues, { setSubmitting, setStatus }: any) => {
    if (user && user.role === 'admin') {
      axiosInstance.post<Movie>('/api/movies', values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          onMovieAdded(response.data);
          onClose();
        })
        .catch(error => {
          setStatus({ submitError: 'Failed to add movie. Please try again.' });
          console.error(error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Add a New Movie</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            {status && status.submitError && (
              <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-md">
                {status.submitError}
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <Field
                id="description"
                name="description"
                as="textarea"
                placeholder="Description"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="description" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="runningTime">
                Running Time
              </label>
              <Field
                id="runningTime"
                name="runningTime"
                type="text"
                placeholder="Running Time"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="runningTime" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
                Image URL
              </label>
              <Field
                id="imageUrl"
                name="imageUrl"
                type="text"
                placeholder="Image URL"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="imageUrl" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Movie'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MovieForm;
