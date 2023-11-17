'use client'
import { Card, Heading, TextField, Flex, Button } from "@radix-ui/themes";
import { Flower2 } from 'lucide-react';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Page() {
  const [acc, setAcc] = useState('')
  const [pass, setPass] = useState('')
  const router = useRouter()
  useEffect(() => {
    if (sessionStorage.getItem('isLogin') === 'true') {
      router.push('/dashboard')
    }
  }, [router])

  const onClickLogin = () => {
    sessionStorage.setItem('isLogin', 'true')
    router.push('/dashboard')
  }

  return (<>
    <Card m='auto' size="2" style={{ maxWidth: 240 }}>
      <Flex direction="column" gap="3">
        <Flex><Flower2 /><Heading>SunFlower</Heading></Flex>
        <TextField.Input size="1" placeholder="Account" onChange={(e) => { setAcc(e.target.value) }} />
        <TextField.Input size="1" placeholder="Password" onChange={(e) => { setPass(e.target.value) }} />
        <Button onClick={() => {
          onClickLogin()
        }}>Login</Button>
      </Flex>
    </Card>
  </>)
}