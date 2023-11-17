import InlineChromiumBugfix from "./InlineChromiumBugfix";

export default function ButtonElement(props: any) {
  return (
    <button style={{ border: "1px solid black" }} {...props.attributes}>
      <InlineChromiumBugfix />
      {props.children}
      <InlineChromiumBugfix />
    </button>
  );
}
