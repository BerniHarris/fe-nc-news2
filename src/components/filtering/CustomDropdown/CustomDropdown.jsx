import Select from "react-select";

export const CustomDropdown = ({
  id,
  label,
  options,
  placeholder,
  onChange,
}) => {
  return (
    <section className={`${id}-dropdown-container`}>
      <label htmlFor={id}>{label}</label>
      <Select
        inputId={id}
        options={options}
        isClearable={true}
        placeholder={placeholder}
        onChange={(selectedOption) => {
          onChange({
            target: { value: selectedOption ? selectedOption.value : "" },
          });
        }}
      />
    </section>
  );
};
