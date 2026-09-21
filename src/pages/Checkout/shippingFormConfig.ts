import type { FieldConfig } from '../../components/ConfigForm/ConfigForm';
import { email, pattern } from '../../components/ConfigForm/validators';

export const shippingFormFields: FieldConfig[] = [
    { name: 'fullName', label: 'Full Name', placeholder: 'Jordan Rivera' },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'jordan@example.com',
        validate: email(),
    },
    { name: 'address', label: 'Address', placeholder: '123 Market Street' },
    {
        name: 'apartment',
        label: 'Apartment, suite, etc. (optional)',
        placeholder: '',
        optional: true,
    },
    { name: 'city', label: 'City', placeholder: 'Austin', row: 'location' },
    { name: 'state', label: 'State', placeholder: 'TX', row: 'location' },
    {
        name: 'pinCode',
        label: 'PIN Code',
        placeholder: '78701',
        row: 'location',
        validate: pattern(/^\d{4,6}$/, 'Enter a valid PIN code'),
    },
    {
        name: 'phone',
        label: 'Phone',
        type: 'tel',
        placeholder: '512-555-0148',
        validate: pattern(/^[0-9+()\- ]{7,15}$/, 'Enter a valid phone number'),
    },
];
