import { useState, useCallback } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company_name: string;
  industry: string;
  message: string;
  consent: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

export const useFormValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
  };

  const validateField = useCallback((name: string, value: string | boolean): string => {
    switch (name) {
      case 'name':
        if (!value || (typeof value === 'string' && value.trim().length < 2)) {
          return 'Name must be at least 2 characters long';
        }
        break;
      case 'email':
        if (!value || (typeof value === 'string' && !validateEmail(value))) {
          return 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (value && typeof value === 'string' && !validatePhone(value)) {
          return 'Please enter a valid phone number';
        }
        break;
      case 'message':
        if (!value || (typeof value === 'string' && value.trim().length < 10)) {
          return 'Message must be at least 10 characters long';
        }
        break;
      case 'consent':
        if (!value) {
          return 'You must agree to our Privacy Policy and Terms & Conditions';
        }
        break;
      default:
        return '';
    }
    return '';
  }, []);

  const validateForm = useCallback((formData: FormData): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validateField]);

  const validateSingleField = useCallback((name: string, value: string | boolean) => {
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
    return error === '';
  }, [validateField]);

  const markFieldTouched = useCallback((name: string) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  const getFieldError = useCallback((name: string): string => {
    return touched[name] ? errors[name] || '' : '';
  }, [errors, touched]);

  const hasFieldError = useCallback((name: string): boolean => {
    return touched[name] && !!errors[name];
  }, [errors, touched]);

  return {
    errors,
    touched,
    validateForm,
    validateSingleField,
    markFieldTouched,
    clearErrors,
    getFieldError,
    hasFieldError
  };
};
