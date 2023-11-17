import InlineChromiumBugfix from "./InlineChromiumBugfix";
import { useState, useRef, useEffect } from "react";
import { Transforms, Element as SlateElement, } from "slate";
import { ReactEditor } from "slate-react";

export default function InlineInputElement(props: any) {
  const [defaultValue, setDefaultValue] = useState<string | undefined>(props.element.inputValue);
  let tmpContent = "";
  if (props.element.inputValue === "" || !props.element.inputValue) {
    tmpContent = props.element.children[0].text;
  } else {
    tmpContent = props.element.inputValue;
  }
  const [content, setContent] = useState(tmpContent);
  const [width, setWidth] = useState(0);
  const span: any = useRef();
  // 當content改變時重新計算寬度
  useEffect(() => {
    setWidth(span.current.offsetWidth);
  }, [content]);
  return (
    <>
      <span
        id="hide"
        ref={span}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "pre"
        }}
      >
        {content}
      </span>
      <input
        {...props.attributes}
        style={{
          width,
          border: "none",
          outline: "none",
          fontSize: "16px"
        }}
        placeholder={props.element.children[0].text}
        value={defaultValue}
        readOnly={props.element.readOnly ? true : false}
        onChange={(event) => {
          //參考check-list的範例
          const path = ReactEditor.findPath(props.editor, props.element);
          // console.log(defaultValue);
          const newProperties: Partial<{}> = {
            inputValue: event.target.value
          };
          Transforms.setNodes(props.editor, newProperties, { at: path });
          setDefaultValue(event.target.value);
          // 如果輸入為空時，預設展示寬度為placeholder的寬度
          if (event.target.value === "") {
            setContent(props.element.children[0].text);
          } else {
            setContent(event.target.value);
          }
        }}
      ></input >
      {props.children}
    </>
  );
}
