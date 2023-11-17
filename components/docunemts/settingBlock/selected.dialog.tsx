import { Flex, Dialog, Button, TextField, Select,  } from "@radix-ui/themes";

import * as React from "react";

type SelectedDialogElement = React.ElementRef<typeof Button>;
interface SelectedDialogProps extends React.ComponentPropsWithoutRef<typeof Button> {
  contentTitle: string;
  itemList: {id: string, name: string}[];
  saveButtonProps?: React.ComponentPropsWithoutRef<typeof Button>;
  cancelButtonProps?:React.ComponentPropsWithoutRef<typeof Button>;
  handleSelected?: (selectrd: string)=> void
}

const SelectedDialog = React.forwardRef<SelectedDialogElement, SelectedDialogProps>(
  (props, ref) => {
    const { handleSelected = () => {}, contentTitle, itemList, children, saveButtonProps, cancelButtonProps, ...otherProps } = props;
    const [selected, setSelected] = React.useState(itemList[0].id || '');
    return (
      <Dialog.Root>
        <Dialog.Trigger>
          <Button {...otherProps}>
            {children}
          </Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>{contentTitle}</Dialog.Title>

          <Flex direction="column" gap="3">
            <Select.Root defaultValue={`${selected}`} onValueChange={(val)=>{setSelected(val)}}>
              <Select.Trigger placeholder='select status...' />
              <Select.Content>
                <Select.Group>
                  {itemList.map(item => (<Select.Item key={item.id} value={item.id}>{item.name}</Select.Item>))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
                <Button variant="soft" color="gray" {...cancelButtonProps}>
                  {cancelButtonProps?.children || 'Cancel'}
                </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button {...saveButtonProps} onClick={(e) => {
                if (saveButtonProps?.onClick) {
                  saveButtonProps.onClick(e);
                }
                handleSelected(selected);
              }}>
                {saveButtonProps?.children || 'Save'}
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    );
  }
);
SelectedDialog.displayName = "SelectedDialog";
export default SelectedDialog;
