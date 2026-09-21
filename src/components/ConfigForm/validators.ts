export type Validator = (value: string) => string | undefined;

export const email = (message = 'Enter a valid email address'): Validator =>
    (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? undefined : message);

export const pattern = (regex: RegExp, message: string): Validator =>
    (value) => (regex.test(value) ? undefined : message);

export const minLength = (length: number, message = `Must be at least ${length} characters`): Validator =>
    (value) => (value.trim().length >= length ? undefined : message);

export const composeValidators = (...validators: Validator[]): Validator =>
    (value) => {
        for (const validate of validators) {
            const error = validate(value);
            if (error) return error;
        }
        return undefined;
    };
