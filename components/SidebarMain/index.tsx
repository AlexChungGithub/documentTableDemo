'use client';

import {
  Flex,
  Button,
  Box,
  DropdownMenu,
  IconButton,
  Heading,
  Checkbox,
  Separator,
  Container,
  Link,
} from '@radix-ui/themes';

import {
  DashboardIcon,
  StarFilledIcon,
  TimerIcon,
  DotsHorizontalIcon,
  MixIcon,
  ArchiveIcon,
  TrashIcon,
  GearIcon,
  HamburgerMenuIcon,
  ExitIcon,
  Pencil2Icon,
  PlusIcon,
  DotsVerticalIcon
} from '@radix-ui/react-icons';
import {
  LibraryIcon,
  LayoutTemplateIcon,
  UsersIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react'
import './sidebarMain.css'
import SidebarLabel from './sidebarLabel'
import FolderTree from '../folderTree';
import { usePathname, useRouter } from 'next/navigation'
import { NewFolderDialog } from '../folder/new.folder.dialog';

export interface FolderInfo {
  id?: string;
}

export default function SidebarMain() {
  const path = usePathname().split('/')[1];
  const router = useRouter();

  const [open, setOpen] = useState(true)
  useEffect(() => {
    if (sessionStorage.getItem('sidebarMainIsOpen') === 'true') {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [])

  function sidebarIconOnclick() {
    const setValue = !open
    setOpen(setValue)
    sessionStorage.setItem('sidebarMainIsOpen', setValue.toString())
  }

  return (
    <>
      {/* IconButton */}
      <Box className='sidebarIconButton' position='absolute' >
        <IconButton variant='ghost' style={{
          width: '20px',
          height: '20px',
          borderRadius: '20px',
          boxShadow: 'var(--shadow-2)',
        }} onClick={() => { sidebarIconOnclick() }}>
          <HamburgerMenuIcon width="18" height="18" />
        </IconButton>
      </Box>
      {/* Sidebar */}
      <Container className='sidebarMain' grow='0' data-state={open ? 'open' : 'close'} style={{
        width: '240px',
        height: '100vh',
        background: 'var(--slate-2)',
        boxShadow: 'var(--shadow-2)'
      }}>
        <Box className='sidebarHeader'>
          <Flex justify='between' align='center' height='7' p='4'>
            <Box width='1'></Box>
            <Heading size="4">Workspace</Heading>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <IconButton variant="ghost" size="2">
                  <DotsHorizontalIcon />
                </IconButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item shortcut="⌘ E">
                  <Button variant="ghost">
                    <PlusIcon />New Workspace
                  </Button>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item shortcut="⌘ D">
                  <Flex gap="1">
                    <Checkbox defaultChecked />Workspace
                  </Flex>
                </DropdownMenu.Item>
                <DropdownMenu.Item shortcut="⌘ D">
                  <Flex gap="1">
                    <Checkbox />Workspace-1
                  </Flex>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>
        </Box>
        <Separator size="4" />
        <SidebarLabel>
          <DashboardIcon /><Link href="/dashboard">Dashboard</Link>
        </SidebarLabel>
        <SidebarLabel>
          <StarFilledIcon /><Link href="/stars">Stars</Link>
        </SidebarLabel>
        <SidebarLabel>
          <TimerIcon /><Link href="/recent">Recent</Link>
        </SidebarLabel>
        <SidebarLabel>
          <Pencil2Icon /><Link href="/draft">Draft</Link>
        </SidebarLabel>
        <SidebarLabel>
          <MixIcon /><Link href="/contentLibrary">Content Library</Link>
        </SidebarLabel>

        <SidebarLabel>
          <LibraryIcon size={16} /><Link onClick={() => { router.push(`/documents/root`) }}>Documents</Link>
          {path === 'documents' &&
            <NewFolderDialog parentId='root'>
              <Link mt="2"><DotsVerticalIcon /></Link>
            </NewFolderDialog>
          }
        </SidebarLabel>
        <Box mt="-3" ml="9" style={{
          display: "block",
          overflowX: "auto",
          whiteSpace: 'nowrap',
        }}>
          <FolderTree rootId='root' buttonOnClick={(folderInfo) => {
            router.push(`/documents/${folderInfo.id}`);
          }} />
        </Box>

        <SidebarLabel>
          <LayoutTemplateIcon size={16} /><Link href="/templates">Templates</Link>
        </SidebarLabel>
        <Separator size="4" />
        <SidebarLabel>
          <ArchiveIcon /><Link href="/archive">Archive</Link>
        </SidebarLabel>
        <SidebarLabel>
          <TrashIcon /><Link href="/trash">Trash</Link>
        </SidebarLabel>
        <SidebarLabel>
          <UsersIcon size={16} /><Link href="/team">Team</Link>
        </SidebarLabel>
        <Separator size="4" />
        <SidebarLabel>
          <GearIcon /><Link href="/settings">Settings</Link>
        </SidebarLabel>
        <Separator size="4" />
        <SidebarLabel color="red">
          <ExitIcon />Log out
        </SidebarLabel>
      </Container>
    </>
  )
}



