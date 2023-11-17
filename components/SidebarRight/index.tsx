'use client';
import {
  IconButton,
  Container,
  Flex,
  Box
} from '@radix-ui/themes';
import {
  ChevronRightIcon,
  ChevronLeftIcon
} from '@radix-ui/react-icons';
import * as React from 'react'
import './right.css'

export default function SidebarRight({
  children,
}: {
  children: React.ReactNode
}) {
  const [rightOpen, setRightOpen] = React.useState(true)
  return (
    <Flex display="inline-flex">
      <Box position='absolute' style={{
        marginLeft: '-20px',
        marginTop: '8px'
      }}>
        <IconButton color="gray" variant="ghost" onClick={() => { setRightOpen(!rightOpen) }}>
          {rightOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <Container className='rightSidebarContainer' data-state={rightOpen ? 'open' : 'close'} style={{
        width: '240px'
      }}> {children} </Container>
    </Flex>
  )
}
