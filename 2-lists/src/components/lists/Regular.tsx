// Regular.tsx
type RegularListProps<TItem, TSourceName extends string> = {
    items: TItem[];
    sourceName: TSourceName;
    ItemComponent: React.ComponentType<Record<TSourceName, TItem>>;
}
export const RegularList = <TItem, TSourceName extends string>({ 
  items, 
  sourceName, 
  ItemComponent,
}: RegularListProps<TItem, TSourceName>) => {
  return (
    <>
      {items.map((item, i) => (
        // Dynamically pass the item to the component using the sourceName
        <ItemComponent key={i} {...{ [sourceName]: item } as Record<TSourceName, TItem>} />
      ))}
    </>
  );
};