const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const MangaSchema = new Schema({
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
//const Manga = mongoose.model("Manga", MangaSchema);
const Manga = mongoose.model("Manga", MangaSchema);
// Export the Manga model
// why does module,exports break this import in another file?
module.exports = Manga;
