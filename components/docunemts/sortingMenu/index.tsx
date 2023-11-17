import { CaretSortIcon, EyeNoneIcon, ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu, Flex } from "@radix-ui/themes";
import { UseStateType } from "@/components/docunemts/typedef";
import { useState } from "react";

export function SortingMenu(
  {...props}: { 
    sortingCallback?: (sortingType: number) => void;
    hideCallback?: () => void;
    children: React.ReactNode;
  }
) {
  const { children, sortingCallback = (sortingType: number) => {}, hideCallback = () => {} } = props;
  const [sorting, setSorting] = useState(0);
  const titleIcon = !sorting ? <CaretSortIcon/> : sorting === 1 ? <ArrowUpIcon/> : <ArrowDownIcon/>;
  const soetingOnClick = (sortingType: number) => {
    setSorting(sortingType);
    sortingCallback(sortingType);
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant='ghost' size='2'>
          {children}{titleIcon}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content variant="soft" align="start">
        <DropdownMenu.Item onClick={()=> { soetingOnClick(1) }}>
          <Flex gap="2" align="center" justify="start">
            <ArrowUpIcon/>Asc
          </Flex>
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={()=> { soetingOnClick(-1) }}>
          <Flex gap="2" align="center" justify="start">
            <ArrowDownIcon/>Desc
          </Flex>
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={()=> { soetingOnClick(0) }}>
          <Flex gap="2" align="center" justify="start">
            <CaretSortIcon/>Default
          </Flex>
        </DropdownMenu.Item>

        <DropdownMenu.Separator/>

        <DropdownMenu.Item onClick={()=>{ hideCallback() }}>
          <Flex gap="2" align="center" justify="start">
            <EyeNoneIcon/>Hide
          </Flex>
        </DropdownMenu.Item>

      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}