export default function Leaf(props: any) {
  let children = props.children;

  if (props.leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (props.leaf.italic) {
    children = <em>{children}</em>;
  }

  if (props.leaf.underline) {
    children = <u>{children}</u>;
  }

  if (props.leaf.deleteline) {
    children = <del>{children}</del>;
  }

  if (props.leaf.highlight) {
    children = <mark>{children}</mark>;
  } else if (props.leaf.haveComment) {
    children = <mark style={{backgroundColor: "lightgray"}}>{children}</mark>;
  }

  if (props.leaf.subscript) {
    children = <sub>{children}</sub>;
  }

  if (props.leaf.superscript) {
    children = <sup>{children}</sup>;
  }

  return <span {...props.attributes}>{children}</span>;
}
