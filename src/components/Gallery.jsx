import React, { useState } from "react";

const Gallery = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
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

  const openLightbox = (image) => {
    setSelectedImage(image);
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
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => openLightbox(image)}
          >
            <img src={image} alt={`Gallery ${index + 1}`} />
            <div className="gallery-overlay">
              <i className="fas fa-search-plus"></i>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content">
            <span className="close-lightbox">&times;</span>
            <img src={selectedImage} alt="Full view" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
