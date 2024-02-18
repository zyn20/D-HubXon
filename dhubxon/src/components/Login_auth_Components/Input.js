const fixedInputClass="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"

export default function Input({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  customClass,
  error // new prop for error messages
}) {
  return (
      <div className="my-5">
          <label htmlFor={labelFor} className="sr-only">
            {labelText}
          </label>
          <input
            onChange={handleChange}
            value={value}
            id={id}
            name={name}
            type={type}
            required={isRequired}
            className={`${fixedInputClass} ${customClass} ${error ? 'border-red-500' : ''}`}
            placeholder={placeholder}
          />
          {error && <p className="text-red-500 text-xs italic">{error}</p>} {/* Display error message */}
        </div>
  );
}
