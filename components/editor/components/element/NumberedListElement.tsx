export default function NumberedListElement(props: any) {
  return (
    <ol style={{ textAlign: props.element.align }} {...props.attributes}>
      {props.children}
    </ol>
  );
}
