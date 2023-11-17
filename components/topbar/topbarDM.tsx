'use client';

import {
  Button,
  DropdownMenu,
} from '@radix-ui/themes';

import {
  DotsHorizontalIcon,
  GearIcon,
} from '@radix-ui/react-icons';
import * as React from 'react'

export default function Topbar() {
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button color='gray' variant="ghost">
            <DotsHorizontalIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content color='gray'>
          <DropdownMenu.Item shortcut="⌘ E">New Nested Doc</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item shortcut="⌘ E">Duplicate</DropdownMenu.Item>
          <DropdownMenu.Item shortcut="⌘ E">Unpublish</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item shortcut="⌘ E">Templatize</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item shortcut="⌘ E">Preview</DropdownMenu.Item>
          <DropdownMenu.Item shortcut="⌘ E">Run</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>Import</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item>Docx</DropdownMenu.Item>
              <DropdownMenu.Item>Markdown</DropdownMenu.Item>
              <DropdownMenu.Item>PDF</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>Export</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item>Docx</DropdownMenu.Item>
              <DropdownMenu.Item>Markdown</DropdownMenu.Item>
              <DropdownMenu.Item>PDF</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
          <DropdownMenu.Separator />
          <DropdownMenu.Item shortcut="⌘ E">Integration</DropdownMenu.Item>
          <DropdownMenu.Item shortcut="⌘ E">Email</DropdownMenu.Item>
          <DropdownMenu.Item shortcut="⌘ E">Automation</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item shortcut="⌘ E">Invite Users</DropdownMenu.Item>
          <DropdownMenu.Item shortcut="⌘ D"><GearIcon />Settings</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  )
}



