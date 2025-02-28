import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/blogging_platform');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectToMongoDB;
