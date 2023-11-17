"use client";

import { Flex, IconButton } from "@radix-ui/themes";
import Utils from "../../utils";
import {
  FontBoldIcon,
  FontItalicIcon,
  Link1Icon,
  StrikethroughIcon,
  UnderlineIcon,
  InputIcon
} from "@radix-ui/react-icons";
import "@radix-ui/themes/styles.css";
// import "../../../styles.css";
import { Highlighter, MessageSquare, SubscriptIcon, SuperscriptIcon } from "lucide-react";

export default function HoveringToolbar(props: {
  opacity: string;
  top: string;
  left: string;
  editor: any;
}) {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: "1",
        top: `${props.top}`,
        left: `${props.left}`,
      }}
      onMouseDown={(e) => {
        // prevent toolbar from taking focus away from editor
        e.preventDefault();
      }}>
      <Flex
        align="center"
        style={{
          opacity: props.opacity,
          border: "1px solid black",
          backgroundColor: "white",
          borderRadius: "4px",
          transition: "opacity 0.75s",
        }}>
        <IconButton
          variant="outline"
          color="gray"
          radius="none"
          onClick={() => {
            Utils.toggleInlineInput(props.editor);
          }}>
          <InputIcon height="20" width="20" />
        </IconButton>
        <IconButton
          variant="outline"
          color="gray"
          radius="none"
          highContrast={Utils.isBoldMarkActive(props.editor) ? true : false}
          onClick={() => {
            Utils.toggleBoldMark(props.editor);
          }}>
          <FontBoldIcon height="20" width="20" />
        </IconButton>
        <IconButton
          variant="outline"
          color="gray"
          radius="none"
          highContrast={Utils.isItalicMarkActive(props.editor) ? true : false}
          onClick={() => {
            Utils.toggleItalicMark(props.editor);
          }}>
          <FontItalicIcon height="20" width="20" />
        </IconButton>
        <IconButton
          variant="outline"
          color="gray"
          radius="none"
          highContrast={
            Utils.isUnderlineMarkActive(props.editor) ? true : false
          }
          onClick={() => {
            Utils.toggleUnderlineMark(props.editor);
          }}>
          <UnderlineIcon height="20" width="20" />
        </IconButton>
        <IconButton
          variant="outline"
          color="gray"
          radius="none"
          highContrast={Utils.isDellineMarkActive(props.editor) ? true : false}
          onClick={() => {
            Utils.toggleDellineMark(props.editor);
          }}>
          <StrikethroughIcon height="20" width="20" />
        </IconButton>
        <IconButton
          variant="outline"
          color="gray"
          radius="none"
          highContrast={Utils.isLinkInlineActive(props.editor) ? true : false}
          onClick={() => {
            Utils.toggleLinkInline(props.editor);
          }}>
          <Link1Icon height="20" width="20" />
        </IconButton>
        <IconButton
          variant="outline"
          color="gray"
          radius="none"
          highContrast={Utils.isHighlightMarkActive(props.editor) ? true : false}
          onClick={() => {
            Utils.toggleHighlightMark(props.editor);
          }}>
          <Highlighter height="20px" width="20px" />
        </IconButton>
        <IconButton
          variant="outline"
          color="gray"
          radius="none"
          highContrast={Utils.isSuperscriptMarkActive(props.editor) ? true : false}
          onClick={() => {
            Utils.toggleSuperscriptMark(props.editor);
          }}>
          <SuperscriptIcon height="20px" width="20px" />
        </IconButton>
        <IconButton
          variant="outline"
          color="gray"
          radius="none"
          highContrast={Utils.isSubscriptMarkActive(props.editor) ? true : false}
          onClick={() => {
            Utils.toggleSubscriptMark(props.editor);
          }}>
          <SubscriptIcon height="20px" width="20px" />
        </IconButton>
        <IconButton
          variant="outline"
          color="gray"
          radius="none"
          highContrast={Utils.isCommentMarkActive(props.editor) ? true : false}
          onClick={() => {
            Utils.toggleCommentMark(props.editor);
          }}>
          <MessageSquare height="20px" width="20px" />
        </IconButton>
      </Flex>
    </div>
  );
}
