'use client';

import {
  Flex,
  Text,
  Button,
  Switch,
  Avatar,
  Section,
} from '@radix-ui/themes';

import {
  DesktopIcon,
  EyeOpenIcon,
  TriangleLeftIcon,
  TriangleRightIcon,
  PlayIcon
} from '@radix-ui/react-icons';
import * as React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import TopbarDropdownMenu from './topbarDM';
import TopbarAdd from  './topbarAdd'
import TopbarLang from './topbarLang'
import { useTopbarContext } from '@/context/TopbarContext'

export default function Topbar() {
  const topbarContext = useTopbarContext()
  const path = usePathname()
  let showTitle = false
  let showTool = false
  let showView = false
  let title = ''
  if (path.includes('documents')) {
    showTitle = true
    title = 'Documents'
  }else if (path.includes('templates')) {
    showTitle = true
    title = 'Templates'
  } else if (path.includes('document')) {
    showTitle = true
    showTool = true
    title = 'Documents'
  } else if (path.includes('template')) {
    showTitle = true
    showTool = true
    showView = true
    title = 'Templates'
  }
  const router = useRouter();

  return (
    <>
      <Section p='2' pl="4" pr="4" height="7" style={{
        width: '100%',
        background: 'var(--gray-a2)',
        boxShadow: 'var(--shadow-2)',
      }}>
        {/* topBar */}
        <Flex direction="row">
          {showTitle ? <Flex align="center" style={{ width: '300px', paddingLeft: '30px' }}>
            <Text size="1" >{title}</Text>
          </Flex> : ''}
          <Flex direction="row" justify='between' align="center" grow="1" pl="4" pr="4">
            {/* tool */}
            {showTool ? <>
              <Flex align="center" gap="2">
                <Switch size="1" variant="soft" checked={topbarContext.isFullScreen} onClick={() => {
                  topbarContext.setIsFullScreen(!topbarContext.isFullScreen)
                }} />
                <DesktopIcon />
              </Flex>
              <Flex align="center" gap="1">
                <Switch size="1" variant="soft" checked={topbarContext.isPublish} onClick={() => {
                  topbarContext.setIsPublish(!topbarContext.isPublish)
                }} />
                <Text as="label" size="1">Publish</Text>
              </Flex>
              <Button color='gray' highContrast size="1">
                Share
              </Button>
              <Flex align="center" gap="1">
                <Switch size="1" variant="soft" checked={topbarContext.isEdit} onClick={() => {
                  topbarContext.setIsEdit(!topbarContext.isEdit)
                }} />
                <Text as="label" size="1">Edit</Text>
              </Flex>

            </> : ''}
            {/* view */}
            {showView ?
              <Flex align="center" gap="4">
                <Button color='gray' variant="ghost" size="1"><EyeOpenIcon /></Button>
                <Button color='gray' variant="ghost" size="1"><TriangleLeftIcon /></Button>
                <Button color='gray' variant="ghost" size="1"><TriangleRightIcon /></Button>
                <Button color='gray' variant="ghost" size="1"><PlayIcon /></Button>
              </Flex> : ''}
          </Flex>

          <Flex justify='between' align="center" style={{ width: '300px',minWidth:'300px', paddingLeft: '10px' }}>

            <Flex align="center">
              <Avatar size="1" radius="full"
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback="A"
              />
              <Avatar size="1" radius="full"
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback="B"
              />
            </Flex>
            
            <TopbarLang></TopbarLang>
            <TopbarAdd></TopbarAdd>
            <TopbarDropdownMenu></TopbarDropdownMenu>
          </Flex>
        </Flex>
      </Section>
    </>
  )
}



