import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  Button,
  Flex,
  IconButton,
  Slider,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useRef, useState } from "react";
import { Path, Selection, Transforms } from "slate";
import { ReactEditor, useFocused, useSelected } from "slate-react";

const HoveringImgToolBar = (props: {
  editor: ReactEditor;
  path: Path;
  selected: boolean;
  focused: boolean;
  imgProps: { height: number; width: number };
  setImgProps: Function;
}) => {
  return (
    <div
      style={{
        zIndex: "1",
        display: `${props.focused && props.selected ? "inline" : "none"}`,
        position: "absolute",
        top: "0.5em",
        left: "0.5em",
      }}
      onMouseDown={(event) => {
        event.preventDefault();
      }}>
      <Flex direction="row" gap="3">
        <IconButton
          variant="outline"
          onMouseDown={(event) => {
            event.preventDefault();
          }}
          onClick={() => {
            Transforms.removeNodes(props.editor, { at: props.path });
          }}>
          <TrashIcon height="20px" width="20px" />
        </IconButton>
        <Flex direction="row" gap="1" justify="center" align="center">
          <Text>Width: </Text>
          <input
            readOnly
            value={props.imgProps.width}
            style={{ height: "20px" }}></input>
          <IconButton
            variant="outline"
            onClick={() => {
              const newWidth = props.imgProps.width + 1;
              props.setImgProps({
                width: newWidth,
                height: props.imgProps.height,
              });
            }}>
            <PlusIcon height="20px" width="20px" />
          </IconButton>
          <IconButton
            variant="outline"
            onClick={() => {
              const newWidth = props.imgProps.width - 1;
              props.setImgProps({
                width: newWidth,
                height: props.imgProps.height,
              });
            }}>
            <MinusIcon height="20px" width="20px" />
          </IconButton>
        </Flex>
        <Flex direction="row" gap="1" justify="center" align="center">
          <Text>Height: </Text>
          <input
            readOnly
            value={props.imgProps.height}
            style={{ height: "20px" }}></input>
          <IconButton
            variant="outline"
            onClick={() => {
              const newHeight = props.imgProps.height + 1;
              props.setImgProps({
                width: props.imgProps.width,
                height: newHeight,
              });
            }}>
            <PlusIcon height="20px" width="20px" />
          </IconButton>
          <IconButton
            variant="outline"
            onClick={() => {
              const newHeight = props.imgProps.height - 1;
              props.setImgProps({
                width: props.imgProps.width,
                height: newHeight,
              });
            }}>
            <MinusIcon height="20px" width="20px" />
          </IconButton>
        </Flex>
      </Flex>
    </div>
  );
};

export default function ImageElement(props: any) {
  const path = ReactEditor.findPath(props.editor, props.element);
  const selected = useSelected();
  const focused = useFocused();
  const [imgProps, setImgProps] = useState({ width: 0, height: 0 });

  return (
    <div {...props.attributes}>
      {props.children}
      <div contentEditable={false} style={{ position: "relative" }}>
        <img
          src={props.element.url}
          height={imgProps.height > 0 ? imgProps.height : ""}
          width={imgProps.width > 0 ? imgProps.width : ""}
          style={{ display: "block", maxWidth: "100%" }}
          onLoad={(event) => {
            setImgProps({
              width: (event.target as HTMLImageElement).offsetWidth,
              height: (event.target as HTMLImageElement).offsetHeight,
            });
          }}
        />
        <HoveringImgToolBar
          editor={props.editor}
          path={path}
          selected={selected}
          focused={focused}
          imgProps={imgProps}
          setImgProps={setImgProps}
        />
      </div>
    </div>
  );
}
