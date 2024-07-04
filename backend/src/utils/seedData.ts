import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Movie from '../models/Movie';
import User from '../models/User';

const MONGO_URI = 'mongodb+srv://piyushsingh0992:jzA7ydDWSoHJ54rZ@cluster0.lpflprd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    seedDatabase();
  })
  .catch(err => console.error(err));

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Movie.deleteMany({});
    await User.deleteMany({});

    // Add movies
    const movies = [
      { name: '3 Idiots', description: 'Two friends are searching for their long lost companion.', runningTime: '171 min', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg' },
      { name: 'Dangal', description: 'Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory.', runningTime: '161 min', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/99/Dangal_Poster.jpg' },
      { name: 'PK', description: 'An alien on Earth loses the only device he can use to communicate with his spaceship.', runningTime: '153 min', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c3/PK_poster.jpg' },
      { name: 'Bajrangi Bhaijaan', description: 'An Indian man with a magnanimous heart takes a mute Pakistani girl back to her homeland.', runningTime: '163 min', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/dd/Bajrangi_Bhaijaan_Poster.jpg' },
      { name: 'Sultan', description: 'Sultan Ali Khan, a wrestler, gives up the sport after the death of his son.', runningTime: '170 min', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/67/Sultan_film_poster.jpg' },
      { name: 'Baahubali: The Beginning', description: 'In ancient India, an adventurous and daring man becomes involved in a decades-old feud.', runningTime: '159 min', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7e/Baahubali_the_Beginning.jpg' },
      { name: 'Kabir Singh', description: 'Kabir Singh is a brilliant yet hostile surgeon who spirals into self-destruction.', runningTime: '172 min', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/90/Kabir_Singh.jpg' },
      { name: 'Padmaavat', description: 'Queen Padmavati is married to a noble king and they live in a prosperous fortress.', runningTime: '164 min', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/51/Padmaavat_poster.jpg' },
      { name: 'Tanhaji', description: 'Tanhaji Malusare, a military chieftain in the army of Maratha king Chhatrapati Shivaji Maharaj.', runningTime: '135 min', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/3/3e/Tanhaji_film_poster.jpg' },
      { name: 'Andhadhun', description: 'A series of mysterious events change the life of a blind pianist.', runningTime: '139 min', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a3/Andhadhun_poster.jpg' }
    ];

    await Movie.insertMany(movies);
    console.log('Movies added');

    // Add users
    const users = [
      { username: 'admin', password: await bcrypt.hash('admin123', 10), role: 'admin', favorites: [] },
      { username: 'user1', password: await bcrypt.hash('user123', 10), role: 'user', favorites: [] },
      { username: 'user2', password: await bcrypt.hash('user123', 10), role: 'user', favorites: [] },
      { username: 'user3', password: await bcrypt.hash('user123', 10), role: 'user', favorites: [] }
    ];

    await User.insertMany(users);
    console.log('Users added');

    mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
  }
};
