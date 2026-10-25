import { CustomDropdown } from "../CustomDropdown/CustomDropdown";

const orderOptions = [
  { value: "asc", label: "ASC" },
  { value: "desc", label: "DESC" },
];

export const OrderDropdown = ({ onChange }) => {
  return (
    <CustomDropdown
      id={"order"}
      label={"Order:"}
      placeholder={"Order"}
      options={orderOptions}
      onChange={onChange}
    />
  );
};
