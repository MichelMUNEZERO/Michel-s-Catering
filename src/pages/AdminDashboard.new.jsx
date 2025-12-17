import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { dashboardAPI, galleryAPI, reviewsAPI } from "../services/api";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const { isAuthenticated, logout, isLoading, user } = useAuth();
  const navigate = useNavigate();

  // Navigation state
  const [activeTab, setActiveTab] = useState("overview");

  // Dashboard stats
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  // Gallery management
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    category: "other",
  });

  // Reviews management
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewFilter, setReviewFilter] = useState("all");

  // Modals
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Messages
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardStats();
      loadGalleryItems();
      loadReviews();
    }
  }, [isAuthenticated]);

  // Load dashboard statistics
  const loadDashboardStats = async () => {
    try {
      setLoadingStats(true);
      const response = await dashboardAPI.getStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      showMessage("error", "Failed to load dashboard statistics");
    } finally {
      setLoadingStats(false);
    }
  };

  // Load gallery items
  const loadGalleryItems = async () => {
    try {
      const response = await galleryAPI.getAll();
      if (response.success) {
        setGalleryItems(response.data);
      }
    } catch (error) {
      showMessage("error", "Failed to load gallery items");
    }
  };

  // Load reviews
  const loadReviews = async () => {
    try {
      const response = await reviewsAPI.getAllAdmin();
      if (response.success) {
        setReviews(response.data);
      }
    } catch (error) {
      showMessage("error", "Failed to load reviews");
    }
  };

  // Handle file selection for upload
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle gallery upload
  const handleGalleryUpload = async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("gallery-file-input");
    const file = fileInput.files[0];

    if (!file) {
      showMessage("error", "Please select an image");
      return;
    }

    if (!uploadData.title) {
      showMessage("error", "Please enter a title");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", uploadData.title);
      formData.append("description", uploadData.description);
      formData.append("category", uploadData.category);

      const response = await galleryAPI.create(formData);
      if (response.success) {
        showMessage("success", "Gallery item uploaded successfully!");
        setShowGalleryModal(false);
        setUploadPreview(null);
        setUploadData({ title: "", description: "", category: "other" });
        loadGalleryItems();
        loadDashboardStats();
      }
    } catch (error) {
      showMessage("error", error.message || "Failed to upload image");
    }
  };

  // Handle gallery item update
  const handleGalleryUpdate = async (id, data) => {
    try {
      const response = await galleryAPI.update(id, data);
      if (response.success) {
        showMessage("success", "Gallery item updated successfully!");
        loadGalleryItems();
        setSelectedGalleryItem(null);
      }
    } catch (error) {
      showMessage("error", error.message || "Failed to update gallery item");
    }
  };

  // Handle gallery item delete
  const handleGalleryDelete = async (id) => {
    try {
      const response = await galleryAPI.delete(id);
      if (response.success) {
        showMessage("success", "Gallery item deleted successfully!");
        setShowDeleteModal(false);
        setItemToDelete(null);
        loadGalleryItems();
        loadDashboardStats();
      }
    } catch (error) {
      showMessage("error", error.message || "Failed to delete gallery item");
    }
  };

  // Handle review approval
  const handleReviewApprove = async (id) => {
    try {
      const response = await reviewsAPI.approve(id);
      if (response.success) {
        showMessage("success", "Review approved successfully!");
        loadReviews();
        loadDashboardStats();
      }
    } catch (error) {
      showMessage("error", error.message || "Failed to approve review");
    }
  };

  // Handle review rejection
  const handleReviewReject = async (id) => {
    try {
      const response = await reviewsAPI.reject(id);
      if (response.success) {
        showMessage("success", "Review rejected successfully!");
        loadReviews();
        loadDashboardStats();
      }
    } catch (error) {
      showMessage("error", error.message || "Failed to reject review");
    }
  };

  // Handle review delete
  const handleReviewDelete = async (id) => {
    try {
      const response = await reviewsAPI.delete(id);
      if (response.success) {
        showMessage("success", "Review deleted successfully!");
        setShowDeleteModal(false);
        setItemToDelete(null);
        loadReviews();
        loadDashboardStats();
      }
    } catch (error) {
      showMessage("error", error.message || "Failed to delete review");
    }
  };

  // Show message
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // Confirm delete
  const confirmDelete = (type, item) => {
    setItemToDelete({ type, item });
    setShowDeleteModal(true);
  };

  // Filter reviews
  const filteredReviews =
    reviewFilter === "all"
      ? reviews
      : reviews.filter((r) => r.status === reviewFilter);

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i key={i} className={`fas fa-star ${i < rating ? "filled" : ""}`} />
    ));
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>
            <i className="fas fa-tachometer-alt"></i> Admin Dashboard
          </h1>
          <div className="admin-user-info">
            <span>
              <i className="fas fa-user-circle"></i> {user?.username || "Admin"}
            </span>
            <button onClick={handleLogout} className="logout-btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Message Alert */}
      {message.text && (
        <div className={`alert alert-${message.type}`}>
          <i
            className={`fas fa-${
              message.type === "success" ? "check-circle" : "exclamation-circle"
            }`}
          ></i>
          {message.text}
        </div>
      )}

      <div className="admin-layout">
        {/* Sidebar Navigation */}
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <button
              className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <i className="fas fa-chart-line"></i> Overview
            </button>
            <button
              className={`nav-item ${activeTab === "gallery" ? "active" : ""}`}
              onClick={() => setActiveTab("gallery")}
            >
              <i className="fas fa-images"></i> Gallery Management
            </button>
            <button
              className={`nav-item ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              <i className="fas fa-star"></i> Reviews Management
            </button>
            <button className="nav-item" onClick={() => navigate("/")}>
              <i className="fas fa-external-link-alt"></i> View Website
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="overview-section">
              <h2>Dashboard Overview</h2>

              {loadingStats ? (
                <p>Loading statistics...</p>
              ) : stats ? (
                <>
                  {/* Statistics Cards */}
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon gallery">
                        <i className="fas fa-images"></i>
                      </div>
                      <div className="stat-info">
                        <h3>{stats.gallery.total}</h3>
                        <p>Total Gallery Items</p>
                        <small>{stats.gallery.active} active</small>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon reviews">
                        <i className="fas fa-star"></i>
                      </div>
                      <div className="stat-info">
                        <h3>{stats.reviews.total}</h3>
                        <p>Total Reviews</p>
                        <small>Avg: {stats.reviews.averageRating}★</small>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon pending">
                        <i className="fas fa-clock"></i>
                      </div>
                      <div className="stat-info">
                        <h3>{stats.reviews.pending}</h3>
                        <p>Pending Reviews</p>
                        <small>Awaiting approval</small>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon approved">
                        <i className="fas fa-check-circle"></i>
                      </div>
                      <div className="stat-info">
                        <h3>{stats.reviews.approved}</h3>
                        <p>Approved Reviews</p>
                        <small>Publicly visible</small>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon rejected">
                        <i className="fas fa-times-circle"></i>
                      </div>
                      <div className="stat-info">
                        <h3>{stats.reviews.rejected}</h3>
                        <p>Rejected Reviews</p>
                        <small>Not displayed</small>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="recent-activity">
                    <h3>
                      <i className="fas fa-history"></i> Recent Activity
                    </h3>

                    {stats.recent.reviews.length > 0 && (
                      <div className="activity-section">
                        <h4>Recent Reviews</h4>
                        <div className="activity-list">
                          {stats.recent.reviews.map((review) => (
                            <div key={review._id} className="activity-item">
                              <div className="activity-icon">
                                <i className="fas fa-star"></i>
                              </div>
                              <div className="activity-info">
                                <p>
                                  <strong>{review.customerName}</strong> -{" "}
                                  {review.rating}★
                                </p>
                                <span
                                  className={`status-badge ${review.status}`}
                                >
                                  {review.status}
                                </span>
                                <small>
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString()}
                                </small>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {stats.recent.gallery.length > 0 && (
                      <div className="activity-section">
                        <h4>Recent Gallery Uploads</h4>
                        <div className="activity-list">
                          {stats.recent.gallery.map((item) => (
                            <div key={item._id} className="activity-item">
                              <div className="activity-icon">
                                <i className="fas fa-image"></i>
                              </div>
                              <div className="activity-info">
                                <p>
                                  <strong>{item.title}</strong>
                                </p>
                                <small>
                                  By {item.uploadedBy?.username || "Admin"} on{" "}
                                  {new Date(
                                    item.createdAt
                                  ).toLocaleDateString()}
                                </small>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <p>No statistics available</p>
              )}
            </div>
          )}

          {/* Gallery Management Tab */}
          {activeTab === "gallery" && (
            <div className="gallery-section">
              <div className="section-header">
                <h2>
                  <i className="fas fa-images"></i> Gallery Management
                </h2>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowGalleryModal(true)}
                >
                  <i className="fas fa-plus"></i> Upload New Image
                </button>
              </div>

              <div className="gallery-grid">
                {galleryItems.length === 0 ? (
                  <p>No gallery items yet. Upload your first image!</p>
                ) : (
                  galleryItems.map((item) => (
                    <div key={item._id} className="gallery-item">
                      <img src={item.imageUrl} alt={item.title} />
                      <div className="gallery-item-overlay">
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                        <div className="gallery-item-actions">
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => {
                              setSelectedGalleryItem(item);
                              handleGalleryUpdate(item._id, {
                                isActive: !item.isActive,
                              });
                            }}
                          >
                            <i
                              className={`fas fa-${
                                item.isActive ? "eye-slash" : "eye"
                              }`}
                            ></i>
                            {item.isActive ? " Hide" : " Show"}
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => confirmDelete("gallery", item)}
                          >
                            <i className="fas fa-trash"></i> Delete
                          </button>
                        </div>
                        <div className="gallery-item-meta">
                          <span
                            className={`badge ${
                              item.isActive ? "active" : "inactive"
                            }`}
                          >
                            {item.isActive ? "Active" : "Hidden"}
                          </span>
                          <span className="category-badge">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Reviews Management Tab */}
          {activeTab === "reviews" && (
            <div className="reviews-section">
              <div className="section-header">
                <h2>
                  <i className="fas fa-star"></i> Reviews Management
                </h2>
                <div className="filter-buttons">
                  <button
                    className={`btn btn-filter ${
                      reviewFilter === "all" ? "active" : ""
                    }`}
                    onClick={() => setReviewFilter("all")}
                  >
                    All ({reviews.length})
                  </button>
                  <button
                    className={`btn btn-filter ${
                      reviewFilter === "pending" ? "active" : ""
                    }`}
                    onClick={() => setReviewFilter("pending")}
                  >
                    Pending (
                    {reviews.filter((r) => r.status === "pending").length})
                  </button>
                  <button
                    className={`btn btn-filter ${
                      reviewFilter === "approved" ? "active" : ""
                    }`}
                    onClick={() => setReviewFilter("approved")}
                  >
                    Approved (
                    {reviews.filter((r) => r.status === "approved").length})
                  </button>
                  <button
                    className={`btn btn-filter ${
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
                {filteredReviews.length === 0 ? (
                  <p>No reviews found with this filter.</p>
                ) : (
                  filteredReviews.map((review) => (
                    <div
                      key={review._id}
                      className={`review-item status-${review.status}`}
                    >
                      <div className="review-header">
                        <div className="review-customer">
                          <i className="fas fa-user-circle"></i>
                          <div>
                            <h4>{review.customerName}</h4>
                            <div className="review-rating">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                        </div>
                        <span className={`status-badge ${review.status}`}>
                          {review.status.charAt(0).toUpperCase() +
                            review.status.slice(1)}
                        </span>
                      </div>

                      <p className="review-comment">{review.comment}</p>

                      <div className="review-meta">
                        <small>
                          <i className="fas fa-calendar"></i>{" "}
                          {new Date(review.createdAt).toLocaleString()}
                        </small>
                        {review.email && (
                          <small>
                            <i className="fas fa-envelope"></i> {review.email}
                          </small>
                        )}
                      </div>

                      <div className="review-actions">
                        {review.status === "pending" && (
                          <>
                            <button
                              className="btn btn-success"
                              onClick={() => handleReviewApprove(review._id)}
                            >
                              <i className="fas fa-check"></i> Approve
                            </button>
                            <button
                              className="btn btn-warning"
                              onClick={() => handleReviewReject(review._id)}
                            >
                              <i className="fas fa-times"></i> Reject
                            </button>
                          </>
                        )}
                        {review.status === "rejected" && (
                          <button
                            className="btn btn-success"
                            onClick={() => handleReviewApprove(review._id)}
                          >
                            <i className="fas fa-check"></i> Approve
                          </button>
                        )}
                        {review.status === "approved" && (
                          <button
                            className="btn btn-warning"
                            onClick={() => handleReviewReject(review._id)}
                          >
                            <i className="fas fa-times"></i> Reject
                          </button>
                        )}
                        <button
                          className="btn btn-danger"
                          onClick={() => confirmDelete("review", review)}
                        >
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Gallery Upload Modal */}
      {showGalleryModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowGalleryModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <i className="fas fa-upload"></i> Upload New Gallery Image
              </h3>
              <button
                onClick={() => setShowGalleryModal(false)}
                className="close-btn"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleGalleryUpload}>
              <div className="form-group">
                <label>
                  Image <span className="required">*</span>
                </label>
                <input
                  type="file"
                  id="gallery-file-input"
                  accept="image/*"
                  onChange={handleFileSelect}
                  required
                />
                {uploadPreview && (
                  <div className="upload-preview">
                    <img src={uploadPreview} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>
                  Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={uploadData.title}
                  onChange={(e) =>
                    setUploadData({ ...uploadData, title: e.target.value })
                  }
                  placeholder="Enter image title"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={uploadData.description}
                  onChange={(e) =>
                    setUploadData({
                      ...uploadData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter description (optional)"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={uploadData.category}
                  onChange={(e) =>
                    setUploadData({ ...uploadData, category: e.target.value })
                  }
                >
                  <option value="event">Event</option>
                  <option value="food">Food</option>
                  <option value="service">Service</option>
                  <option value="team">Team</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowGalleryModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-upload"></i> Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && itemToDelete && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="modal-content modal-confirm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>
                <i className="fas fa-exclamation-triangle"></i> Confirm Delete
              </h3>
            </div>

            <p>Are you sure you want to delete this {itemToDelete.type}?</p>
            {itemToDelete.type === "gallery" && (
              <div className="delete-preview">
                <img
                  src={itemToDelete.item.imageUrl}
                  alt={itemToDelete.item.title}
                />
                <p>
                  <strong>{itemToDelete.item.title}</strong>
                </p>
              </div>
            )}
            {itemToDelete.type === "review" && (
              <div className="delete-preview">
                <p>
                  <strong>{itemToDelete.item.customerName}</strong>
                </p>
                <p>{itemToDelete.item.comment}</p>
              </div>
            )}

            <div className="modal-actions">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (itemToDelete.type === "gallery") {
                    handleGalleryDelete(itemToDelete.item._id);
                  } else {
                    handleReviewDelete(itemToDelete.item._id);
                  }
                }}
                className="btn btn-danger"
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
