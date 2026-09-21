import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Validator } from './validators';
import './ConfigForm.css';

export type RadioOption = {
    value: string;
    label: string;
};

export type FieldConfig = {
    name: string;
    label: string;
    type?: 'text' | 'email' | 'tel' | 'radio-card';
    placeholder?: string;
    optional?: boolean;
    row?: string;
    validate?: Validator;
    options?: RadioOption[];
    showIf?: (values: Record<string, string>) => boolean;
};

type ConfigFormProps = {
    fields: FieldConfig[];
    initialValues?: Record<string, string>;
    submitLabel: string;
    onSubmit: (values: Record<string, string>) => void;
};

const groupFieldsByRow = (fields: FieldConfig[]): FieldConfig[][] => {
    const rows: FieldConfig[][] = [];
    const rowIndexByKey = new Map<string, number>();

    fields.forEach((field) => {
        if (field.row && rowIndexByKey.has(field.row)) {
            rows[rowIndexByKey.get(field.row) as number].push(field);
            return;
        }

        if (field.row) {
            rowIndexByKey.set(field.row, rows.length);
        }
        rows.push([field]);
    });

    return rows;
};

const buildInitialValues = (fields: FieldConfig[], initialValues: Record<string, string>) => {
    const values: Record<string, string> = {};
    fields.forEach((field) => {
        values[field.name] = initialValues[field.name] ?? '';
    });
    return values;
};

export default function ConfigForm({ fields, initialValues = {}, submitLabel, onSubmit }: ConfigFormProps) {
    const [values, setValues] = useState<Record<string, string>>(() => buildInitialValues(fields, initialValues));
    const [errors, setErrors] = useState<Record<string, string>>({});

    const isFieldVisible = (field: FieldConfig) => !field.showIf || field.showIf(values);

    const validateField = (field: FieldConfig, value: string): string | undefined => {
        if (!field.optional && !value.trim()) {
            return `${field.label.replace(' (optional)', '')} is required`;
        }
        if (value.trim() && field.validate) {
            return field.validate(value);
        }
        return undefined;
    };

    const handleChange = (field: FieldConfig, value: string) => {
        setValues((prev) => ({ ...prev, [field.name]: value }));
        setErrors((prev) => (prev[field.name] ? { ...prev, [field.name]: '' } : prev));
    };

    const handleBlur = (field: FieldConfig) => {
        const error = validateField(field, values[field.name]);
        setErrors((prev) => ({ ...prev, [field.name]: error ?? '' }));
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const visibleFields = fields.filter(isFieldVisible);
        const nextErrors: Record<string, string> = {};
        visibleFields.forEach((field) => {
            const error = validateField(field, values[field.name]);
            if (error) nextErrors[field.name] = error;
        });

        setErrors(nextErrors);

        if (Object.values(nextErrors).every((error) => !error)) {
            onSubmit(values);
        }
    };

    const rows = groupFieldsByRow(fields.filter(isFieldVisible));

    return (
        <form className="config-form" onSubmit={handleSubmit} noValidate>
            {rows.map((row) => (
                <div className="config-form-row" key={row.map((field) => field.name).join('-')}>
                    {row.map((field) => (
                        <div className="config-form-field" key={field.name}>
                            {field.type === 'radio-card' ? (
                                <>
                                    <div className="config-form-field-label">{field.label}</div>
                                    <div className="config-form-radio-group" role="radiogroup" aria-label={field.label}>
                                        {field.options?.map((option) => {
                                            const isSelected = values[field.name] === option.value;
                                            return (
                                                <label
                                                    key={option.value}
                                                    className={isSelected ? 'config-form-radio-card selected' : 'config-form-radio-card'}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={field.name}
                                                        value={option.value}
                                                        checked={isSelected}
                                                        onChange={() => handleChange(field, option.value)}
                                                        className="config-form-radio-input"
                                                    />
                                                    <span className="config-form-radio-dot" aria-hidden="true" />
                                                    <span className="config-form-radio-label">{option.label}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <label htmlFor={field.name}>{field.label}</label>
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        type={field.type ?? 'text'}
                                        placeholder={field.placeholder}
                                        value={values[field.name]}
                                        onChange={(event) => handleChange(field, event.target.value)}
                                        onBlur={() => handleBlur(field)}
                                        className={errors[field.name] ? 'config-form-input has-error' : 'config-form-input'}
                                    />
                                </>
                            )}
                            {errors[field.name] && (
                                <div className="config-form-error">{errors[field.name]}</div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
            <button type="submit" className="config-form-submit">{submitLabel}</button>
        </form>
    );
}
