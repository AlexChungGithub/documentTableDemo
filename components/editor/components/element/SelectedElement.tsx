import { Text, Select } from "@radix-ui/themes"
import { ReactEditor } from "slate-react";
import { Transforms } from "slate";
export default function SelectedElement(props: any) {
  const handleSelectedChange = (event: string) => {
    const path = ReactEditor.findPath(props.editor, props.element);
    const newProperties: Partial<{}> = {
      value: event
    };
    Transforms.setNodes(props.editor, newProperties, { at: path });
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Text contentEditable={false} style={{ padding: "0.25em" }}>{props.element.label}</Text>
      <Select.Root defaultValue={props.element.options[0]} onValueChange={handleSelectedChange}>
        <Select.Trigger />
        <Select.Content >
          <Select.Group contentEditable={false}>
            {props.element.options.map((value: string, index: number) => (
              <Select.Item contentEditable={false} value={value} key={index} >{value}</Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Text style={{ padding: "0.25em" }}>{props.children}</Text>
    </div>
  )
}
