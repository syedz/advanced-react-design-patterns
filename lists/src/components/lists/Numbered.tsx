type NumberedListProps<TItem, TSourceName extends string> = {
    items: TItem[];
    sourceName: TSourceName;
    ItemComponent: React.ComponentType<Record<TSourceName, TItem>>;
}
export const NumberedList = <TItem, TSourceName extends string>({ 
  items, 
  sourceName, 
  ItemComponent,
}: NumberedListProps<TItem, TSourceName>) => {
  return (
    <>
      {items.map((item, i) => (
        <>
          <h3> {i + 1} </h3>
          <ItemComponent key={i} {...{ [sourceName]: item } as Record<TSourceName, TItem>} />
        </>
      ))}
    </>
  );
};