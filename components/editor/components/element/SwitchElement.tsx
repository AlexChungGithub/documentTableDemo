import { Switch, Text, Flex } from "@radix-ui/themes"
import { useState } from "react"
import { ReactEditor } from "slate-react";
import { Transforms } from "slate";
export default function SwitchElement(props: any) {
  const [checked, setChecked] = useState<boolean>(false)
  const handleSwitchChange = (event: boolean) => {
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
        <Switch checked={checked} onCheckedChange={handleSwitchChange} /> {props.children}
      </Flex>
    </Text>
  )
}
