import Select from "react-select";
import "./CustomDropdown.css";

export const CustomDropdown = ({
  id,
  label,
  options,
  placeholder,
  onChange,
  hide = false,
}) => {
  return (
    <section className={`${id}-dropdown-container`}>
      <label
        htmlFor={id}
        className={
          hide === true ? "hide-dropdown-label" : "show-dropdown-label"
        }
      >
        {label}
      </label>
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
