import { Text, Flex, Button, Dialog, Link, TextField } from "@radix-ui/themes";

interface NewFolderDialogProps {
  closeCallBack?: ()=> void;
  children: React.ReactNode;
  parentId: string | number;
}

export function NewFolderDialog({...props}: NewFolderDialogProps) {
  const { children, closeCallBack = ()=>{} } = props;
  return (
    <Dialog.Root onOpenChange={(open)=> {
      if(!open) {
        closeCallBack();
      }
    }}>
      <Dialog.Trigger>
        {children}
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: 300 }}>
        <Dialog.Title>New Folder</Dialog.Title>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Input
              placeholder="Enter new folder name..."
            />
          </label>
        </Flex>
        <Flex gap="3" mt="5" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}