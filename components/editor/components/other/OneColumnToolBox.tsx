import { useState } from "react";
import { Portal } from "./Portal";
import Utils from "../../utils";
import { Transforms, Range } from "slate";
import {
    TextIcon,
    InputIcon,
    ListBulletIcon,
    ImageIcon,
    TableIcon,
    CheckboxIcon,
    SwitchIcon,
    RadiobuttonIcon,
    ButtonIcon,
    BoxIcon,
    CalendarIcon
} from "@radix-ui/react-icons";
import {
    LinkIcon,
    Paperclip,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    ScanLine,
    ListChecks,
    ListOrdered,
    Columns,
    Spline,
    CreditCard,
    Sheet,
    LayoutGrid,
    Barcode,
    Database
} from "lucide-react"

export default function OneColumnToolBox(props: {
    top: string;
    left: string;
    tools: string[][];
    category: string[];
    updateTargetTool: any
    updateDialogOpen: any
    editor: any;
}) {
    const [row, setRow] = useState<number | null>(null)
    const [categoryIndex, setCategoryIndex] = useState<number | null>(null)

    const deleteText = () => {
        const { selection } = props.editor;
        if (selection) {
            const [start] = Range.edges(selection);
            Transforms.delete(props.editor, { at: start.path });
        }
    };

    return (
        <Portal>
            <div
                style={{
                    top: `${props.top}`,
                    left: `${props.left}`,
                    position: "absolute",
                    zIndex: 1,
                    padding: "3px",
                    background: "white",
                    borderRadius: "4px",
                    boxShadow: "0 1px 5px rgba(0,0,0,.2)",
                    maxHeight: "300px",
                    overflow: "auto"
                }}
                data-cy="mentions-portal"
            >
                {props.tools.map((tool, i) => (
                    <div key={i} >
                        <div style={{ color: "#A9A9A9", fontSize: "12px" }}>{props.category[i]}</div>
                        {tool.map((action, rowIndex) => (
                            <div
                                key={rowIndex}
                                style={{
                                    width: "150px",
                                    background:
                                        i === categoryIndex && rowIndex === row
                                            ? "lightblue"
                                            : "white"
                                }}
                                onClick={() => {
                                    if (action === "Normal text") {
                                        Utils.toggleNormalTextBlock(props.editor);
                                        deleteText()
                                    }
                                    if (action === "Heading 1") {
                                        Utils.toggleHeading1Block(props.editor, true);
                                        deleteText()
                                    }
                                    if (action === "Heading 2") {
                                        Utils.toggleHeading2Block(props.editor, true);
                                        deleteText()
                                    }
                                    if (action === "Heading 3") {
                                        Utils.toggleHeading3Block(props.editor, true);
                                        deleteText()
                                    }
                                    if (action === "Heading 4") {
                                        Utils.toggleHeading4Block(props.editor, true);
                                        deleteText()
                                    }
                                    if (action === "Heading 5") {
                                        Utils.toggleHeading5Block(props.editor, true);
                                        deleteText()
                                    }
                                    if (action === "Heading 6") {
                                        Utils.toggleHeading6Block(props.editor, true);
                                        deleteText()
                                    }
                                    if (action === "Checkbox") {
                                        Utils.toggleCheckBoxBlock(props.editor);
                                        deleteText()
                                    }
                                    if (action === "Switch") {
                                        Utils.toggleSwitchBlock(props.editor);
                                        deleteText()
                                    }
                                    window.setTimeout(() => {
                                        props.updateTargetTool(undefined)
                                        if (action === "Selection") {
                                            props.updateDialogOpen("selection", true)
                                        }
                                    }, 0);
                                }}
                                onMouseEnter={() => {
                                    setRow(rowIndex);
                                    setCategoryIndex(i);
                                }}
                                onMouseLeave={() => {
                                    setRow(null);
                                    setCategoryIndex(null);
                                }}
                            >
                                <div style={{ display: "flex", padding: "5px" }}>
                                    {action === "Normal text" && (
                                        <TextIcon height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Heading 1" && (
                                        <Heading1 height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Heading 2" && (
                                        <Heading2 height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Heading 3" && (
                                        <Heading3 height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Heading 4" && (
                                        <Heading4 height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Heading 5" && (
                                        <Heading5 height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Heading 6" && (
                                        <Heading6 height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Input" && (
                                        <InputIcon height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Signature" && (
                                        <ScanLine height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Check List" && (
                                        <ListChecks height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Bulleted List" && (
                                        <ListBulletIcon height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Ordered List" && (
                                        <ListOrdered height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Image" && (
                                        <ImageIcon height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Link" && (
                                        <LinkIcon height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "File Attachment" && (
                                        <Paperclip height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Table" && (
                                        <TableIcon height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Checkbox" && (
                                        <CheckboxIcon height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Switch" && (
                                        <SwitchIcon height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Selection" && (
                                        <ListBulletIcon height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Radio Group" && (
                                        <RadiobuttonIcon height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Button" && (
                                        <ButtonIcon height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Columns - 2" && (
                                        <Columns height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Columns - 3" && (
                                        <Columns height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Box" && (
                                        <BoxIcon height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Drawing" && (
                                        <Spline height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Card" && (
                                        <CreditCard height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Calenda" && (
                                        <CalendarIcon height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Sheet" && (
                                        <Sheet height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Price List" && (
                                        <TableIcon height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Product Grid" && (
                                        <LayoutGrid height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Bar Code" && (
                                        <Barcode height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}
                                    {action === "Data Source fields" && (
                                        <Database height="22" width="22" style={{ paddingRight: "10px" }} />
                                    )}

                                    {action}
                                </div>
                            </div>
                        ))}
                        {i !== props.tools.length - 1 && (
                            <div style={{
                                height: "1px",
                                backgroundColor: "#D3D3D3"
                            }}></div>
                        )}
                    </div>
                ))}
            </div>
        </Portal >
    );
}
