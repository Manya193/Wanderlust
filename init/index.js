const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
require("dotenv").config();

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

require("dotenv").config();
const MONGO_URL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  const listings = [];

  for (let obj of initData.data) {

    let response = await geocodingClient.forwardGeocode({
      query: `${obj.location}, ${obj.country}`,
      limit: 1,
    }).send();

    obj.owner = "6a3fefe1f19408a29916eb70";
    obj.geometry = response.body.features[0].geometry;

    listings.push(obj);
  }

  await Listing.insertMany(listings);

  console.log("Data was initialized");
};

initDB();