const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const { verifyToken, isAdmin } = require("../middleware/auth");

// @route   GET /api/reviews
// @desc    Get all reviews (filtered by status for public)
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};

    // If status is specified, filter by it
    if (status) {
      query.status = status;
    } else {
      // Public view: only show approved reviews
      query.status = "approved";
    }

    const reviews = await Review.find(query)
      .populate("approvedBy", "username")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    console.error("Get reviews error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
    });
  }
});

// @route   GET /api/reviews/admin/all
// @desc    Get all reviews (all statuses) - Admin only
// @access  Private (Admin only)
router.get("/admin/all", verifyToken, isAdmin, async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("approvedBy", "username")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    console.error("Get all reviews error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
    });
  }
});

// @route   GET /api/reviews/:id
// @desc    Get single review
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate(
      "approvedBy",
      "username"
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.json({
      success: true,
      data: review,
    });
  } catch (error) {
    console.error("Get review error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching review",
    });
  }
});

// @route   POST /api/reviews
// @desc    Create new review (submitted by customers)
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { customerName, rating, comment, email } = req.body;

    // Validation
    if (!customerName || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Please provide customer name, rating, and comment",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const review = new Review({
      customerName,
      rating,
      comment,
      email,
      status: "pending", // Default to pending for admin approval
    });

    await review.save();

    res.status(201).json({
      success: true,
      message:
        "Review submitted successfully. It will be visible after admin approval.",
      data: review,
    });
  } catch (error) {
    console.error("Create review error:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting review",
    });
  }
});

// @route   PUT /api/reviews/:id/approve
// @desc    Approve a review
// @access  Private (Admin only)
router.put("/:id/approve", verifyToken, isAdmin, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.status = "approved";
    review.approvedBy = req.userId;
    review.approvedAt = Date.now();
    await review.save();

    const updatedReview = await Review.findById(review._id).populate(
      "approvedBy",
      "username"
    );

    res.json({
      success: true,
      message: "Review approved successfully",
      data: updatedReview,
    });
  } catch (error) {
    console.error("Approve review error:", error);
    res.status(500).json({
      success: false,
      message: "Error approving review",
    });
  }
});

// @route   PUT /api/reviews/:id/reject
// @desc    Reject a review
// @access  Private (Admin only)
router.put("/:id/reject", verifyToken, isAdmin, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.status = "rejected";
    review.approvedBy = req.userId;
    review.approvedAt = Date.now();
    await review.save();

    const updatedReview = await Review.findById(review._id).populate(
      "approvedBy",
      "username"
    );

    res.json({
      success: true,
      message: "Review rejected successfully",
      data: updatedReview,
    });
  } catch (error) {
    console.error("Reject review error:", error);
    res.status(500).json({
      success: false,
      message: "Error rejecting review",
    });
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete review
// @access  Private (Admin only)
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await review.deleteOne();

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Delete review error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting review",
    });
  }
});

module.exports = router;
