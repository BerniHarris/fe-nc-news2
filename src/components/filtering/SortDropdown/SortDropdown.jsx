import { CustomDropdown } from "../CustomDropdown/CustomDropdown";

const sortOptions = [
  { value: "author", label: "Author" },
  { value: "title", label: "Title" },
  { value: "author", label: "Topic" },
  { value: "created_at", label: "Date Created" },
  { value: "votes", label: "Votes" },
  { value: "article_id", label: "Article ID" },
  { value: "article_id", label: "Article ID" },
  { value: "article_img_url", label: "Image" },
  { value: "comment_count", label: "Comments" },
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
