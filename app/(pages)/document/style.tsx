'use client'
import { Text, TextField, Separator, Flex,Select,IconButton } from '@radix-ui/themes';
import { ChevronDownIcon, DotsHorizontalIcon,PlusIcon,TokensIcon } from '@radix-ui/react-icons';
export default function style() {

  return (
  <Flex direction="column" gap="2">
    <Text>Style</Text>
    <Flex direction="column" pl="2"  gap="1" grow="1">
      <Flex align="center" justify="between">
        <Text size="2">Background</Text>
        <Flex gap="2">
          <IconButton size="1" color="gray" variant="ghost"><TokensIcon/></IconButton>
          <IconButton size="1" color="gray" variant="ghost"><PlusIcon/></IconButton>
        </Flex>
      </Flex>
      <TextField.Root size="1">
        <TextField.Input placeholder="placeholder"/>
      </TextField.Root>
    </Flex>
    <Flex direction="column" pl="2"  gap="1" grow="1">
      <Flex align="center" justify="between">
        <Text size="2">Cover page</Text>
        <Flex gap="2">
          <IconButton size="1" color="gray" variant="ghost"><DotsHorizontalIcon/></IconButton>
          <IconButton size="1" color="gray" variant="ghost"><PlusIcon/></IconButton>
        </Flex>
      </Flex>
      <TextField.Root size="1">
        <TextField.Input placeholder="placeholder"/>
      </TextField.Root>
    </Flex>
    <Flex align="center" justify="between">
      <Text>Page Size</Text>
      <IconButton size="1" color="gray" variant="ghost"><ChevronDownIcon/></IconButton>
    </Flex>
  </Flex>)
}