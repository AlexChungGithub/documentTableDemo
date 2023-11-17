"use client";

import React, {
  useCallback,
  useId,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  createEditor,
  Transforms,
  Editor,
  Range,
  Text,
  Descendant,
} from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { withDocxDeserializer } from "slate-docx-deserializer";
import { jsx } from "slate-hyperscript";
import Leaf from "./components/leaf";
import { SortableElement } from "./components/other/SotrableElement";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { withNodeId } from "./plugin/withNodeId";
import HoveringCommentList from "./components/other/HoveringCommentList";
import TwoColumnsTooBox from "./components/other/TwoColumnsToolBox";
import OneColumnTooBox from "./components/other/OneColumnToolBox";
import withCustomNormalize from "./plugin/withCustomNormalize";
import withCustomDelete from "./plugin/withCustomDelete";
import Utils from "./utils";
import "./editor.css";
import HoveringToolbar from "./components/other/HoveringToolbar";
import withCustomElement from "./plugin/withCustomElement";
import ComponentToPrint from "./components/other/ComponentToPrint";
import { useReactToPrint } from "react-to-print";
import InputDialog from "./components/other/InputDialog";

export default function EditorComponent({
  initialValue,
  readOnly,
}: {
  initialValue: Descendant[];
  readOnly?: boolean;
}) {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [targetTool, setTargetTool] = useState<Range | undefined>();
  const [toolBoxRef, setToolBoxRef] = useState<{ top: string, left: string, editor: any } | null>(null);
  const [search, setSearch] = useState<string>("");
  const [pageHtml, setPageHtml] = useState<string[] | null>(null);
  const [pageIdList, setPageIdList] = useState<string[] | null>(null);
  const [inputDialog, setInputDialog] = useState<{ type: string, open: boolean, editor: any } | null>(null);
  const editor = useMemo(
    () =>
      withDocxDeserializer(
        withNodeId(
          withCustomDelete(
            withCustomNormalize(
              withCustomElement(withReact(withHistory(createEditor())))
            )
          )
        ),
        jsx
      ),
    []
  );

  const [hoverCommentProps, setHoverCommentProps] = useState<{
    opacity: string;
    top: string;
    left: string;
    comments: string[];
    editor: any;
  } | null>(null);

  const [hoverToolbarProps, setHoverToolbarProps] = useState<{
    opacity: string;
    top: string;
    left: string;
    editor: any;
  } | null>(null);

  //Draggable items
  const items = useMemo(
    () => editor.children.map((element: { id: string }) => element.id),
    [editor.children]
  );
  const [activeId, setActiveId] = useState(null);
  const renderElement = useCallback((props: any) => {
    const isTopLevel = ReactEditor.findPath(editor, props.element).length === 0;
    return isTopLevel ? (
      <SortableElement
        {...props}
        renderElement={Utils.renderElementContent}
        editor={editor}
      />
    ) : (
      Utils.renderElementContent({ ...props, editor })
    );
  }, []);

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  const handleDragStart = (event: any) => {
    if (event.active) {
      clearSelection();
      setActiveId(event.active.id);
    }
  };

  const handleDragEnd = (event: any) => {
    const overId = event.over?.id;
    const overIndex = editor.children.findIndex(
      (x: { id: any }) => x.id === overId
    );
    const destinationPath = Utils.findTargetNodePath(editor, overId);
    const currentPath = Utils.findTargetNodePath(editor, activeId!);

    if (overId !== activeId && destinationPath.length == currentPath.length) {
      let nextElement;
      const isDifferentPage =
        currentPath[0] != destinationPath[0] ? true : false;
      nextElement = Editor.next(editor, { at: currentPath });

      Transforms.moveNodes(editor, {
        at: [],
        match: (node) => (node as any).id === activeId,
        to: destinationPath,
      });

      if (!nextElement && isDifferentPage) {
        const emptyParagraph = {
          id: Utils.makeNodeId(),
          type: "paragraph",
          children: [{ text: "" }],
        };
        Transforms.insertNodes(editor, emptyParagraph, { at: currentPath });
      }
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const clearSelection = () => {
    ReactEditor.blur(editor);
    Transforms.deselect(editor);
    window.getSelection()?.empty();
  };
  const initToolBox = () => {
    const tmpTools: string[][][] = [];
    tmpTools.push(Utils.commonTools);
    tmpTools.push(Utils.textTools);
    tmpTools.push(Utils.formTools);
    tmpTools.push(Utils.blockTools);
    tmpTools.push(Utils.advancedTools);
    return tmpTools;
  };

  const searchToolBox = (toolArray: string[][]) => {
    // 將二維陣列轉為一維陣列，並篩選
    let tmpTools = toolArray.reduce(function (prev, curr) {
      return prev.concat(curr);
    });
    let tmpSearchTools = tmpTools
      .filter((c: string) =>
        c.replace(/\s*/g, "").toLowerCase().startsWith(search.toLowerCase())
      )
      .slice(0, 10);
    return tmpSearchTools;
  };
  const updateTargetTool = (value: Range | undefined) => setTargetTool(value);
  const updateDialogOpen = (type: string, open: boolean) => setInputDialog({ type: type, open: open, editor: editor })
  let categoryTool = Utils.categoryTool;
  let tools = initToolBox();

  let searchTools: string[][] = [];
  if (search) {
    tools = [];
    let tmpSearchResult = searchToolBox(Utils.commonTools);
    tmpSearchResult.length !== 0
      ? searchTools.push(tmpSearchResult)
      : (categoryTool = categoryTool.filter((c: string) => c !== "COMMON"));
    tmpSearchResult = searchToolBox(Utils.textTools);
    tmpSearchResult.length !== 0
      ? searchTools.push(tmpSearchResult)
      : (categoryTool = categoryTool.filter((c: string) => c !== "TEXT"));
    tmpSearchResult = searchToolBox(Utils.formTools);
    tmpSearchResult.length !== 0
      ? searchTools.push(tmpSearchResult)
      : (categoryTool = categoryTool.filter(
        (c: string) => c !== "Form Fields"
      ));
    tmpSearchResult = searchToolBox(Utils.blockTools);
    tmpSearchResult.length !== 0
      ? searchTools.push(tmpSearchResult)
      : (categoryTool = categoryTool.filter((c: string) => c !== "BLOCK"));
    tmpSearchResult = searchToolBox(Utils.advancedTools);
    tmpSearchResult.length !== 0
      ? searchTools.push(tmpSearchResult)
      : (categoryTool = categoryTool.filter((c: string) => c !== "ADVANCED"));
  } else {
    categoryTool = Utils.categoryTool;
    tools = initToolBox();
    searchTools = [];
  }
  useEffect(() => {
    if (targetTool && tools.length > 0) {
      const domRange = ReactEditor.toDOMRange(editor, targetTool);
      const rect = domRange.getBoundingClientRect();
      let top: string = `${rect.top + window.pageYOffset + 62.5}px`;
      if (domRange.startOffset === 0 && domRange.endOffset === 0) {
        top = `${rect.top + window.pageYOffset + 24}px`;
      } else {
        top = `${rect.top + window.pageYOffset + 40}px`;
      }
      const left: string = `${rect.left + window.pageXOffset}px`;
      setToolBoxRef({ top: top, left: left, editor: editor })
    }
  }, [tools.length, editor, search, targetTool]);

  const id = useId();
  const defaultInitialValue: Descendant[] = [
    {
      id: "default_page",
      type: "page",
      children: [
        {
          id: "default_paragraph",
          type: "paragraph",
          children: [{ text: "" }],
        },
      ],
    },
  ];

  return (
    <Slate
      editor={editor}
      initialValue={initialValue ? initialValue : defaultInitialValue}
      onChange={(value) => {
        console.log("debug value: ", JSON.stringify(value, null, 1));
        // 紀錄文件內容
        const htmlString = value.map((page, index) => {
          return Utils.serialize(editor, page);
        });
        const pageIds = value.map((page, inde) => {
          if (page.id) return page.id;
          else return "";
        });
        setPageHtml(htmlString);
        setPageIdList(pageIds);
        const { selection } = editor;

        //顯示懸浮元件
        if (
          !selection ||
          Range.isCollapsed(selection) ||
          Editor.string(editor, selection) === ""
        ) {
          // 無反白區域
          setHoverToolbarProps(null);
          setHoverCommentProps(null);
        } else {
          const domSelection = window.getSelection();
          const domRange = domSelection!.getRangeAt(0);
          const rect = domRange.getBoundingClientRect();

          const path = Editor.path(editor, selection);
          const node = Editor.node(editor, path);
          const [entity] = node;
          // 是否顯示懸浮comment元件
          if (!Editor.isEditor(entity) && Text.isText(entity)) {
            setHoverToolbarProps({
              opacity: "1",
              top: `${rect.top + window.pageYOffset - 40}px`,
              left: `${rect.left + window.pageXOffset}px`,
              editor: editor,
            });
            if (entity.haveComment == true)
              setHoverCommentProps({
                opacity: "1",
                top: `${rect.top + window.pageYOffset + 24}px`,
                left: `${rect.left + window.pageXOffset}px`,
                comments: entity.comments ? entity.comments : [],
                editor: editor,
              });
            else setHoverCommentProps(null);
          } else {
            setHoverToolbarProps(null);
            setHoverCommentProps(null);
          }
        }

        // 判斷開頭輸入"/"觸發工具列
        if (selection && Range.isCollapsed(selection)) {
          const [start] = Range.edges(selection);
          const wordBefore = Editor.before(editor, start, { unit: "word" });
          const before = wordBefore && Editor.before(editor, wordBefore);
          let beforeRange = before && Editor.range(editor, before, start);
          const beforeText = beforeRange && Editor.string(editor, beforeRange);
          const beforeMatchTool = beforeText && beforeText.match(/^\/(\w+)$/);
          const after = Editor.after(editor, start);
          const afterRange = Editor.range(editor, start, after);
          const afterText = Editor.string(editor, afterRange);
          const afterMatch = afterText.match(/^(\s|$)/);

          let toolIndex;
          let toolLineIndex = false;

          const lineText = Editor.string(editor, start.path);
          // 判斷目前游標所在位置是否只有一個字並且等於/
          if (lineText === "/") {
            toolIndex = true;
          } else {
            toolIndex = false;
          }
          // 判斷目前游標所在位置的第一個字是否為/
          if (lineText.slice(0, 1) === "/") {
            toolLineIndex = true;
          }

          if (
            ((beforeMatchTool || beforeText === "/") &&
              afterMatch &&
              toolLineIndex) ||
            toolIndex
          ) {
            if (beforeText === "/") {
              setSearch("");
            } else if (toolIndex) {
              setSearch("");
              beforeRange = {
                anchor: {
                  path: [0],
                  offset: 0,
                },
                focus: {
                  path: [0],
                  offset: 0,
                },
              };
            }
            setTargetTool(beforeRange);
            if (beforeMatchTool) {
              setSearch(beforeMatchTool[1]);
            }
            return;
          }
        }
        setTargetTool(undefined);
      }}>
      <DndContext
        id={id}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <ComponentToPrint ref={componentRef}>
            <Editable
              readOnly={readOnly ? readOnly : false}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={(event) => {
                if (event.ctrlKey) {
                  switch (event.key) {
                    case "`": {
                      event.preventDefault();
                      Utils.toggleCodeBlock(editor);
                      break;
                    }

                    case "b": {
                      event.preventDefault();
                      Utils.toggleBoldMark(editor);
                      break;
                    }

                    case "a": {
                      event.preventDefault();
                      Utils.toggleLinkInline(editor);
                      break;
                    }

                    case "i": {
                      event.preventDefault();
                      Utils.toggleItalicMark(editor);
                      break;
                    }

                    case "u": {
                      event.preventDefault();
                      Utils.toggleUnderlineMark(editor);
                      break;
                    }

                    case "d": {
                      event.preventDefault();
                      Utils.insertTwocolDivBlock(editor);
                      break;
                    }

                    case "c": {
                      event.preventDefault();
                      Utils.toggleCommentMark(editor);
                      break;
                    }

                    case "1": {
                      event.preventDefault();
                      Utils.toggleBtnInline(editor);
                      break;
                    }

                    case "2": {
                      event.preventDefault();
                      Utils.toggleAlignBlock(editor, "left");
                      break;
                    }

                    case "3": {
                      event.preventDefault();
                      Utils.toggleAlignBlock(editor, "center");
                      break;
                    }

                    case "4": {
                      event.preventDefault();
                      Utils.toggleAlignBlock(editor, "right");
                      break;
                    }

                    case "5": {
                      event.preventDefault();
                      Utils.toggleDellineMark(editor);
                      break;
                    }

                    case "6": {
                      event.preventDefault();
                      Utils.insertImageBlock(editor);
                      break;
                    }

                    case "7": {
                      event.preventDefault();
                      Utils.insertListBlock(editor, "numbered_list");
                      break;
                    }

                    case "8": {
                      event.preventDefault();
                      Utils.insertListBlock(editor, "bulleted_list");
                      break;
                    }

                    case "9": {
                      event.preventDefault();
                      // Utils.coverHtmlToPdf(pageHtml!);
                      Utils.coverHtmlToPdfImage(pageIdList!);
                      break;
                    }

                    case "0": {
                      event.preventDefault();
                      Utils.coverHtmlToDocx(pageHtml!);
                      break;
                    }

                    case "-": {
                      event.preventDefault();
                      handlePrint();
                      break;
                    }
                  }
                } else return;
              }}
            />
          </ComponentToPrint>
          {hoverToolbarProps && (
            <HoveringToolbar
              opacity={hoverToolbarProps.opacity}
              top={hoverToolbarProps.top}
              left={hoverToolbarProps.left}
              editor={hoverToolbarProps.editor}
            />
          )}
          {hoverCommentProps && (
            <HoveringCommentList
              opacity={hoverCommentProps.opacity}
              top={hoverCommentProps.top}
              left={hoverCommentProps.left}
              comments={hoverCommentProps.comments}
              editor={hoverCommentProps.editor}
            />
          )}
          {targetTool && tools.length > 0 && toolBoxRef && (
            <TwoColumnsTooBox
              top={toolBoxRef.top}
              left={toolBoxRef.left}
              tools={tools}
              category={categoryTool}
              updateTargetTool={updateTargetTool}
              updateDialogOpen={updateDialogOpen}
              editor={toolBoxRef.editor}
            />
          )}
          {targetTool && searchTools.length > 0 && toolBoxRef && (
            <OneColumnTooBox
              top={toolBoxRef.top}
              left={toolBoxRef.left}
              tools={searchTools}
              category={categoryTool}
              updateTargetTool={updateTargetTool}
              updateDialogOpen={updateDialogOpen}
              editor={toolBoxRef.editor}
            />
          )}
          {inputDialog && (
            <InputDialog
              type={inputDialog.type}
              open={inputDialog.open}
              updateTargetTool={updateTargetTool}
              updateDialogOpen={updateDialogOpen}
              editor={inputDialog.editor}
            />
          )}
        </SortableContext>
      </DndContext>
    </Slate>
  );
}
