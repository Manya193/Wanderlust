const express = require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview,isLoggedIn,isAuthor} = require("../middleware.js");
const reviewController = require("../controller/reviews.js");

//Reviews Post Route
router.post("/",validateReview,isLoggedIn,wrapAsync(reviewController.createReview));

//Delete Revieew Route
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(reviewController.destroyReview));

module.exports=router;
