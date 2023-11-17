export default function CodeElement(props: any) {
  return (
    <pre
      style={{
        textAlign: props.element.align,
        whiteSpace: "pre-wrap",
        wordWrap: "break-word"
      }}
      {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
}
