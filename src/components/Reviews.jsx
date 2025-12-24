import React, { useState, useEffect } from "react";
import { reviewsAPI } from "../services/api";

const Reviews = () => {
  // State for reviews from MongoDB
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
  });

  // Load approved reviews from MongoDB on component mount
  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const response = await reviewsAPI.getAll();
      if (response.success) {
        // API returns only approved reviews for public view
        setReviews(response.data);
      }
    } catch (error) {
      console.error("Error loading reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const reviewData = {
        customerName: formData.name,
        email: formData.email,
        rating: parseInt(formData.rating),
        comment: formData.comment,
      };

      const response = await reviewsAPI.create(reviewData);

      if (response.success) {
        // Reset form
        setFormData({
          name: "",
          email: "",
          rating: 5,
          comment: "",
        });

        setShowForm(false);

        // Show success message
        alert(
          "✅ Thank you for your review! Your review has been submitted and is pending admin approval. Once approved, it will be visible on this page."
        );
      } else {
        alert("❌ Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(
        "❌ An error occurred while submitting your review. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
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
    if (reviews.length === 0) return "0.0";
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <section id="reviews" className="reviews-section">
      <div className="section-title">
        <h2>Client Reviews</h2>
        <p>See what our satisfied customers have to say about us</p>
      </div>

      <div className="reviews-container">
        {/* Reviews Summary */}
        <div className="reviews-summary">
          <div className="average-rating">
            <div className="rating-number">{calculateAverageRating()}</div>
            <div className="rating-stars">
              {renderStars(Math.round(parseFloat(calculateAverageRating())))}
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
                      <i
                        className="fas fa-star"
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                        style={{
                          color:
                            parseInt(formData.rating) >= star
                              ? "#f39c12"
                              : "#ddd",
                          cursor: "pointer",
                        }}
                      ></i>
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
          {loading ? (
            <div className="loading-reviews">
              <i className="fas fa-spinner fa-spin"></i>
              <p>Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="no-reviews-yet">
              <i className="fas fa-comments"></i>
              <h3>No reviews yet</h3>
              <p>Be the first to share your experience with Kamuta Ltd!</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.customerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4>{review.customerName}</h4>
                      <div className="review-meta">
                        <span className="review-date">
                          {new Date(review.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                        <span className="verified-badge">
                          <i className="fas fa-check-circle"></i> Verified
                        </span>
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
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
