import mongoose from "mongoose";

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const BookSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true,
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true,
  },
});

// This creates our model from the above schema, using mongoose's model method
const Books = mongoose.model("Books", BookSchema);

// Export the Book model
export default Books;
