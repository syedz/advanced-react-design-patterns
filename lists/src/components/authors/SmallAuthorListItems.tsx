import type { Author } from "../../types";

type SmallAuthorListItemsProps = {
  author: Author;
}
export const SmallAuthorListItems: React.FC<SmallAuthorListItemsProps> = ({ author }) => {
  const { name, age } = author;
  return (
    <p> Name: {name}, Age: {age}</p>
  );
}