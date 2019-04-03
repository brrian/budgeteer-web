import { FormEvent, useState } from 'react';
import parseAmount from '../helpers/parseAmount';

const postProcessValue = (type: string, value: any) => {
  switch (type) {
    case 'number':
      return Number(value);
    case 'amount':
      return parseAmount(value);
    default:
      throw new Error(`Unknown post-process type: ${type}`);
  }
};

export default <T>(
  initialValues: T
): {
  formData: T;
  onChange: (event: FormEvent<HTMLInputElement | HTMLSelectElement>) => void;
  updateFormData: (name: string, value: any) => void;
} => {
  const [formData, setFormData] = useState(initialValues);

  const updateFormData = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return {
    formData,
    onChange: ({ currentTarget }) => {
      const { name, value } = currentTarget;

      const type = currentTarget.getAttribute('data-type');

      updateFormData(name, type ? postProcessValue(type, value) : value);
    },
    updateFormData,
  };
};
