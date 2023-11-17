import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Flex, Strong, Select, IconButton, Text } from "@radix-ui/themes";
import { UseStateType } from "@/components/docunemts/typedef";


export interface PageInfo {
  currentPage: number;
  totalRows: number;
  rowLimit: number;
}

export function PageController(
  {...props}: {
    text?: string;
    pageItems?: string[];
    pageInfo: PageInfo;
    changeRowLimitCallback: (newLimit: number) => void;
    changeCurrentPageCallback: (newPage: number) => void;
  }
) {
  const { text = '', pageItems = ['10', '15', '20'], pageInfo, changeCurrentPageCallback, changeRowLimitCallback } = props;
  const { currentPage, rowLimit, totalRows } = pageInfo;
  const totalPages = Math.ceil(totalRows / rowLimit);
  const checkDisabled = (type: 'next' | 'prev') => {
    const check = {
      next: currentPage < totalPages,
      prev: currentPage > 1,
    }
    return !check[type];
  }

  const changePage = (type: 'start' | 'end' | 'next' | 'prev') => {
    if(type === 'start') {
      changeCurrentPageCallback(1);
    } else if (type === 'prev') {
      const newPage = currentPage - 1;
      changeCurrentPageCallback(newPage < 1 ? 1 : newPage);
    } else if (type === 'next') {
      const newPage = currentPage + 1;
      changeCurrentPageCallback(newPage > totalPages ? totalPages : newPage);
    } else if (type === 'end') {
      changeCurrentPageCallback(totalPages);
    }
  }

  return (
    <Flex justify="between" align="center" mt="3">
      <Text color='gray' size="2" ml="2">{text}</Text>
      <Flex gap="8" justify="between" mr="3" align="center">
        <Flex gap='2' align="center">
          <Text size="3"><Strong>Rows per page</Strong></Text>
          <Select.Root defaultValue={`${rowLimit}`} onValueChange={(val)=>{changeRowLimitCallback(parseInt(val))}}>
            <Select.Trigger/>
            <Select.Content>
              {pageItems.map(item=>(<Select.Item key={item} value={item}>{item}</Select.Item>))}
            </Select.Content>
          </Select.Root>
        </Flex>
        <Text size="2">Page {currentPage} of {totalPages}</Text>
        <Flex gap="2" justify="between" align="center">
          <IconButton variant="outline" disabled={checkDisabled('prev')} onClick={()=>changePage('start')}><DoubleArrowLeftIcon/></IconButton>
          <IconButton variant="outline" disabled={checkDisabled('prev')} onClick={()=>changePage('prev')}><ChevronLeftIcon/></IconButton>
          <IconButton variant="outline" disabled={checkDisabled('next')} onClick={()=>changePage('next')}><ChevronRightIcon/></IconButton>
          <IconButton variant="outline" disabled={checkDisabled('next')} onClick={()=>changePage('end')}><DoubleArrowRightIcon/></IconButton>
        </Flex>
      </Flex>
    </Flex>
  )
}