'use client'
import { Text, TextField, Separator, Flex,Select,IconButton } from '@radix-ui/themes';
import { ChevronDownIcon, DotsHorizontalIcon,PlusIcon } from '@radix-ui/react-icons';
export default function settings() {

  return (
  <Flex direction="column" gap="2">
    <Text>Document Meta Information</Text>
    <Flex direction="row" align="center" justify="between" pl="2" gap="1" grow="1">
      <Text size="2">Title</Text>
      <TextField.Root size="1">
        <TextField.Input placeholder="Title-1"/>
      </TextField.Root>
    </Flex>
    <Flex direction="row" align="center" justify="between" pl="2" gap="1" grow="1">
      <Text  size="2">Status</Text>
      <TextField.Root size="1">
        <TextField.Input placeholder="draft"/>
      </TextField.Root>
    </Flex>
    <Flex direction="row" align="center" justify="between" pl="2" gap="1" grow="1">
      <Text size="2">Modified by</Text>
      <TextField.Root size="1">
        <TextField.Input placeholder="@John.done"/>
      </TextField.Root>
    </Flex>
    <Separator size="4"/>
    <Flex align="center" justify="between">
      <Text>Share/Permission</Text>
      <IconButton size="1" color="gray" variant="ghost"><DotsHorizontalIcon/></IconButton>
    </Flex>
    <Flex align="center" justify="between">
      <Text>Notifications</Text>
      <Flex gap="2">
        <IconButton size="1" color="gray" variant="ghost"><DotsHorizontalIcon/></IconButton>
        <IconButton size="1" color="gray" variant="ghost"><PlusIcon/></IconButton>
      </Flex>
    </Flex>
    <Flex direction="column" pl="2"  gap="1" grow="1">
      <Text size="2">Action</Text>
      <TextField.Root size="1">
        <TextField.Input placeholder="To generate documents"/>
      </TextField.Root>
    </Flex>
    <Flex direction="column" pl="2"  gap="1" grow="1">
      <Text size="2">Trigger Method</Text>
      <Select.Root defaultValue="manually"  size="1" >
        <Select.Trigger />
        <Select.Content color="gray">
            <Select.Item value="manually">Manually</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  </Flex>)
}