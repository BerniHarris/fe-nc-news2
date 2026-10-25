import { CustomDropdown } from "../CustomDropdown/CustomDropdown";

const topicOptions = [
  { value: "coding", label: "Coding" },
  { value: "cooking", label: "Cooking" },
  { value: "football", label: "Football" },
];

export const TopicDropdown = ({ onChange }) => {
  return (
    <CustomDropdown
      id={"topic"}
      label={"Topic:"}
      placeholder={"Choose a topic"}
      options={topicOptions}
      onChange={onChange}
    />
  );
};
