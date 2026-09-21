import './ReviewSummary.css';

export type ReviewSection = {
    title: string;
    lines: string[];
};

type ReviewSummaryProps = {
    sections: ReviewSection[];
    submitLabel: string;
    onSubmit: () => void;
};

export default function ReviewSummary({ sections, submitLabel, onSubmit }: ReviewSummaryProps) {
    return (
        <div className="review-summary">
            {sections.map((section) => (
                <div className="review-summary-card" key={section.title}>
                    <div className="review-summary-title">{section.title}</div>
                    {section.lines.filter(Boolean).map((line, index) => (
                        <div className="review-summary-line" key={index}>{line}</div>
                    ))}
                </div>
            ))}
            <button type="button" className="review-summary-submit" onClick={onSubmit}>
                {submitLabel}
            </button>
        </div>
    );
}
