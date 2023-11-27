'use client'
import SidebarRight from '@/components/SidebarRight';
import SidebarLeft from '@/components/SidebarLeft';
import Settings from './settings';
import Style from './style';
import { Flex, Section, Tabs, Box, Text } from '@radix-ui/themes';
import EditorComponent from "../../../components/editor";
export default function page() {
  const initialValue = [
    {
      id: "default_page",
      type: "page",
      children: [
        {
          id: "default_paragraph",
          type: "paragraph",
          children: [{ text: "A line of text in a paragraph." }],
        },
      ],
    },
  ];
  return (<>
    <Flex width='100%'>
      <SidebarLeft>123</SidebarLeft>
      <Section grow="1" p="0">
        <EditorComponent initialValue={initialValue} />
      </Section>
      <SidebarRight>
        <Tabs.Root defaultValue="Settings">
          <Tabs.List>
            <Tabs.Trigger value="Settings">Settings</Tabs.Trigger>
            <Tabs.Trigger value="Style">Style</Tabs.Trigger>
          </Tabs.List>

          <Box px="4" pt="3" pb="2">
            <Tabs.Content value="Settings">
              <Settings></Settings>
            </Tabs.Content>
            <Tabs.Content value="Style">
              <Style></Style>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </SidebarRight>
    </Flex>
  </>)
}