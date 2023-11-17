'use client';

import {
  Select
} from '@radix-ui/themes';

import * as React from 'react'


export default function TopbarLang() {
  return (
    <>
     <Select.Root size="1" defaultValue="EN">
      <Select.Trigger />
      <Select.Content color="gray">
          <Select.Item value="EN">EN</Select.Item>
          <Select.Item value="zhCN">zh-CN</Select.Item>
      </Select.Content>
    </Select.Root>
    </>
  )
}