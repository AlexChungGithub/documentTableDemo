import { Flex, Dialog, Button, Text, Box, Strong, Em  } from "@radix-ui/themes";
import * as React from "react";
import FolderTree from "@/components/folderTree";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { FolderClosedIcon } from "lucide-react";
import RootFolder from "./rootFolder";
interface MoveDialogProps extends React.ComponentPropsWithoutRef<typeof Button> {
  clickSaveCallback?: (folderId: string)=> void;
  currentFolderId: string;
}

export default function MoveDialog(props: MoveDialogProps) {
    const rootFolderId = 'root';
    const { clickSaveCallback = () => {}, currentFolderId } = props;
    const [selectedFolderInfo, setSelectedFolderInfo] = React.useState<{id: number|string, name: string}>({id: rootFolderId, name: rootFolderId});
    const initSelected = () => {
      setSelectedFolderInfo({id: rootFolderId, name: rootFolderId});
    }
    return (
      <Dialog.Root>
        <Dialog.Trigger>
          <Button
            size="2"
            variant='outline'
            radius="large"
            style={{
              boxShadow: 'var(--shadow-2)',
            }}
          >
            <ArrowRightIcon />Move
          </Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Move Documents</Dialog.Title>
          <Flex direction="column" gap="2">
            <Box style={{
              height:150,
              borderRadius: 10,
              backgroundColor: 'ButtonFace',
              display: "block",
              overflowX: "auto",
              whiteSpace: 'nowrap',
            }}>
              <Flex mt='3' ml='3'>
                <RootFolder rootId={rootFolderId} buttonOnClick={(info) => {setSelectedFolderInfo(info)}}/>
              </Flex>
              <Flex ml='5'>
                <FolderTree
                  rootId={rootFolderId}
                  currentFolderId={currentFolderId}
                  buttonOnClick={(info) => {setSelectedFolderInfo(info)}}
                />
              </Flex>
            </Box>

            <Flex align='center' gap='2'>
              <Text size='3'>
                <Strong>Move to:</Strong>
              </Text>
              <Box style={{
                backgroundColor: 'ButtonFace',
                borderRadius: '10px'
              }}>
                <Flex align='center' gap='1' mt='1' ml='1' mr='1' mb='1'>
                  <FolderClosedIcon size={14}/><Text size='2'>{selectedFolderInfo.name}</Text>
                </Flex>
              </Box>
            </Flex>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
                <Button variant="soft" color="gray" onClick={()=>initSelected()}>
                  Cancel
                </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={() => {
                clickSaveCallback(selectedFolderInfo.id.toString());
                initSelected();
              }}>
                Save
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    );
  }
