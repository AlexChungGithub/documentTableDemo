import { Container, Flex, Section, Heading, Text, Box, Button } from "@radix-ui/themes";
import SiedbarLabel from '@/components/SidebarMain/sidebarLabel';

export default function layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>
    <Section p='4' m='0'>
      <Heading size="6">Settings</Heading>
      <Text color="gray">Manage your account settings and set e-mail preferences.</Text>
    </Section>
    <Flex>
      <Section p='0' style={{
        width: '240px',
        boxShadow: '2px 0px var(--gray-a3) ',
      }}>
        <SiedbarLabel><Heading size="4">Account</Heading></SiedbarLabel>
        <SiedbarLabel level={1}>Profile</SiedbarLabel>
        <SiedbarLabel level={1}>Appearance</SiedbarLabel>
        <SiedbarLabel level={1}>Notification</SiedbarLabel>
        <SiedbarLabel><Heading size="4" >Workspace</Heading></SiedbarLabel>
        <SiedbarLabel level={1}>Details</SiedbarLabel>
        <SiedbarLabel level={1}>Billing</SiedbarLabel>
        <SiedbarLabel level={1}>Security</SiedbarLabel>
        <SiedbarLabel level={1}>API Tokens</SiedbarLabel>
        <SiedbarLabel level={1}>Features</SiedbarLabel>
        <SiedbarLabel level={1}>Members</SiedbarLabel>
        <SiedbarLabel level={1}>Groups</SiedbarLabel>
        <SiedbarLabel><Heading size="4" >Automation</Heading></SiedbarLabel>
      </Section>
      {children}
    </Flex>
  </>)
}