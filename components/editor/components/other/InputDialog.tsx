import { Dialog, Button, TextField, Text, Flex } from "@radix-ui/themes"
import SelectionDialog from "./SelectionDialog"

export default function InputDialog(props: any) {
  switch (props.type) {
    case "selection":
      return (
        <SelectionDialog
          open={props.open}
          updateTargetTool={props.updateTargetTool}
          updateDialogOpen={props.updateDialogOpen}
          editor={props.editor}
        />
      )
    default:
      return (
        <SelectionDialog
          open={props.open}
          updateTargetTool={props.updateTargetTool}
          updateDialogOpen={props.updateDialogOpen}
          editor={props.editor}
        />
      )
  }
}




