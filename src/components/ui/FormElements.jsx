import React from 'react';

export const FormInput = ({ label, error, as = 'input', ...props }) => {
  const InputComponent = as;
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <InputComponent
        className={`block w-full rounded-md shadow-sm ${as === 'textarea' ? '' : 'h-10'} border ${
          error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-cyan-500 focus:border-cyan-500'
        } px-3 py-2`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export const FormSelect = ({ label, options, error, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <select
        className={`block w-full h-10 rounded-md shadow-sm border ${
          error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-cyan-500 focus:border-cyan-500'
        } px-3 py-2`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export const FormRadio = ({ label, ...props }) => {
  return (
    <label className="flex items-center space-x-3">
      <input
        type="radio"
        className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300"
        {...props}
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );
};

export const FormCheckbox = ({ label, error, ...props }) => {
  return (
    <div>
      <label className="flex items-start space-x-3">
        <input
          type="checkbox"
          className="h-4 w-4 mt-0.5 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
          {...props}
        />
        <span className="text-gray-700">{label}</span>
      </label>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};