const mongoose = require("mongoose");

const RestaurantsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dishes: {
    type: Object,
  },
});

const Restaurants = mongoose.model("restaurants", RestaurantsSchema);

module.exports = Restaurants;
