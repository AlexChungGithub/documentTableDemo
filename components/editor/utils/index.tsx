import { Editor, Transforms, Element, Text, Range, Descendant } from "slate";
import escapeHtml from "escape-html";
import { saveAs } from "file-saver";
import HTMLtoDOCX from "html-to-docx";
import jsPDF, { jsPDFOptions } from "jspdf";
import { nanoid } from "nanoid";
import CodeElement from "../components/element/CodeElement";
import GridContainerElement from "../components/element/GridContainerElement";
import ParagraphElement from "../components/element/ParagraphElement";
import GridItemElement from "../components/element/GridItemElement";
import PageElement from "../components/element/PageElements";
import ButtonElement from "../components/element/ButtonElement";
import LinkElement from "../components/element/LinkElement";
import ImageElement from "../components/element/ImageElement";
import NumberedListElement from "../components/element/NumberedListElement";
import BulletedListElement from "../components/element/BulletedListElement";
import ListItemElement from "../components/element/ListItemElement";
import InlineInputElement from "../components/element/inlineInputElement";
import HeadingElement from "../components/element/HeadingElement";
import { InlineInputType } from "../types";
import html2canvas from "html2canvas";
import CheckBoxElement from "../components/element/CheckBoxElement";
import SwitchElement from "../components/element/SwitchElement"
import SelectedElement from "../components/element/SelectedElement";

const ALIGNABLE_BLOCK_TYPE = [
  "paragraph",
  "code",
  "block_quote",
  "bulleted_list",
  "numbered_list",
  "list_item",
  "h1",
  "h2",
];

const LIST_TYPES = ["numbered_list", "bulleted_list"];

export default class Utils {
  static isBoldMarkActive(editor: Editor): boolean {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  }

  static isItalicMarkActive(editor: Editor): boolean {
    const marks = Editor.marks(editor);
    return marks ? marks.italic === true : false;
  }

  static isUnderlineMarkActive(editor: Editor): boolean {
    const marks = Editor.marks(editor);
    return marks ? marks.underline === true : false;
  }

  static isDellineMarkActive(editor: Editor): boolean {
    const marks = Editor.marks(editor);
    return marks ? marks.deleteline === true : false;
  }

  static isHighlightMarkActive(editor: Editor): boolean {
    const marks = Editor.marks(editor);
    return marks ? marks.highlight === true : false;
  }

  static isCommentMarkActive(editor: Editor): boolean {
    const marks = Editor.marks(editor);
    return marks ? marks.haveComment === true : false;
  }

  static isSubscriptMarkActive(editor: Editor): boolean {
    const marks = Editor.marks(editor);
    return marks ? marks.subscript === true : false;
  }

  static isSuperscriptMarkActive(editor: Editor): boolean {
    const marks = Editor.marks(editor);
    return marks ? marks.superscript === true : false;
  }

  static isCodeBlockActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === "code",
    });

    return !!match;
  }

  static isAlignActive(editor: Editor, align: string): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.align === align,
    });

    return !!match;
  }

  static isListActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) => {
        return (
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          LIST_TYPES.includes(n.type)
        );
      },
    });
    return !!match;
  }

  static isHeading1BlockActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === "heading-one",
    });
    return !!match;
  }

  static isHeading2BlockActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === "heading-one",
    });
    return !!match;
  }

  static isHeading3BlockActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === "heading-three",
    });
    return !!match;
  }

  static isHeading4BlockActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === "heading-four",
    });
    return !!match;
  }

  static isHeading5BlockActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === "heading-five",
    });
    return !!match;
  }

  static isHeading6BlockActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === "heading-six",
    });
    return !!match;
  }

  static isTwocolDivBlock(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        n.type === "grid_container",
    });
    return !!match;
  }

  static isImageBlock(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === "image",
    });
    return !!match;
  }

  static isBtnInlineActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === "button",
    });
    return !!match;
  }

  static isLinkInlineActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
    });
    return !!match;
  }

  static toggleBoldMark(editor: Editor): void {
    const isActive = this.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  }

  static toggleItalicMark(editor: Editor): void {
    const isActive = this.isItalicMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "italic");
    } else {
      Editor.addMark(editor, "italic", true);
    }
  }

  static toggleUnderlineMark(editor: Editor): void {
    const isActive = this.isUnderlineMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "underline");
    } else {
      Editor.addMark(editor, "underline", true);
    }
  }

  static toggleDellineMark(editor: Editor): void {
    const isActive = this.isDellineMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "deleteline");
    } else {
      Editor.addMark(editor, "deleteline", true);
    }
  }

  static toggleHighlightMark(editor: Editor): void {
    const isActive = this.isHighlightMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "highlight");
    } else {
      Editor.addMark(editor, "highlight", true);
    }
  }

  static toggleSubscriptMark(editor: Editor): void {
    const isActive = this.isSubscriptMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "subscript");
    } else {
      Editor.addMark(editor, "subscript", true);
    }
  }

  static toggleSuperscriptMark(editor: Editor): void {
    const isActive = this.isSuperscriptMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "superscript");
    } else {
      Editor.addMark(editor, "superscript", true);
    }
  }

  static toggleCommentMark(editor: Editor): void {
    const isActive = this.isCommentMarkActive(editor);
    if (!isActive) Editor.addMark(editor, "haveComment", true);

    const comment = window.prompt("add comment");

    if (comment) {
      const marks = Editor.marks(editor);
      const comments = marks?.comments;
      if (comments) {
        const tempCommentArr = Array.from(comments);
        tempCommentArr.push(comment);
        Editor.removeMark(editor, "comments");
        Editor.addMark(editor, "comments", tempCommentArr);
      } else Editor.addMark(editor, "comments", [comment]);
    }
  }

  static toggleLinkInline(editor: Editor): void {
    const isActive = this.isLinkInlineActive(editor);
    if (isActive) {
      Transforms.unwrapNodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
      });
    } else {
      const { selection } = editor;
      const isCollapsed = selection && Range.isCollapsed(selection);

      if (!isCollapsed) {
        const url = window.prompt("insert url");
        if (url) {
          const link: Descendant = {
            type: "link",
            url: url,
            children: [],
          };
          Transforms.wrapNodes(editor, link, { split: true });
        }
      }
    }
  }

  static toggleBtnInline(editor: Editor): void {
    const isActive = this.isBtnInlineActive(editor);
    if (isActive) {
      Transforms.unwrapNodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === "button",
      });
    } else {
      const { selection } = editor;
      const isCollapsed = selection && Range.isCollapsed(selection);
      const button: Descendant = {
        type: "button",
        children: [],
      };
      if (!isCollapsed) Transforms.wrapNodes(editor, button, { split: true });
    }
  }

  static toggleCodeBlock(editor: Editor) {
    const isActive = this.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? "paragraph" : "code" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  }

  static toggleAlignBlock(editor: Editor, align: string) {
    const isActive = this.isAlignActive(editor, align);
    Transforms.setNodes(
      editor,
      { align: isActive ? undefined : align },
      {
        match: (n) =>
          Element.isElement(n) &&
          Editor.isBlock(editor, n) &&
          ALIGNABLE_BLOCK_TYPE.indexOf(n.type) !== -1,
      }
    );
  }

  static toggleNormalTextBlock(editor: Editor) {
    Transforms.setNodes(
      editor,
      { type: "paragraph" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  }

  static toggleHeading1Block(editor: Editor, toolboxIndex: boolean | undefined) {
    const isActive = this.isHeading1BlockActive(editor);
    // 如果是從toolbox觸發，一律更改為heading-{number}
    Transforms.setNodes(
      editor,
      { type: isActive && !toolboxIndex ? "paragraph" : "heading-one" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  }

  static toggleHeading2Block(editor: Editor, toolboxIndex: boolean | undefined) {
    const isActive = this.isHeading2BlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive && !toolboxIndex ? "paragraph" : "heading-two" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  }

  static toggleHeading3Block(editor: Editor, toolboxIndex: boolean | undefined) {
    const isActive = this.isHeading3BlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive && !toolboxIndex ? "paragraph" : "heading-three" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  }

  static toggleHeading4Block(editor: Editor, toolboxIndex: boolean | undefined) {
    const isActive = this.isHeading4BlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive && !toolboxIndex ? "paragraph" : "heading-four" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  }

  static toggleHeading5Block(editor: Editor, toolboxIndex: boolean | undefined) {
    const isActive = this.isHeading5BlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive && !toolboxIndex ? "paragraph" : "heading-five" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  }

  static toggleHeading6Block(editor: Editor, toolboxIndex: boolean | undefined) {
    const isActive = this.isHeading6BlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive && !toolboxIndex ? "paragraph" : "heading-six" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  }

  static toggleCheckBoxBlock(editor: Editor) {
    Transforms.setNodes(
      editor,
      { type: "check-list-item" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  }

  static toggleSwitchBlock(editor: Editor) {
    Transforms.setNodes(
      editor,
      { type: "switch" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  }

  static toggleSelectedBlock(editor: Editor, options: string[], label: string) {
    Transforms.setNodes(
      editor,
      { type: "selected", options: options, value: options[0], label: label },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  }

  static insertTwocolDivBlock(editor: Editor) {
    const isActive = this.isTwocolDivBlock(editor);
    if (isActive) {
      const [match] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          n.type === "grid_container",
      });
      const [, path] = match;
      Transforms.removeNodes(editor, {
        at: path,
      });
    } else {
      const newGridLayout: Descendant = {
        type: "grid_container",
        children: [
          {
            type: "grid_item",
            children: [
              {
                type: "paragraph",
                children: [{ text: "" }],
              },
            ],
          },
          {
            type: "grid_item",
            children: [
              {
                type: "paragraph",
                children: [{ text: "" }],
              },
            ],
          },
        ],
      };
      Transforms.insertNodes(editor, newGridLayout);
    }
  }

  static insertImageBlock(editor: Editor) {
    const isActive = this.isImageBlock(editor);
    if (isActive) {
      const [match] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === "image",
      });
      const [, path] = match;
      Transforms.removeNodes(editor, {
        at: path,
      });
    } else {
      const url = window.prompt("Enter the URL of the image:");
      if (url) {
        const newImage: Descendant = {
          type: "image",
          url: url,
          children: [{ text: "" }],
        };
        Transforms.insertNodes(editor, newImage);
      }
    }
  }

  static insertListBlock(editor: Editor, type: string) {
    const isActive = this.isListActive(editor);
    console.log("isActive: ", isActive);
    if (isActive) {
      const [match] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === type,
      });
      if (match) {
        const [, path] = match;
        Transforms.removeNodes(editor, {
          at: path,
        });
      } else {
        Transforms.setNodes(
          editor,
          { type: type },
          {
            match: (n) =>
              Element.isElement(n) && LIST_TYPES.indexOf(n.type) !== -1,
          }
        );
      }
    } else {
      const newList: Descendant = {
        type: type,
        children: [{ type: "list_item", children: [{ text: "" }] }],
      };
      Transforms.insertNodes(editor, newList);
    }
  }

  static toggleInlineInput(editor: Editor): void {
    if (editor.selection) {
      const { selection } = editor;
      const isCollapsed = selection && Range.isCollapsed(selection);
      const input: InlineInputType = {
        type: "inlineInput",
        children: isCollapsed ? [{ text: "Enter me!" }] : [],
      };
      if (isCollapsed) {
        Transforms.insertNodes(editor, input);
      } else {
        Transforms.wrapNodes(editor, input, { split: true });
        Transforms.collapse(editor, { edge: "end" });
      }
    }
  }

  static getElementType(editor: Editor) {
    const [nodes] = Editor.nodes(editor);
    const node = nodes[0];
    if (node) {
      const children = (node as any).children;
      if (children) {
        const type = (children[0] as any).type;
        if (type) return type;
        else return undefined;
      } else return undefined;
    }
  }
  static serialize(editor: any, node: any): string {
    if (Text.isText(node)) {
      let string = escapeHtml(node.text);

      if (node.bold) {
        string = `<b>${string}</b>`;
      }
      if (node.italic) {
        string = `<i>${string}</i>`;
      }
      if (node.underline) {
        string = `<u>${string}</u>`;
      }

      return string;
    }

    if (Array.isArray(node)) {
      const result = node
        .map((item: any) => this.serialize(editor, item))
        .join("");
      return result;
    } else {
      if (node.children) {
        const children = node.children
          .map((n: any) => this.serialize(editor, n))
          .join("");

        switch (node.type) {
          case "quote":
            return `<blockquote><p>${children}</p></blockquote>`;
          case "paragraph":
          case "p":
            return `<p style="width:816px;height:76px">${children}</p>`;
          case "code":
            return `<pre><code>${children}</code></pre>`;
          case "link":
            return `<a href="${escapeHtml(node.url)}">${children}</a>`;
          case "page":
            return `<div style="width:816px;height:1056px;padding:60px;background:#fff;page-break-after: auto;">${children}</div>`;
          default:
            return children;
        }
      } else return "";
    }
  }

  static async coverHtmlToDocx(pageHtml: string[], fileName?: string) {
    if (pageHtml) {
      const defaultFileName = fileName ? fileName : "output.docx";
      pageHtml.map((page, index) => { });
      const htmlString = pageHtml
        .map((page, index) => {
          return page.replaceAll("page-break-after: auto;", "");
        })
        .join(
          '<div class="page-break" style="page-break-after: always;"></div>'
        );
      const data = await HTMLtoDOCX(htmlString, null, {
        pageNumber: true,
        pageSize: { width: 11907, height: 16839.9 },
      });
      saveAs(data, defaultFileName);
    }
  }

  static async coverHtmlToPdf(pageHtml: string[], fileName?: string) {
    const defaultFileName = fileName ? fileName : "output.pdf";
    if (pageHtml) {
      const doc = new jsPDF("p", "pt", "a4");
      for (let i = 0; i < pageHtml.length; i++) {
        const page = pageHtml[i];
        console.log("page: ", page);
        await doc.html(page.replaceAll(" ", "&nbsp"), {
          y: i * doc.internal.pageSize.getHeight(),
        });
        if (i != pageHtml.length - 1) {
          doc.addPage();
        }
      }
      doc.save(defaultFileName);
    }
  }

  static async coverHtmlToPdfImage(pageId: string[], fileName?: string) {
    if (pageId) {
      const option: jsPDFOptions = {
        orientation: 'p',
        unit: 'px',
        format: 'a4',
        putOnlyUsedFonts: true,
        floatPrecision: 16, // or "smart", default is 16,
        hotfixes: ["px_scaling"]
      }
      const defaultFileName = fileName ? fileName : "output.pdf";
      const doc = new jsPDF(option);
      for (let i = 0; i < pageId.length; i++) {
        const pageElement = document.getElementById(pageId[i]);
        if (pageElement) {
          console.log('pageEle: ', pageElement);
          const canvas = await html2canvas(pageElement, {
            onclone: (doc) => {
              const page = doc.getElementById(pageId[i]);
              if (page)
                page.style.boxShadow = "none";
            }
          });
          const img = canvas.toDataURL("image/png"); //轉換成 Data URL 表示格式的png圖檔
          console.log('canvas: ', canvas);
          doc.addImage(img, "PNG", 0, 0, canvas.width, canvas.height);
        }
        if (i !== pageId.length - 1) doc.addPage();
      }
      doc.save(defaultFileName);
    }
  }

  static toPx(value: any) {
    if (value) return `${Math.round(value)}px`;
    else return "";
  }

  static makeNodeId(node?: any) {
    const id = nanoid(16);
    return id;
  }

  static renderElementContent(props: any) {
    switch (props.element.type) {
      case "page":
        return <PageElement {...props} />;
      case "code":
        return <CodeElement {...props} />;
      case "grid_item":
        return <GridItemElement {...props} />;
      case "grid_container":
        return <GridContainerElement {...props} />;
      case "button":
        return <ButtonElement {...props} />;
      case "link":
        return <LinkElement {...props} />;
      case "image":
        return <ImageElement {...props} />;
      case "numbered_list":
        return <NumberedListElement {...props} />;
      case "bulleted_list":
        return <BulletedListElement {...props} />;
      case "list_item":
        return <ListItemElement {...props} />;
      case "inlineInput":
        return <InlineInputElement {...props} />;
      case "heading-one":
        return <HeadingElement {...props} />;
      case "heading-two":
        return <HeadingElement {...props} />;
      case "heading-three":
        return <HeadingElement {...props} />;
      case "heading-four":
        return <HeadingElement {...props} />;
      case "heading-five":
        return <HeadingElement {...props} />;
      case "heading-six":
        return <HeadingElement {...props} />;
      case "check-list-item":
        return <CheckBoxElement {...props} />;
      case "switch":
        return <SwitchElement {...props} />;
      case "selected":
        return <SelectedElement {...props} />;
      default:
        return <ParagraphElement {...props} />;
    }
  }

  static findTargetNodePath(editor: any, id: string): any[] {
    const path: any[] = [];
    if (editor.children && id) {
      for (const node of editor.children) {
        if (node.id === id) {
          path.push(editor.children.indexOf(node));
          return path;
        } else if (node.children) {
          const temp = Utils.findTargetNodePath(node, id);
          if (temp.length) {
            path.push(editor.children.indexOf(node));
            path.push(...temp);
            return path;
          }
        }
      }
    }
    return path;
  }

  static categoryTool: string[] = [
    "COMMON",
    "TEXT",
    "Form Fields",
    "BLOCK",
    "ADVANCED",
  ];
  static commonTools: string[][] = [
    [
      "Normal text",
      "Heading 1",
      "Heading 2",
      "Heading 3",
      "Heading 4",
      "Input",
      "Signature",
    ],
    [
      "Check List",
      "Bulleted List",
      "Ordered List",
      "Image",
      "Link",
      "File Attachment",
      "Table",
    ],
  ];
  static textTools: string[][] = [
    [
      "Normal text",
      "Heading 1",
      "Heading 2",
      "Heading 3",
      "Heading 4",
      "Heading 5",
      "Heading 6",
    ],
    [
      "Check List",
      "Bulleted List",
      "Ordered List",
      "Image",
      "Link",
      "File Attachment",
      "Table",
    ],
  ];
  static formTools: string[][] = [
    ["Input", "Checkbox", "Switch", "Selection"],
    ["Radio Group", "Signature", "Button"],
  ];
  static blockTools: string[][] = [
    ["Columns - 2", "Box", "Drawing"],
    ["Columns - 3", "Card"],
  ];
  static advancedTools: string[][] = [
    ["Calenda", "Sheet", "Price List"],
    ["Product Grid", "Bar Code", "Data Source fields"],
  ];
}
