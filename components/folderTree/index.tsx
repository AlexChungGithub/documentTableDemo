'use client'
import { 
  Flex,
  Button,
  Text,
  Link,
  DropdownMenu,
} from '@radix-ui/themes';

import { 
  DotsVerticalIcon,
  CaretDownIcon,
  CaretRightIcon,
  FileTextIcon,
  FilePlusIcon,
  PlusIcon,
  MinusIcon

} from '@radix-ui/react-icons';
import {
  FolderOpenDotIcon,
  FolderClosedIcon,
  FolderPlusIcon,
  FolderXIcon
} from 'lucide-react';
import { forwardRef, useEffect, useState } from 'react';
import {
  Tree,
  getBackendOptions,
  MultiBackend,
  NodeModel,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import folderList from './sample-default-folder.json';
import { NewFolderDialog } from '../folder/new.folder.dialog';

type FolderTreeElement = React.ElementRef<typeof Tree>;
interface FolderTreeProps {
  rootId: string;
  buttonOnClick?: ({...props}: {id: string | number, name: string}) => void
  currentFolderId?: string;
}


const FolderTree = forwardRef<FolderTreeElement, FolderTreeProps>(
  (props, ref) => {
    const { rootId, buttonOnClick = () => {}, currentFolderId } = props;
    const [treeData, setTreeData] = useState<NodeModel[]>(folderList);
    const initOpen: {[key: string|number]: boolean|undefined} = {}
    treeData.forEach(data=> {
      initOpen[data.id] = undefined;
    })
    const [menuOpen, setMenuOpen] = useState(initOpen);
    const handleOpen = (id: string| number, value: boolean|undefined) => {
      setMenuOpen({...menuOpen, [id]: value});
    }

    const handleDrop = (newTreeData: NodeModel[]) => {
      setTreeData(newTreeData)
    }
    return (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Tree
          tree={treeData}
          rootId={rootId}
          onDrop={handleDrop}
          listComponent='div'
          listItemComponent='div'
          enableAnimateExpand
          render={(node, { depth, isOpen, onToggle }) => {
            return (
              <Flex gap="2" align="center" justify="start" mt="3" style={{ marginLeft: depth * 28 }}>
                <Button variant="ghost" size="1" color="gray" highContrast  onClick={onToggle}>
                  {isOpen? <CaretDownIcon/>: <CaretRightIcon/>}
                </Button>
                <Button variant="ghost" size="2" color="gray" highContrast value={node.id} onClick={()=>{ buttonOnClick({id: node.id, name: node.text}) }}>
                  {isOpen? <FolderOpenDotIcon size={14}/>: <FolderClosedIcon size={14}/>}
                  <Text style={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow:'hidden',
                  }}>
                    <Link>
                      {node.text}
                    </Link>
                  </Text>
                </Button>

                {isOpen &&
                  <DropdownMenu.Root open={menuOpen[node.id]}>
                  <DropdownMenu.Trigger>
                    <Button variant="ghost" color="gray">
                      <DotsVerticalIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content color="gray" variant="soft">
                      <NewFolderDialog
                        parentId={node.id}
                        closeCallBack={()=>{handleOpen( node.id, undefined)}}
                      >
                      <DropdownMenu.Item 
                        onClick={()=>{handleOpen(node.id, true)}}
                      >
                            <FolderPlusIcon size={14}/>
                            New Folder
                      </DropdownMenu.Item>
                      </NewFolderDialog>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item color="red">
                      <Flex gap="1" align='center'>
                        <FolderXIcon size={14}/>
                        Delete Folder
                      </Flex>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
                }
              </Flex>
            );
          }}
        />
      </DndProvider>
    )
  }
);
FolderTree.displayName = "FolderTree";
export default FolderTree;

