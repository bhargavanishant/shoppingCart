import type { FieldConfig } from '../../components/ConfigForm/ConfigForm';
import { pattern } from '../../components/ConfigForm/validators';

const isCardPayment = (values: Record<string, string>) => values.paymentMethod === 'card';

export const paymentFormFields: FieldConfig[] = [
    {
        name: 'paymentMethod',
        label: 'Payment Method',
        type: 'radio-card',
        options: [
            { value: 'card', label: 'Credit / Debit Card' },
            { value: 'paypal', label: 'PayPal' },
            { value: 'wallet', label: 'Digital Wallet' },
        ],
    },
    {
        name: 'cardNumber',
        label: 'Card Number',
        placeholder: '1234 5678 9012 3456',
        showIf: isCardPayment,
        validate: pattern(/^[\d ]{13,19}$/, 'Enter a valid card number'),
    },
    {
        name: 'expiry',
        label: 'Expiry',
        placeholder: 'MM/YY',
        row: 'card-details',
        showIf: isCardPayment,
        validate: pattern(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use MM/YY format'),
    },
    {
        name: 'cvv',
        label: 'CVV',
        placeholder: '123',
        row: 'card-details',
        showIf: isCardPayment,
        validate: pattern(/^\d{3,4}$/, 'Enter a valid CVV'),
    },
];

export const defaultPaymentFormValues: Record<string, string> = {
    paymentMethod: 'card',
};

const paymentMethodField = paymentFormFields[0];

export const getPaymentMethodLabel = (value: string): string =>
    paymentMethodField.options?.find((option) => option.value === value)?.label ?? value;
