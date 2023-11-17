import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

//custom inline input
export type InlineInputType = {
  type: "inlineInput"; children: Descendant[]
};

//custom text
type CustomText = {
  id?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  deleteline?: boolean;
  highlight?: boolean;
  subscript?: boolean;
  superscript?: boolean;
  haveComment?: boolean;
  comments?: string[];
};

// custom element
type CustomElement = { id?: string; type: string; align?: string; url?: string; children?: (CustomText | CustomElement)[] };

declare module "slate" {
  interface CustomTypes {
    Editor:
    | (BaseEditor & ReactEditor & HistoryEditor)
    | BaseEditor
    | ReactEditor
    | HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
