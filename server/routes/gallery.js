const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");
const { verifyToken, isAdmin } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/Photo/Gallery Photos"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

// @route   GET /api/gallery
// @desc    Get all gallery items (public or admin view)
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { isActive: status === "active" } : {};

    const galleryItems = await Gallery.find(query)
      .populate("uploadedBy", "username")
      .sort({ displayOrder: -1, createdAt: -1 });

    res.json({
      success: true,
      count: galleryItems.length,
      data: galleryItems,
    });
  } catch (error) {
    console.error("Get gallery error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching gallery items",
    });
  }
});

// @route   GET /api/gallery/:id
// @desc    Get single gallery item
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id).populate(
      "uploadedBy",
      "username"
    );

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.json({
      success: true,
      data: galleryItem,
    });
  } catch (error) {
    console.error("Get gallery item error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching gallery item",
    });
  }
});

// @route   POST /api/gallery
// @desc    Create new gallery item (with file upload)
// @access  Private (Admin only)
router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, description, category, displayOrder } = req.body;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please upload an image",
        });
      }

      const imageUrl = `/Photo/Gallery Photos/${req.file.filename}`;

      const galleryItem = new Gallery({
        title,
        description,
        imageUrl,
        category: category || "other",
        displayOrder: displayOrder || 0,
        uploadedBy: req.userId,
      });

      await galleryItem.save();

      const populatedItem = await Gallery.findById(galleryItem._id).populate(
        "uploadedBy",
        "username"
      );

      res.status(201).json({
        success: true,
        message: "Gallery item created successfully",
        data: populatedItem,
      });
    } catch (error) {
      console.error("Create gallery error:", error);
      res.status(500).json({
        success: false,
        message: "Error creating gallery item",
      });
    }
  }
);

// @route   PUT /api/gallery/:id
// @desc    Update gallery item
// @access  Private (Admin only)
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const { title, description, category, isActive, displayOrder } = req.body;

    let galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    // Update fields
    if (title !== undefined) galleryItem.title = title;
    if (description !== undefined) galleryItem.description = description;
    if (category !== undefined) galleryItem.category = category;
    if (isActive !== undefined) galleryItem.isActive = isActive;
    if (displayOrder !== undefined) galleryItem.displayOrder = displayOrder;

    await galleryItem.save();

    const updatedItem = await Gallery.findById(galleryItem._id).populate(
      "uploadedBy",
      "username"
    );

    res.json({
      success: true,
      message: "Gallery item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    console.error("Update gallery error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating gallery item",
    });
  }
});

// @route   DELETE /api/gallery/:id
// @desc    Delete gallery item
// @access  Private (Admin only)
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    await galleryItem.deleteOne();

    res.json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (error) {
    console.error("Delete gallery error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting gallery item",
    });
  }
});

module.exports = router;
