import { Button, Text, Link, Flex } from "@radix-ui/themes";
import { FolderOpenDotIcon, FolderClosedIcon } from "lucide-react";
import {PlusIcon} from '@radix-ui/react-icons';
import { NewFolderDialog } from "@/components/folder/new.folder.dialog";

interface MoveDialogProps {
  buttonOnClick: ({...props}: {id: string | number, name: string}) => void;
  rootId: string;
}

export default function RootFolder ({...props}: MoveDialogProps) {
  const {rootId, buttonOnClick} = props;
  return (
    <Flex gap="2" align="center" justify="start">
      <NewFolderDialog parentId={rootId}>
        <Button variant="ghost" size="1" color="gray">
          <PlusIcon/>
        </Button>
      </NewFolderDialog>
      <Button variant="ghost" size="2" color="gray" onClick={()=>{ buttonOnClick({id: rootId, name: rootId}) }}>
        <FolderOpenDotIcon size={14}/>
        <Text style={{
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow:'hidden',
        }}>
          <Link>
            {rootId}
          </Link>
        </Text>
      </Button>
    </Flex>
  )
}