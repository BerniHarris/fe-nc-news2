import { CustomDropdown } from "../CustomDropdown/CustomDropdown";

const sortOptions = [
  { value: "created_at", label: "Date Created" },
  { value: "comment_count", label: "Comments" },
  { value: "votes", label: "Votes" },
  { value: "title", label: "Title" },
];

export const SortDropdown = ({ onChange }) => {
  return (
    <CustomDropdown
      id={"sort_by"}
      label={"Sort:"}
      placeholder={"Sort"}
      options={sortOptions}
      onChange={onChange}
      hide={true}
    />
  );
};
