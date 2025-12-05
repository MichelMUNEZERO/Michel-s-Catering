import React, { useState, useEffect } from "react";

const Reviews = () => {
  // Initial verified reviews
  const initialReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2024-11-15",
      comment:
        "Absolutely amazing service! The food was delicious and the presentation was stunning. Kamuta Ltd made our wedding day perfect!",
      verified: true,
    },
    {
      id: 2,
      name: "David Mugisha",
      rating: 5,
      date: "2024-11-10",
      comment:
        "Professional team and exceptional quality. They catered our corporate event and everyone was impressed with the food and service.",
      verified: true,
    },
    {
      id: 3,
      name: "Grace Uwase",
      rating: 4,
      date: "2024-11-05",
      comment:
        "Great experience overall! The food was delicious and the staff was very friendly. Highly recommend for any event.",
      verified: true,
    },
    {
      id: 4,
      name: "Jean Pierre Nsengiyumva",
      rating: 5,
      date: "2024-10-28",
      comment:
        "Outstanding catering service! They handled our family gathering with such care and attention to detail. The traditional Rwandan dishes were authentic and delicious.",
      verified: true,
    },
  ];

  // Load reviews from localStorage or use initial reviews
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("kamutaReviews");
    if (savedReviews) {
      return JSON.parse(savedReviews);
    }
    return initialReviews;
  });

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("kamutaReviews", JSON.stringify(reviews));
  }, [reviews]);

  const [showForm, setShowForm] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
  });
  useEffect(() => {
    const handleKeyPress = async (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        const password = prompt("Enter admin password:");
        if (password) {
          // Hash the entered password using SHA-256
          const encoder = new TextEncoder();
          const data = encoder.encode(password);
          const hashBuffer = await crypto.subtle.digest("SHA-256", data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");

          const correctHash =
            "ab1cccc5709519d17c02d540a76026b4b4a5b3af817f9e0f16ed6f1571fdafa9";

          if (hashHex === correctHash) {
            setAdminMode(!adminMode);
            alert(
              adminMode
                ? "Admin mode disabled"
                : "Admin mode enabled! You can now approve or delete reviews."
            );
          } else {
            alert("Incorrect password");
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [adminMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      const newReview = {
        id: reviews.length + 1,
        name: formData.name,
        rating: parseInt(formData.rating),
        date: new Date().toISOString().split("T")[0],
        comment: formData.comment,
        verified: false,
      };

      setReviews([newReview, ...reviews]);

      // Reset form
      setFormData({
        name: "",
        email: "",
        rating: 5,
        comment: "",
      });

      setShowForm(false);
      setIsSubmitting(false);

      // Show success message
      alert(
        "Thank you for your review! Your review has been submitted and is pending verification."
      );
    }, 500);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <i
        key={index}
        className={`fas fa-star ${
          index < rating ? "filled-star" : "empty-star"
        }`}
      ></i>
    ));
  };

  const calculateAverageRating = () => {
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const handleApproveReview = (reviewId) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId ? { ...review, verified: true } : review
      )
    );
    alert("Review approved!");
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter((review) => review.id !== reviewId));
      alert("Review deleted!");
    }
  };

  return (
    <section id="reviews" className="reviews-section">
      <div className="section-title">
        <h2>Client Reviews</h2>
        <p>See what our satisfied customers have to say about us</p>
        {adminMode && (
          <div className="admin-indicator">
            <i className="fas fa-shield-alt"></i> Admin Mode Active
          </div>
        )}
      </div>

      <div className="reviews-container">
        {/* Reviews Summary */}
        <div className="reviews-summary">
          <div className="average-rating">
            <div className="rating-number">{calculateAverageRating()}</div>
            <div className="rating-stars">
              {renderStars(Math.round(calculateAverageRating()))}
            </div>
            <div className="rating-text">Based on {reviews.length} reviews</div>
          </div>
          <button
            className="write-review-btn cta-button"
            onClick={() => setShowForm(!showForm)}
          >
            <i className="fas fa-pen"></i>
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="review-form-container">
            <h3>Share Your Experience</h3>
            <form onSubmit={handleSubmit} className="review-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="rating">Rating *</label>
                <div className="rating-input">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <label key={star} className="star-label">
                      <input
                        type="radio"
                        name="rating"
                        value={star}
                        checked={parseInt(formData.rating) === star}
                        onChange={handleInputChange}
                      />
                      <i className="fas fa-star"></i>
                    </label>
                  ))}
                </div>
                <small>
                  Selected: {formData.rating} star
                  {formData.rating > 1 ? "s" : ""}
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="comment">Your Review *</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us about your experience with Kamuta Ltd..."
                  rows="5"
                ></textarea>
              </div>

              <button
                type="submit"
                className="cta-button submit-review-btn"
                disabled={isSubmitting}
              >
                <i
                  className={
                    isSubmitting
                      ? "fas fa-spinner fa-spin"
                      : "fas fa-paper-plane"
                  }
                ></i>
                {isSubmitting ? " Submitting..." : " Submit Review"}
              </button>
            </form>
          </div>
        )}

        {/* Reviews List */}
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4>{review.name}</h4>
                    <div className="review-meta">
                      <span className="review-date">
                        {new Date(review.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      {review.verified ? (
                        <span className="verified-badge">
                          <i className="fas fa-check-circle"></i> Verified
                        </span>
                      ) : (
                        <span className="pending-badge">
                          <i className="fas fa-clock"></i> Pending Verification
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
              </div>
              <div className="review-content">
                <p>{review.comment}</p>
              </div>
              {adminMode && (
                <div className="admin-actions">
                  {!review.verified && (
                    <button
                      className="approve-btn"
                      onClick={() => handleApproveReview(review.id)}
                    >
                      <i className="fas fa-check"></i> Approve
                    </button>
                  )}
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
