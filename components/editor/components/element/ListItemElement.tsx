export default function ListItemElement(props: any) {
  return (
    <li style={{ textAlign: props.element.align }} {...props.attributes}>
      {props.children}
    </li>
  );
}
