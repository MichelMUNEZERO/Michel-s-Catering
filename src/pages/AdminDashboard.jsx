import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { galleryAPI } from "../services/api";
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

  // State for modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  useEffect(() => {
    // Load gallery images from MongoDB
    loadGalleryImages();
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
                    <div className="stat-icon">
                      <i className="fas fa-images"></i>
                    </div>
                    <div className="stat-info">
                      <h3>{galleryImages.length}</h3>
                      <p>Gallery Images</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-eye"></i>
                    </div>
                    <div className="stat-info">
                      <h3>Active</h3>
                      <p>Gallery Status</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-user-shield"></i>
                    </div>
                    <div className="stat-info">
                      <h3>{user?.username || "Admin"}</h3>
                      <p>Logged In</p>
                    </div>
                  </div>
                </div>
                <div className="info-box">
                  <i className="fas fa-lightbulb"></i>
                  <div className="info-content">
                    <strong>Welcome to Gallery Manager!</strong>
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
    </div>
  );
};

export default AdminDashboard;
