import type { Review } from "../../types/categories";

interface ProductReviewsProps {
    rating: number;
    reviews: Review[];
}

export const ProductReviews = ({ rating, reviews }: ProductReviewsProps) => {
    const getFormattedDate = function (date: string) {
        return (new Date(date)).toLocaleString();
    };

    return (
        <>
            <div className="reviews-container">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="oklch(65% 0.15 75)"><path d="M10 1.5l2.6 5.55 6.1.72-4.5 4.2 1.2 6.03L10 14.9l-5.4 3.1 1.2-6.03-4.5-4.2 6.1-.72z"></path></svg>
                <span className="star-rating">{rating} </span>
                <span className="based-on-reviews"> Based on {reviews.length} reviews</span>
            </div>
            <>
                {reviews.map((review, index) =>
                    <div key={index} className="review-box">
                        <div className="review-title-holder">
                            <span className="reviewer-name">{review.reviewerName}</span>
                            <span className="custom-date">{getFormattedDate(review.date)}</span>
                        </div>
                        <div className="review-comment">
                            {review.comment}
                        </div>
                    </div>
                )}
            </>
        </>
    );
};
