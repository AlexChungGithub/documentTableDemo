import InlineChromiumBugfix from "./InlineChromiumBugfix";

export default function LinkElement(props: any) {
  return (
    <a href={props.element.url} {...props.attributes}>
      <InlineChromiumBugfix />
      {props.children}
      <InlineChromiumBugfix />
    </a>
  );
}
