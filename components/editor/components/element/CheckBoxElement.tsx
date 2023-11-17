import { Checkbox, Text, Flex } from "@radix-ui/themes"
import { useState } from "react"
import { ReactEditor } from "slate-react";
import { Transforms } from "slate";
export default function CheckBoxElement(props: any) {
  const [checked, setChecked] = useState<boolean>(false)
  const handleCheckboxChange = (event: boolean) => {
    setChecked(event);
    const path = ReactEditor.findPath(props.editor, props.element);
    const newProperties: Partial<{}> = {
      checked: event
    };
    Transforms.setNodes(props.editor, newProperties, { at: path });
  };

  return (
    <Text as="label" size="2">
      <Flex gap="2">
        <Checkbox checked={checked} onCheckedChange={handleCheckboxChange} /> {props.children}
      </Flex>
    </Text>
  )
}
