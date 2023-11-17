
export default function GridItemElement(props: any) {
  return (
    <div
      style={{ border: "1px solid black", maxWidth: "100%"}}
      {...props.attributes}>
      {props.children}
    </div>
  );
}
