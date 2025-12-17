import React, { useState, useEffect } from "react";
import { galleryAPI } from "../services/api";

const Gallery = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGalleryImages();
  }, []);

  const loadGalleryImages = async () => {
    try {
      const response = await galleryAPI.getAll();
      if (response.success) {
        // Filter only active images
        const activeImages = response.data.filter((item) => item.isActive);
        setGalleryImages(activeImages);
      }
    } catch (error) {
      console.error("Error loading gallery:", error);
      // Fallback to static images if API fails
      const fallbackImages = [
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
      ].map((url, index) => ({
        imageUrl: url,
        title: `Gallery ${index + 1}`,
        _id: index,
      }));
      setGalleryImages(fallbackImages);
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (item) => {
    setSelectedImage(item);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <section className="gallery-section gallery-overlay-section" id="gallery">
      <div className="gallery-header">
        <div className="section-title">
          <h2>Our Gallery</h2>
          <p>Explore our catering services and memorable events</p>
        </div>
        <button className="close-gallery-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="gallery-grid">
        {loading ? (
          <div className="loading-gallery">Loading gallery...</div>
        ) : galleryImages.length > 0 ? (
          galleryImages.map((item, index) => (
            <div
              key={item._id || index}
              className="gallery-item"
              onClick={() => openLightbox(item)}
            >
              <img
                src={item.imageUrl}
                alt={item.title || `Gallery ${index + 1}`}
              />
              <div className="gallery-overlay">
                <i className="fas fa-search-plus"></i>
              </div>
            </div>
          ))
        ) : (
          <div className="no-images">No images in gallery yet</div>
        )}
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content">
            <span className="close-lightbox">&times;</span>
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title || "Full view"}
            />
            {selectedImage.title && (
              <div className="lightbox-title">{selectedImage.title}</div>
            )}
            {selectedImage.description && (
              <div className="lightbox-description">
                {selectedImage.description}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
