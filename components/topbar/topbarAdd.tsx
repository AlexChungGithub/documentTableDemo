'use client';

import {
  Button,
  DropdownMenu,
} from '@radix-ui/themes';

import {
  PlusIcon,
} from '@radix-ui/react-icons';
import * as React from 'react'
import { useRouter } from 'next/navigation'

export default function TopbarAdd() {
  const router = useRouter()
  function newDoc(){
    router.push('/document')
  }
  function newTemp(){
    router.push('/template')
  }
  return (
    <>
     <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button highContrast size="1">
            <PlusIcon />Add
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content color='gray' >
          <DropdownMenu.Item shortcut="⌘ E" onClick={()=>{
            newDoc()
          }}>Document</DropdownMenu.Item>
          <DropdownMenu.Item shortcut="⌘ E" onClick={()=>{
            newTemp()
          }}>Template</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  )
}



