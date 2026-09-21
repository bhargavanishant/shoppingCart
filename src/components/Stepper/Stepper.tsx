import './Stepper.css';

export type StepConfig = {
    label: string;
};

type StepperProps = {
    steps: StepConfig[];
    currentStep: number;
    onStepClick?: (stepNumber: number) => void;
};

export default function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
    return (
        <ul className="stepper">
            {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isComplete = stepNumber < currentStep;
                const isClickable = isComplete && !!onStepClick;

                return (
                    <li
                        className={`stepper-item${isActive ? ' active' : ''}${isComplete ? ' complete' : ''}${isClickable ? ' clickable' : ''}`}
                        key={step.label}
                        onClick={isClickable ? () => onStepClick(stepNumber) : undefined}
                        role={isClickable ? 'button' : undefined}
                        tabIndex={isClickable ? 0 : undefined}
                        onKeyDown={isClickable ? (event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                onStepClick(stepNumber);
                            }
                        } : undefined}
                    >
                        <span className="stepper-circle">{stepNumber}</span>
                        <span className="stepper-label">{step.label}</span>
                    </li>
                );
            })}
        </ul>
    );
}
