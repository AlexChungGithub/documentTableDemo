//import './globals.css'

import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Flex, Box, Section } from '@radix-ui/themes'
import './theme-config.css';
import Topbar from '@/components/topbar/index';
import SidebarMain from '@/components/SidebarMain';
import { TopbarWrapper } from '@/context/TopbarContext';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <Section p='0' m='0'>
      <Flex>
        <SidebarMain></SidebarMain>
        <Box style={{
          width: '100%'
        }} >
          <TopbarWrapper>
            <Topbar></Topbar>
            {children}
          </TopbarWrapper>
        </Box>
      </Flex>
    </Section>

  )
}

