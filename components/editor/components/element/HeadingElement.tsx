export default function HeadingElement(props: any) {
  const style = { textAlign: props.element.align }

  // 部分html屬性會被覆寫掉，故在宣告時，額外再宣告屬性
  switch (props.element.type) {
    case "heading-two":
      return (
        <h2 style={{ ...style, fontSize: "1.5em" }} {...props.attributes}>
          {props.children}
        </h2>
      )
    case "heading-three":
      return (
        <h3 style={{ ...style, fontSize: "1.17em", fontWeight: "bold" }} {...props.attributes}>
          {props.children}
        </h3 >
      )
    case "heading-four":
      return (
        <h4 style={{ ...style, fontSize: "1em" }} {...props.attributes}>
          {props.children}
        </h4>
      )
    case "heading-five":
      return (
        <h4 style={{ ...style, fontSize: "0.83em" }} {...props.attributes}>
          {props.children}
        </h4>
      )
    case "heading-six":
      return (
        <h4 style={{ ...style, fontSize: "0.67em" }} {...props.attributes}>
          {props.children}
        </h4>
      )
    default:
      return (
        <h1 style={{ ...style, fontSize: "2em" }} {...props.attributes}>
          {props.children}
        </h1>
      )
  }
}
