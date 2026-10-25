import { CustomDropdown } from "../CustomDropdown/CustomDropdown";

const sortOptions = [
  { value: "author", label: "Author" },
  { value: "article_id", label: "Article ID" },
  { value: "comment_count", label: "Comments" },
  { value: "created_at", label: "Date Created" },
  { value: "article_img_url", label: "Image" },
  { value: "title", label: "Title" },
  { value: "topic", label: "Topic" },
  { value: "votes", label: "Votes" },
];

export const SortDropdown = ({ onChange }) => {
  return (
    <CustomDropdown
      id={"sort_by"}
      label={"Sort:"}
      placeholder={"Choose How To Sort"}
      options={sortOptions}
      onChange={onChange}
    />
  );
};
