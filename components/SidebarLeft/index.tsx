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
import './left.css'

export default function SidebarLeft({
  children,
}: {
  children: React.ReactNode
}) {
  const [leftOpen, setLeftOpen] = React.useState(true)
  return (
    <Flex display="inline-flex">
      <Container className='leftSidebarContainer' data-state={leftOpen ? 'open' : 'close'} style={{
        width: '240px'
      }}>
        {children} </Container>
      <Box position='relative' data-state={leftOpen ? 'open' : 'close'} style={{
        width: '0px',
        left: '6px',
        marginTop: '8px',
        zIndex: 3
      }}>
        <IconButton color="gray" variant="ghost" onClick={() => { setLeftOpen(!leftOpen) }}>
          {leftOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
    </Flex >
  )
}
