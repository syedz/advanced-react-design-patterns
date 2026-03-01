import type { Book } from "../../types";

type SmallBookListItemsProps = {
  book: Book;
}

export const SmallBookListItem: React.FC<SmallBookListItemsProps> = ({ book }) => {
  const { name, price } = book;
  return (
    <h2>{name} / {price}</h2>
  );
};