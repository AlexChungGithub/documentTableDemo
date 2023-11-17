'use client';
import {
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Box,
  DropdownMenu,
  Checkbox,
  Separator,
  IconButton,
  Popover,
  ScrollArea
} from '@radix-ui/themes';

import {
  DashboardIcon,
  StarFilledIcon,
  TimerIcon,
  DotIcon,
  DotsHorizontalIcon,
  MixIcon,
  ArchiveIcon,
  TrashIcon,
  GearIcon,
  HamburgerMenuIcon,
  ExitIcon,
  Pencil2Icon,


} from '@radix-ui/react-icons';

import {
  LibraryIcon,
  LayoutTemplateIcon,
  UsersIcon
} from 'lucide-react';

import Example1 from './Example1'

export default function PageFrame() {
  return (
    <Flex justify="center">

      <Box mt="4" style={{
        width: 595,
        height: 842,
        background: 'var(--gray-a2)',
        borderRadius: 'var(--radius-3)',
        boxShadow: 'var(--shadow-4)'
      }}>
        <Flex direction="column" gap="1" p="2" mt="4" ml="3" mr="3" justify="start">
          <Example1 />
        </Flex>
      </Box>
    </Flex>
  )
}