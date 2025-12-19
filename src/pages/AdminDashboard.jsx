import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { galleryAPI, reviewsAPI, dashboardAPI } from "../services/api";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const { isAuthenticated, logout, isLoading, user } = useAuth();
  const navigate = useNavigate();

  // State for navigation
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // State for gallery management
  const [galleryImages, setGalleryImages] = useState([]);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [uploadPreview, setUploadPreview] = useState([]);

  // State for reviews management
  const [reviews, setReviews] = useState([]);
  const [reviewFilter, setReviewFilter] = useState("all");
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [reviewToApprove, setReviewToApprove] = useState(null);
  const [reviewToReject, setReviewToReject] = useState(null);

  // State for dashboard statistics
  const [dashboardStats, setDashboardStats] = useState(null);

  // State for modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReviewDeleteModal, setShowReviewDeleteModal] = useState(false);
  const [showReviewApproveModal, setShowReviewApproveModal] = useState(false);
  const [showReviewRejectModal, setShowReviewRejectModal] = useState(false);

  // State for messages
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const loadGalleryImages = async () => {
    try {
      const response = await galleryAPI.getAll();
      if (response.success) {
        setGalleryImages(response.data);
      }
    } catch (error) {
      console.error("Error loading gallery:", error);
      setMessage({ type: "error", text: "Failed to load gallery images" });
    }
  };

  const loadReviews = async () => {
    try {
      const response = await reviewsAPI.getAllAdmin();
      if (response.success) {
        setReviews(response.data);
      }
    } catch (error) {
      console.error("Error loading reviews:", error);
      setMessage({ type: "error", text: "Failed to load reviews" });
    }
  };

  const loadDashboardStats = async () => {
    try {
      const response = await dashboardAPI.getStats();
      if (response.success) {
        setDashboardStats(response.data);
      }
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
    }
  };

  useEffect(() => {
    // Load data from MongoDB on mount
    loadGalleryImages();
    loadReviews();
    loadDashboardStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));
    setUploadPreview(previews);
  };

  const handleUpload = async () => {
    if (uploadPreview.length === 0) {
      alert("Please select images to upload");
      return;
    }

    setMessage({ type: "info", text: "Uploading images..." });

    try {
      let successCount = 0;
      let errorCount = 0;

      for (const img of uploadPreview) {
        try {
          const formData = new FormData();
          formData.append("image", img.file);
          formData.append("title", img.file.name.split(".")[0]);
          formData.append("description", "Uploaded from admin panel");
          formData.append("category", "other");

          const response = await galleryAPI.create(formData);
          if (response.success) {
            successCount++;
          } else {
            errorCount++;
          }
        } catch (err) {
          console.error(`Error uploading ${img.file.name}:`, err);
          errorCount++;
        }
      }

      // Clear preview
      uploadPreview.forEach((img) => URL.revokeObjectURL(img.preview));
      setUploadPreview([]);

      // Reload gallery
      await loadGalleryImages();

      // Show success message
      setMessage({
        type: "success",
        text: `✅ Upload complete! ${successCount} image(s) uploaded successfully${
          errorCount > 0 ? `, ${errorCount} failed` : ""
        }.`,
      });

      // Clear message after 5 seconds
      setTimeout(() => setMessage({ type: "", text: "" }), 5000);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({
        type: "error",
        text: "❌ Failed to upload images. Please try again.",
      });
    }
  };

  const confirmDelete = (galleryItem) => {
    setImageToDelete(galleryItem);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!imageToDelete) return;

    try {
      const response = await galleryAPI.delete(imageToDelete._id);
      if (response.success) {
        setMessage({
          type: "success",
          text: "✅ Image deleted successfully!",
        });
        // Reload gallery
        await loadGalleryImages();
      } else {
        setMessage({ type: "error", text: "❌ Failed to delete image" });
      }
    } catch (error) {
      console.error("Delete error:", error);
      setMessage({ type: "error", text: "❌ Failed to delete image" });
    }

    setShowDeleteModal(false);
    setImageToDelete(null);

    // Clear message after 5 seconds
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  // Review action handlers
  const handleApproveReview = async () => {
    if (!reviewToApprove) return;

    try {
      const response = await reviewsAPI.approve(reviewToApprove._id);
      if (response.success) {
        setMessage({
          type: "success",
          text: "✅ Review approved successfully!",
        });
        await loadReviews();
        await loadDashboardStats();
      }
    } catch (error) {
      console.error("Approve error:", error);
      setMessage({ type: "error", text: "❌ Failed to approve review" });
    }

    setShowReviewApproveModal(false);
    setReviewToApprove(null);
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const handleRejectReview = async () => {
    if (!reviewToReject) return;

    try {
      const response = await reviewsAPI.reject(reviewToReject._id);
      if (response.success) {
        setMessage({
          type: "success",
          text: "✅ Review rejected successfully!",
        });
        await loadReviews();
        await loadDashboardStats();
      }
    } catch (error) {
      console.error("Reject error:", error);
      setMessage({ type: "error", text: "❌ Failed to reject review" });
    }

    setShowReviewRejectModal(false);
    setReviewToReject(null);
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const handleDeleteReview = async () => {
    if (!reviewToDelete) return;

    try {
      const response = await reviewsAPI.delete(reviewToDelete._id);
      if (response.success) {
        setMessage({
          type: "success",
          text: "✅ Review deleted successfully!",
        });
        await loadReviews();
        await loadDashboardStats();
      }
    } catch (error) {
      console.error("Delete error:", error);
      setMessage({ type: "error", text: "❌ Failed to delete review" });
    }

    setShowReviewDeleteModal(false);
    setReviewToDelete(null);
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>
            <i className="fas fa-tachometer-alt"></i> Admin Dashboard
          </h1>
        </div>
      </header>

      <div className="admin-layout">
        {/* Sidebar Navigation */}
        <aside
          className={`admin-sidebar ${sidebarCollapsed ? "collapsed" : ""}`}
        >
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <i
              className={`fas ${
                sidebarCollapsed ? "fa-chevron-right" : "fa-chevron-left"
              }`}
            ></i>
          </button>

          <nav className="sidebar-nav">
            <button
              className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <i className="fas fa-home"></i>
              <span>Overview</span>
            </button>
            <button
              className={`nav-item ${activeTab === "gallery" ? "active" : ""}`}
              onClick={() => setActiveTab("gallery")}
            >
              <i className="fas fa-images"></i>
              <span>Gallery Manager</span>
            </button>
            <button
              className={`nav-item ${activeTab === "upload" ? "active" : ""}`}
              onClick={() => setActiveTab("upload")}
            >
              <i className="fas fa-cloud-upload-alt"></i>
              <span>Upload Images</span>
            </button>
            <button
              className={`nav-item ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              <i className="fas fa-star"></i>
              <span>Reviews Manager</span>
              {reviews.filter((r) => r.status === "pending").length > 0 && (
                <span className="badge">
                  {reviews.filter((r) => r.status === "pending").length}
                </span>
              )}
            </button>
          </nav>

          <div className="sidebar-actions">
            <button
              onClick={() => navigate("/")}
              className="sidebar-action-btn"
              title="View Website"
            >
              <i className="fas fa-external-link-alt"></i>
              <span>View Website</span>
            </button>
            <button
              onClick={handleLogout}
              className="sidebar-action-btn logout"
              title="Logout"
            >
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          <div className="admin-container">
            {/* Message Display */}
            {message.text && (
              <div className={`admin-message admin-message-${message.type}`}>
                <i
                  className={
                    message.type === "success"
                      ? "fas fa-check-circle"
                      : message.type === "error"
                      ? "fas fa-exclamation-circle"
                      : "fas fa-info-circle"
                  }
                ></i>
                <span>{message.text}</span>
                <button
                  onClick={() => setMessage({ type: "", text: "" })}
                  className="close-message"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )}

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <section className="overview-section">
                <h2>
                  <i className="fas fa-chart-line"></i> Dashboard Overview
                </h2>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon gallery">
                      <i className="fas fa-images"></i>
                    </div>
                    <div className="stat-info">
                      <h3>
                        {dashboardStats?.gallery?.total || galleryImages.length}
                      </h3>
                      <p>Total Gallery</p>
                      <small>
                        {dashboardStats?.gallery?.active || 0} Active
                      </small>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon reviews">
                      <i className="fas fa-star"></i>
                    </div>
                    <div className="stat-info">
                      <h3>
                        {dashboardStats?.reviews?.total || reviews.length}
                      </h3>
                      <p>Total Reviews</p>
                      <small>
                        ⭐{" "}
                        {dashboardStats?.reviews?.averageRating?.toFixed(1) ||
                          "0.0"}{" "}
                        Avg Rating
                      </small>
                    </div>
                  </div>
                  <div className="stat-card pending">
                    <div className="stat-icon pending">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="stat-info">
                      <h3>
                        {dashboardStats?.reviews?.pending ||
                          reviews.filter((r) => r.status === "pending").length}
                      </h3>
                      <p>Pending Reviews</p>
                      <small>Awaiting approval</small>
                    </div>
                  </div>
                  <div className="stat-card approved">
                    <div className="stat-icon approved">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <div className="stat-info">
                      <h3>
                        {dashboardStats?.reviews?.approved ||
                          reviews.filter((r) => r.status === "approved").length}
                      </h3>
                      <p>Approved</p>
                      <small>Published reviews</small>
                    </div>
                  </div>
                  <div className="stat-card rejected">
                    <div className="stat-icon rejected">
                      <i className="fas fa-times-circle"></i>
                    </div>
                    <div className="stat-info">
                      <h3>
                        {dashboardStats?.reviews?.rejected ||
                          reviews.filter((r) => r.status === "rejected").length}
                      </h3>
                      <p>Rejected</p>
                      <small>Declined reviews</small>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon admin">
                      <i className="fas fa-user-shield"></i>
                    </div>
                    <div className="stat-info">
                      <h3>{user?.username || "Admin"}</h3>
                      <p>Logged In</p>
                      <small>
                        {dashboardStats?.admins?.total || 1} Admin(s)
                      </small>
                    </div>
                  </div>
                </div>
                <div className="info-box">
                  <i className="fas fa-lightbulb"></i>
                  <div className="info-content">
                    <strong>Welcome to Admin Dashboard!</strong>
                    <p>
                      Use the sidebar to navigate between different sections:
                    </p>
                    <ul>
                      <li>
                        📸 <strong>Gallery Manager:</strong> View and manage all
                        gallery images
                      </li>
                      <li>
                        📤 <strong>Upload Images:</strong> Add new images to
                        your gallery
                      </li>
                      <li>
                        ⭐ <strong>Reviews Manager:</strong> Approve, reject, or
                        delete customer reviews
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* Upload Section */}
            {activeTab === "upload" && (
              <section className="upload-section">
                <h2>
                  <i className="fas fa-cloud-upload-alt"></i> Upload New Images
                </h2>

                <div className="info-box">
                  <i className="fas fa-info-circle"></i>
                  <div className="info-content">
                    <strong>Upload Images to MongoDB:</strong>
                    <p>
                      Images are automatically uploaded to MongoDB and stored on
                      the server. They will appear immediately on your gallery
                      page.
                    </p>
                    <ul>
                      <li>
                        ✅ Instant upload - No manual file copying required
                      </li>
                      <li>✅ Stored in MongoDB database</li>
                      <li>✅ Automatically displayed on the website</li>
                      <li>✅ Delete anytime from this dashboard</li>
                    </ul>
                  </div>
                </div>

                <div className="upload-area">
                  <input
                    type="file"
                    id="file-input"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="file-input" className="upload-label">
                    <i className="fas fa-plus-circle"></i>
                    <span>Click to select images</span>
                    <small>JPG, PNG, WebP supported</small>
                  </label>
                </div>

                {uploadPreview.length > 0 && (
                  <div className="upload-preview">
                    <h3>Selected Images ({uploadPreview.length})</h3>
                    <div className="preview-grid">
                      {uploadPreview.map((img, index) => (
                        <div key={index} className="preview-item">
                          <img src={img.preview} alt={img.name} />
                          <p>{img.name}</p>
                        </div>
                      ))}
                    </div>
                    <button onClick={handleUpload} className="upload-btn">
                      <i className="fas fa-cloud-upload-alt"></i> Upload to
                      MongoDB
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* Gallery Section */}
            {activeTab === "gallery" && (
              <section className="gallery-management-section">
                <div className="section-header">
                  <h2>
                    <i className="fas fa-images"></i> Current Gallery (
                    {galleryImages.length} images)
                  </h2>
                </div>

                <div className="admin-gallery-grid">
                  {galleryImages.map((item, index) => (
                    <div key={item._id || index} className="admin-gallery-item">
                      <img src={item.imageUrl} alt={item.title} />
                      <div className="image-overlay">
                        <button
                          onClick={() => confirmDelete(item)}
                          className="delete-btn"
                          title="Delete this image"
                        >
                          <i className="fas fa-trash-alt"></i> Delete
                        </button>
                      </div>
                      <div className="image-info">
                        <div className="image-name">{item.title}</div>
                        {item.description && (
                          <div className="image-desc">{item.description}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Reviews Management Section */}
            {activeTab === "reviews" && (
              <section className="reviews-management-section">
                <div className="section-header">
                  <h2>
                    <i className="fas fa-star"></i> Customer Reviews Management
                  </h2>
                  <div className="reviews-filter">
                    <button
                      className={`filter-btn ${
                        reviewFilter === "all" ? "active" : ""
                      }`}
                      onClick={() => setReviewFilter("all")}
                    >
                      All ({reviews.length})
                    </button>
                    <button
                      className={`filter-btn pending ${
                        reviewFilter === "pending" ? "active" : ""
                      }`}
                      onClick={() => setReviewFilter("pending")}
                    >
                      Pending (
                      {reviews.filter((r) => r.status === "pending").length})
                    </button>
                    <button
                      className={`filter-btn approved ${
                        reviewFilter === "approved" ? "active" : ""
                      }`}
                      onClick={() => setReviewFilter("approved")}
                    >
                      Approved (
                      {reviews.filter((r) => r.status === "approved").length})
                    </button>
                    <button
                      className={`filter-btn rejected ${
                        reviewFilter === "rejected" ? "active" : ""
                      }`}
                      onClick={() => setReviewFilter("rejected")}
                    >
                      Rejected (
                      {reviews.filter((r) => r.status === "rejected").length})
                    </button>
                  </div>
                </div>

                <div className="reviews-list">
                  {reviews
                    .filter(
                      (review) =>
                        reviewFilter === "all" || review.status === reviewFilter
                    )
                    .map((review) => (
                      <div
                        key={review._id}
                        className={`review-card ${review.status}`}
                      >
                        <div className="review-header">
                          <div className="review-customer-info">
                            <h3>
                              <i className="fas fa-user"></i>{" "}
                              {review.customerName}
                            </h3>
                            {review.email && (
                              <p className="review-email">{review.email}</p>
                            )}
                          </div>
                          <div className="review-meta">
                            <div className="review-rating">
                              {[...Array(5)].map((_, i) => (
                                <i
                                  key={i}
                                  className={`fas fa-star ${
                                    i < review.rating ? "filled" : ""
                                  }`}
                                ></i>
                              ))}
                              <span className="rating-number">
                                ({review.rating}/5)
                              </span>
                            </div>
                            <span className={`status-badge ${review.status}`}>
                              {review.status === "pending" && (
                                <i className="fas fa-clock"></i>
                              )}
                              {review.status === "approved" && (
                                <i className="fas fa-check-circle"></i>
                              )}
                              {review.status === "rejected" && (
                                <i className="fas fa-times-circle"></i>
                              )}
                              {review.status.charAt(0).toUpperCase() +
                                review.status.slice(1)}
                            </span>
                          </div>
                        </div>

                        <div className="review-content">
                          <p>{review.comment}</p>
                        </div>

                        <div className="review-footer">
                          <div className="review-date">
                            <i className="fas fa-calendar"></i>
                            {new Date(review.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </div>
                          <div className="review-actions">
                            {review.status === "pending" && (
                              <>
                                <button
                                  onClick={() => {
                                    setReviewToApprove(review);
                                    setShowReviewApproveModal(true);
                                  }}
                                  className="action-btn approve-btn"
                                  title="Approve this review"
                                >
                                  <i className="fas fa-check"></i> Approve
                                </button>
                                <button
                                  onClick={() => {
                                    setReviewToReject(review);
                                    setShowReviewRejectModal(true);
                                  }}
                                  className="action-btn reject-btn"
                                  title="Reject this review"
                                >
                                  <i className="fas fa-times"></i> Reject
                                </button>
                              </>
                            )}
                            {review.status === "approved" && (
                              <button
                                onClick={() => {
                                  setReviewToReject(review);
                                  setShowReviewRejectModal(true);
                                }}
                                className="action-btn reject-btn"
                                title="Reject this review"
                              >
                                <i className="fas fa-times"></i> Reject
                              </button>
                            )}
                            {review.status === "rejected" && (
                              <button
                                onClick={() => {
                                  setReviewToApprove(review);
                                  setShowReviewApproveModal(true);
                                }}
                                className="action-btn approve-btn"
                                title="Approve this review"
                              >
                                <i className="fas fa-check"></i> Approve
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setReviewToDelete(review);
                                setShowReviewDeleteModal(true);
                              }}
                              className="action-btn delete-btn"
                              title="Delete this review"
                            >
                              <i className="fas fa-trash"></i> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {reviews.filter(
                    (review) =>
                      reviewFilter === "all" || review.status === reviewFilter
                  ).length === 0 && (
                    <div className="no-reviews">
                      <i className="fas fa-inbox"></i>
                      <p>
                        No {reviewFilter !== "all" ? reviewFilter : ""} reviews
                        found
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>
              <i className="fas fa-exclamation-triangle"></i> Confirm Delete
            </h3>
            <p>Are you sure you want to delete this image?</p>
            <div className="modal-preview">
              <img
                src={imageToDelete?.imageUrl}
                alt={imageToDelete?.title || "Delete preview"}
              />
              <p className="modal-image-title">{imageToDelete?.title}</p>
            </div>
            <div className="modal-actions">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="confirm-delete-btn">
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Approve Modal */}
      {showReviewApproveModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowReviewApproveModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>
              <i className="fas fa-check-circle"></i> Approve Review
            </h3>
            <p>Are you sure you want to approve this review?</p>
            <div className="review-modal-preview">
              <div className="modal-review-rating">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-star ${
                      i < (reviewToApprove?.rating || 0) ? "filled" : ""
                    }`}
                  ></i>
                ))}
              </div>
              <p className="modal-customer-name">
                <strong>{reviewToApprove?.customerName}</strong>
              </p>
              <p className="modal-review-comment">
                "{reviewToApprove?.comment}"
              </p>
            </div>
            <div className="modal-actions">
              <button
                onClick={() => setShowReviewApproveModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                onClick={handleApproveReview}
                className="confirm-approve-btn"
              >
                <i className="fas fa-check"></i> Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Reject Modal */}
      {showReviewRejectModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowReviewRejectModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>
              <i className="fas fa-times-circle"></i> Reject Review
            </h3>
            <p>Are you sure you want to reject this review?</p>
            <div className="review-modal-preview">
              <div className="modal-review-rating">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-star ${
                      i < (reviewToReject?.rating || 0) ? "filled" : ""
                    }`}
                  ></i>
                ))}
              </div>
              <p className="modal-customer-name">
                <strong>{reviewToReject?.customerName}</strong>
              </p>
              <p className="modal-review-comment">
                "{reviewToReject?.comment}"
              </p>
            </div>
            <div className="modal-actions">
              <button
                onClick={() => setShowReviewRejectModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectReview}
                className="confirm-reject-btn"
              >
                <i className="fas fa-times"></i> Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Delete Modal */}
      {showReviewDeleteModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowReviewDeleteModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>
              <i className="fas fa-exclamation-triangle"></i> Delete Review
            </h3>
            <p>Are you sure you want to permanently delete this review?</p>
            <div className="review-modal-preview">
              <div className="modal-review-rating">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-star ${
                      i < (reviewToDelete?.rating || 0) ? "filled" : ""
                    }`}
                  ></i>
                ))}
              </div>
              <p className="modal-customer-name">
                <strong>{reviewToDelete?.customerName}</strong>
              </p>
              <p className="modal-review-comment">
                "{reviewToDelete?.comment}"
              </p>
            </div>
            <div className="modal-actions">
              <button
                onClick={() => setShowReviewDeleteModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteReview}
                className="confirm-delete-btn"
              >
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
