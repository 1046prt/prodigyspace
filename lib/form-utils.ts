import React, { useState, useCallback } from "react";

/**
 * Common form validation patterns
 */
export interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
}

export interface FormField {
  value: string;
  error?: string;
  touched: boolean;
}

export interface FormState {
  [key: string]: FormField;
}

/**
 * Common validation rules
 */
export const validationRules = {
  required: (message = "This field is required"): ValidationRule => ({
    test: (value) => value.trim().length > 0,
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    test: (value) => value.length >= min,
    message: message || `Must be at least ${min} characters`,
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    test: (value) => value.length <= max,
    message: message || `Must be no more than ${max} characters`,
  }),

  email: (message = "Please enter a valid email address"): ValidationRule => ({
    test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),

  number: (message = "Please enter a valid number"): ValidationRule => ({
    test: (value) => !isNaN(Number(value)) && value.trim() !== "",
    message,
  }),

  positiveNumber: (
    message = "Please enter a positive number",
  ): ValidationRule => ({
    test: (value) => !isNaN(Number(value)) && Number(value) > 0,
    message,
  }),

  url: (message = "Please enter a valid URL"): ValidationRule => ({
    test: (value) => {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    message,
  }),
};

/**
 * Validate a field against multiple rules
 */
export function validateField(
  value: string,
  rules: ValidationRule[],
): string | undefined {
  for (const rule of rules) {
    if (!rule.test(value)) {
      return rule.message;
    }
  }
  return undefined;
}

/**
 * Hook for managing form state with validation
 */
export function useFormState<T extends Record<string, ValidationRule[]>>(
  initialValues: Record<keyof T, string>,
  validationRules: T,
) {
  const [state, setState] = useState<FormState>(() => {
    const initialState: FormState = {};
    Object.keys(initialValues).forEach((key) => {
      initialState[key] = {
        value: initialValues[key] || "",
        touched: false,
      };
    });
    return initialState;
  });

  const updateField = useCallback(
    (name: string, value: string) => {
      setState((prev) => {
        const rules = validationRules[name] || [];
        const error = validateField(value, rules);

        return {
          ...prev,
          [name]: {
            value,
            error,
            touched: true,
          },
        };
      });
    },
    [validationRules],
  );

  const touchField = useCallback((name: string) => {
    setState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true,
      },
    }));
  }, []);

  const validateAll = useCallback(() => {
    const newState = { ...state };
    let hasErrors = false;

    Object.keys(newState).forEach((name) => {
      const rules = validationRules[name] || [];
      const error = validateField(newState[name].value, rules);
      newState[name] = {
        ...newState[name],
        error,
        touched: true,
      };
      if (error) hasErrors = true;
    });

    setState(newState);
    return !hasErrors;
  }, [state, validationRules]);

  const getFieldProps = useCallback(
    (name: string) => ({
      value: state[name]?.value || "",
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => updateField(name, e.target.value),
      onBlur: () => touchField(name),
      error: state[name]?.touched ? state[name]?.error : undefined,
    }),
    [state, updateField, touchField],
  );

  const getValues = useCallback(() => {
    const values: Record<string, string> = {};
    Object.keys(state).forEach((key) => {
      values[key] = state[key].value;
    });
    return values;
  }, [state]);

  const reset = useCallback(
    (newValues?: Record<string, string>) => {
      setState(() => {
        const resetState: FormState = {};
        Object.keys(initialValues).forEach((key) => {
          resetState[key] = {
            value: newValues?.[key] || initialValues[key] || "",
            touched: false,
          };
        });
        return resetState;
      });
    },
    [initialValues],
  );

  const hasErrors = Object.values(state).some(
    (field) => field.error && field.touched,
  );
  const allTouched = Object.values(state).every((field) => field.touched);

  return {
    state,
    updateField,
    touchField,
    validateAll,
    getFieldProps,
    getValues,
    reset,
    hasErrors,
    allTouched,
    isValid: !hasErrors && allTouched,
  };
}

/**
 * Common input handling patterns
 */
export function useInputState(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [focused, setFocused] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [],
  );

  const handleFocus = useCallback(() => setFocused(true), []);
  const handleBlur = useCallback(() => setFocused(false), []);

  const clear = useCallback(() => setValue(""), []);
  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return {
    value,
    setValue,
    focused,
    handleChange,
    handleFocus,
    handleBlur,
    clear,
    reset,
    isEmpty: value.length === 0,
    props: {
      value,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
    },
  };
}

/**
 * Debounced input hook for search/filter functionality
 */
export function useDebouncedInput(initialValue = "", delay = 300) {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [],
  );

  return {
    value,
    debouncedValue,
    setValue,
    handleChange,
    props: {
      value,
      onChange: handleChange,
    },
  };
}

/**
 * Toggle state hook for checkboxes and switches
 */
export function useToggle(initialState = false) {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => setState((prev) => !prev), []);
  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);

  return {
    state,
    toggle,
    setTrue,
    setFalse,
    setState,
  };
}

/**
 * Multi-select state management
 */
export function useMultiSelect<T>(initialSelected: T[] = []) {
  const [selected, setSelected] = useState<T[]>(initialSelected);

  const isSelected = useCallback(
    (item: T) => {
      return selected.includes(item);
    },
    [selected],
  );

  const toggle = useCallback((item: T) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  }, []);

  const select = useCallback((item: T) => {
    setSelected((prev) => (prev.includes(item) ? prev : [...prev, item]));
  }, []);

  const deselect = useCallback((item: T) => {
    setSelected((prev) => prev.filter((i) => i !== item));
  }, []);

  const selectAll = useCallback((items: T[]) => {
    setSelected([...items]);
  }, []);

  const clear = useCallback(() => {
    setSelected([]);
  }, []);

  return {
    selected,
    isSelected,
    toggle,
    select,
    deselect,
    selectAll,
    clear,
    setSelected,
    count: selected.length,
    isEmpty: selected.length === 0,
  };
}
