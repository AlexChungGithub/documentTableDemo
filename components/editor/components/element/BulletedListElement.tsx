export default function BulletedListElement(props: any) {
    return (
      <ul style={{ textAlign: props.element.align }} {...props.attributes}>
        {props.children}
      </ul>
    );
  }
