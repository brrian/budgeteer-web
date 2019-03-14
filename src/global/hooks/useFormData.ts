import { useState, FormEvent } from 'react';

export const useFormData = <T>(
  initialValues: T,
  numberFields: { [key: string]: boolean } = {}
): {
  formData: T;
  onChange: (event: FormEvent<HTMLInputElement | HTMLSelectElement>) => void;
} => {
  const [formData, setFormData] = useState(initialValues);

  return {
    formData,
    onChange: event => {
      const { name, value } = event.currentTarget;

      setFormData({
        ...formData,
        [name]: numberFields[name] ? Number(value) : value,
      });
    },
  };
};
