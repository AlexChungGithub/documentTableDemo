import { Dialog, Button, TextField, Text, Flex } from "@radix-ui/themes"
import { useState } from "react"
import { ReactEditor } from "slate-react";
import { Transforms, Range } from "slate";
import Utils from "../../utils";
export default function SelectionDialog(props: any) {
  const [inputFields, setInputFields] = useState<string[]>([""]);
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);
  const [label, setLabel] = useState<string>("");
  const deleteText = () => {
    const { selection } = props.editor;
    if (selection) {
      const [start] = Range.edges(selection);
      Transforms.delete(props.editor, { at: start.path });
    }
  };
  const handleAddInputField = () => {
    setInputFields([...inputFields, '']);
    setButtonDisable(true)
  };
  const handleInputChange = (event: any, index: number) => {
    const newInputFields = [...inputFields];
    newInputFields[index] = event.target.value;
    setInputFields(newInputFields);
    inputInvalid() ? setButtonDisable(false) : setButtonDisable(true)
  };
  const handleLabelChange = (event: any) => {
    setLabel(event.target.value);
  };
  const createSelected = () => {
    props.updateDialogOpen("selection", false)
    Utils.toggleSelectedBlock(props.editor, inputFields, label);
    deleteText()
  }

  const cancel = () => {
    props.updateDialogOpen("selection", false)
    deleteText()
  }

  const inputInvalid = () => {
    inputFields.forEach(function (item) {
      if (item === "") {
        return false
      }
    });
    return true
  }

  return (
    <Dialog.Root open={props.open}>
      <Dialog.Content style={{ maxWidth: 450, maxHeight: 450 }}>
        <Dialog.Title>下拉式選項設定</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          請輸入下拉式選單標題
        </Dialog.Description>
        < TextField.Input
          placeholder="Title"
          onChange={(e) => handleLabelChange(e)}
        />
        <Dialog.Description size="2" mb="4">
          請輸入下拉式選單選項
        </Dialog.Description>
        <Flex direction="column" gap="3">
          {inputFields.map((value, index) => (
            < TextField.Input
              key={index}
              value={value}
              placeholder={"第" + (index + 1) + "個選項"}
              onChange={(e) => handleInputChange(e, index)}
            />
          ))}
          <Button onClick={handleAddInputField}>
            新增選項
          </Button>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button onClick={cancel} variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={createSelected} disabled={buttonDisable}>Create</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root >
  )
}




