const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");
const Review = require("../models/Review");
const User = require("../models/User");
const { verifyToken, isAdmin } = require("../middleware/auth");

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private (Admin only)
router.get("/stats", verifyToken, isAdmin, async (req, res) => {
  try {
    // Get counts
    const totalGalleryItems = await Gallery.countDocuments();
    const activeGalleryItems = await Gallery.countDocuments({ isActive: true });
    const totalReviews = await Review.countDocuments();
    const pendingReviews = await Review.countDocuments({ status: "pending" });
    const approvedReviews = await Review.countDocuments({ status: "approved" });
    const rejectedReviews = await Review.countDocuments({ status: "rejected" });
    const totalAdmins = await User.countDocuments();

    // Get recent reviews
    const recentReviews = await Review.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("customerName rating status createdAt");

    // Get recent gallery items
    const recentGallery = await Gallery.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("uploadedBy", "username")
      .select("title imageUrl uploadedBy createdAt");

    // Calculate average rating
    const reviewStats = await Review.aggregate([
      { $match: { status: "approved" } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalRatings: { $sum: 1 },
        },
      },
    ]);

    const averageRating =
      reviewStats.length > 0 ? reviewStats[0].averageRating.toFixed(1) : 0;

    res.json({
      success: true,
      data: {
        gallery: {
          total: totalGalleryItems,
          active: activeGalleryItems,
          inactive: totalGalleryItems - activeGalleryItems,
        },
        reviews: {
          total: totalReviews,
          pending: pendingReviews,
          approved: approvedReviews,
          rejected: rejectedReviews,
          averageRating: parseFloat(averageRating),
        },
        admins: {
          total: totalAdmins,
        },
        recent: {
          reviews: recentReviews,
          gallery: recentGallery,
        },
      },
    });
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard statistics",
    });
  }
});

// @route   GET /api/dashboard/activity
// @desc    Get recent activity log
// @access  Private (Admin only)
router.get("/activity", verifyToken, isAdmin, async (req, res) => {
  try {
    // Get recent reviews with their status changes
    const recentReviews = await Review.find()
      .sort({ updatedAt: -1 })
      .limit(10)
      .populate("approvedBy", "username")
      .select("customerName status approvedBy updatedAt createdAt");

    // Get recent gallery uploads
    const recentGallery = await Gallery.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("uploadedBy", "username")
      .select("title uploadedBy createdAt");

    // Combine and sort by date
    const activity = [
      ...recentReviews.map((r) => ({
        type: "review",
        action: r.status,
        description: `Review by ${r.customerName} - ${r.status}`,
        user: r.approvedBy?.username || "Customer",
        timestamp: r.updatedAt,
      })),
      ...recentGallery.map((g) => ({
        type: "gallery",
        action: "upload",
        description: `Gallery item "${g.title}" uploaded`,
        user: g.uploadedBy?.username || "Admin",
        timestamp: g.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 15);

    res.json({
      success: true,
      data: activity,
    });
  } catch (error) {
    console.error("Get activity error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching activity log",
    });
  }
});

module.exports = router;
