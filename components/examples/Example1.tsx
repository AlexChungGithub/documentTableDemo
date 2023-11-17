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
  Badge,
  Strong,
  RadioGroup,
  Table
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
  UsersIcon,
  MessageSquareIcon
} from 'lucide-react';
import Head from 'next/head';


export default function Example1() {
  return (
    <Flex direction="column" ml="4" mr="4">
      <Heading size="4" align="center" mt="2" mb="4">法人（團體）身份確認聲明書</Heading>
      <Flex gap="3" align="center" justify="center" pl="5" pr="5">
        <Flex gap="1">
          <Text as="label" size="1">Tags: </Text>
          <Badge size="1" color="blue">ISO</Badge>
          <Badge size="1" color="red">Application</Badge>
        </Flex>
        <Flex gap="1" align="center">
          <MessageSquareIcon size={ 16 } />
          <Text size="1">2 commnets</Text>
        </Flex>
        <Flex>
        <Text as="label" size="1">Updated: </Text>
        <Text as="label" size="1">2023.10.15 13:56:23 </Text>
        </Flex>
      </Flex>

      <Flex direction="column" mt="4" gap="2">
        <Heading size="1">法人(團體)身分確認聲明書</Heading>
        <Text size="1">敬愛的客戶，您好：</Text>
        <Text as="p" size="1">依台灣防制洗錢及打擊資助恐怖主義相關法規要求，敬請填寫本客戶身分確認聲明書。請注意倘未能提供正確且必要之資訊，我們依法將可能無法承接所委託之案件。</Text>
        <Heading size="1">基本資料</Heading>
        <Text size="1">1. 公司（團體）名稱：AMC HOLDINGS LIMITED</Text>
        <Text size="1">2. 登記營業地址：台北市信義區信義路三段200號</Text>
        <Text size="1">主要營業處所地址是否同上述登記地址</Text>
        <Flex align="center" gap="1">
          <Checkbox />
          <Text size="1">是</Text>
        </Flex>  
        <Flex align="center" gap="1">
          <Checkbox />
          <Text size="1">否，</Text>
          <Text size="1">營業處所為： </Text>
          <Text size="1">台北市松山區松山路三段100號</Text>
        </Flex>
        <Text size="1">本公司(團體)代表人（董事長或理事長）：</Text>
        
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>姓名</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>國籍</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>身分證/護照</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.RowHeaderCell>王大空</Table.RowHeaderCell>
              <Table.Cell>中華民國</Table.Cell>
              <Table.Cell>A123456789</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>孫小鵬</Table.RowHeaderCell>
              <Table.Cell>加拿大</Table.Cell>
              <Table.Cell>CA12345678</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>張花花</Table.RowHeaderCell>
              <Table.Cell>中華民國</Table.Cell>
              <Table.Cell>F5678912345</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>

        
      </Flex>
    </Flex>  
   

      
      

  )
}