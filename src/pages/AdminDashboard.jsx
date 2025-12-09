import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const { isAuthenticated, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadPreview, setUploadPreview] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    // Load current gallery images
    loadGalleryImages();
  }, []);

  const loadGalleryImages = () => {
    // These are your current images from Gallery.jsx
    const images = [
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.17.43_a4171453.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.17.46_0004418b.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.17.55_09a81adc.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.26_1547c4f5.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.27_017033fe.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.27_4463cc63.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.28_1f34e652.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.30_f3535412.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.33_59300c4f.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.34_0acf7e8a.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.34_2539351d.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.34_ad05c003.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.35_3ef47f81.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.35_d010dabc.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.36_4442f8d0.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.36_6a1e356e.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.36_ae4d6ee3.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.36_ecad1288.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.37_2a1d9045.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.37_48f2a5de.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.38_cb9c6140.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.38_e33d1f60.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.38_e8af61d7.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.39_44adaac4.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.44_107aaa12.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.44_c84fa95f.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.45_0e35886f.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.45_40e7b95e.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.45_4ff5a07c.jpg",
      "/Photo/Gallery Photos/WhatsApp Image 2025-11-18 at 11.18.45_8d9e7aa9.jpg",
    ];
    setGalleryImages(images);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));
    setUploadPreview(previews);
  };

  const handleUpload = () => {
    if (uploadPreview.length === 0) {
      alert('Please select images to upload');
      return;
    }

    // Generate the code to add to Gallery.jsx
    const codeSnippet = uploadPreview.map(img => `  "/Photo/Gallery Photos/${img.name}",`).join('\n');

    // Copy to clipboard
    navigator.clipboard.writeText(codeSnippet).then(() => {
      alert(
        `✅ SUCCESS! Code copied to clipboard!\n\n` +
        `📋 NEXT STEPS:\n\n` +
        `1. The image paths have been copied to your clipboard\n\n` +
        `2. Manually copy your ${uploadPreview.length} image(s) to:\n` +
        `   C:\\Users\\miche\\Desktop\\Kamuta Ltd\\Michel-s-Catering\\public\\Photo\\Gallery Photos\\\n\n` +
        `3. Open: src/components/Gallery.jsx\n\n` +
        `4. Find the "galleryImages" array and paste the copied paths\n\n` +
        `5. Save Gallery.jsx and refresh your browser\n\n` +
        `💡 TIP: I'll also download these images with a special naming system to help you!`
      );

      // Trigger download for each image
      uploadPreview.forEach((img, index) => {
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = img.preview;
          link.download = img.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, index * 200); // Stagger downloads
      });
    }).catch(() => {
      // Fallback if clipboard fails
      alert(
        `📋 UPLOAD INSTRUCTIONS:\n\n` +
        `1. Copy your ${uploadPreview.length} image(s) to:\n` +
        `   C:\\Users\\miche\\Desktop\\Kamuta Ltd\\Michel-s-Catering\\public\\Photo\\Gallery Photos\\\n\n` +
        `2. Add these paths to src/components/Gallery.jsx:\n\n` +
        codeSnippet +
        `\n\n3. Save and refresh the website\n\n` +
        `Images will download automatically - move them to the Gallery Photos folder!`
      );

      // Still trigger downloads
      uploadPreview.forEach((img, index) => {
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = img.preview;
          link.download = img.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, index * 200);
      });
    });

    // Clear preview after a delay
    setTimeout(() => {
      uploadPreview.forEach(img => URL.revokeObjectURL(img.preview));
      setUploadPreview([]);
    }, uploadPreview.length * 200 + 500);
  };

  const confirmDelete = (imagePath) => {
    setImageToDelete(imagePath);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (!imageToDelete) return;

    const fileName = imageToDelete.split('/').pop();
    
    alert(
      `🗑️ DELETE INSTRUCTIONS:\n\n` +
      `1. Remove this line from Gallery.jsx:\n` +
      `   "${imageToDelete}",\n\n` +
      `2. Delete this file from your computer:\n` +
      `   public/Photo/Gallery Photos/${fileName}\n\n` +
      `3. Refresh to see changes`
    );

    // Remove from display
    setGalleryImages(galleryImages.filter(img => img !== imageToDelete));
    setShowDeleteModal(false);
    setImageToDelete(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
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
          <h1><i className="fas fa-images"></i> Gallery Manager</h1>
          <div className="admin-actions">
            <button onClick={() => navigate('/')} className="view-site-btn">
              <i className="fas fa-external-link-alt"></i> View Website
            </button>
            <button onClick={handleLogout} className="logout-btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-container">
          
          {/* Upload Section */}
          <section className="upload-section">
            <h2><i className="fas fa-cloud-upload-alt"></i> Upload New Images</h2>
            
            <div className="info-box">
              <i className="fas fa-info-circle"></i>
              <div className="info-content">
                <strong>How uploading works:</strong>
                <p>Since this is a static website, you need to manually move files. This tool will help by:</p>
                <ol>
                  <li>Downloading your selected images to your Downloads folder</li>
                  <li>Copying the required code to your clipboard</li>
                  <li>You then move the images and paste the code into Gallery.jsx</li>
                </ol>
              </div>
            </div>

            <div className="upload-area">
              <input
                type="file"
                id="file-input"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
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
                  <i className="fas fa-download"></i> Download Images & Copy Code
                </button>
              </div>
            )}
          </section>

          {/* Gallery Section */}
          <section className="gallery-management-section">
            <div className="section-header">
              <h2><i className="fas fa-images"></i> Current Gallery ({galleryImages.length} images)</h2>
            </div>
            
            <div className="admin-gallery-grid">
              {galleryImages.map((image, index) => (
                <div key={index} className="admin-gallery-item">
                  <img src={image} alt={`Gallery ${index + 1}`} />
                  <div className="image-overlay">
                    <button
                      onClick={() => confirmDelete(image)}
                      className="delete-btn"
                      title="Delete this image"
                    >
                      <i className="fas fa-trash-alt"></i> Delete
                    </button>
                  </div>
                  <div className="image-name">
                    {image.split('/').pop()}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3><i className="fas fa-exclamation-triangle"></i> Confirm Delete</h3>
            <p>Are you sure you want to delete this image?</p>
            <div className="modal-preview">
              <img src={imageToDelete} alt="Delete preview" />
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteModal(false)} className="cancel-btn">
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
