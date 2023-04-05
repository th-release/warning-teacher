import { useEffect, useState } from 'react'
import styled from 'styled-components'
import io from "socket.io-client";
import { useRouter } from 'next/router';

export default function Home() {
  const [state, setState] = useState<any>({ room: [{ id: 0, title: "main", status: false }] }) 
  const router = useRouter();
  useEffect(() => {
    const socket = io('http://localhost:3001')

    const room = setInterval(() => {
      socket.emit('room')
    }, 350);

    socket.on('room', (data) => {
      setState(data.room);
    })
    
    return () => clearInterval(room);
  }, [])

  function Link(id: number) {
    router.push(`/room/${id}`)
  }
  
  return (
    <Container>
      <Title>공 습 경 보</Title>
      {Object.values(state).map((data: any, index: number) => (
        <Room onClick={() => Link(data.id)} key={index}>
          {"방 주제: " + data.title}<br/>
          {"경보: " + String(data.status)}
        </Room>
      ))}
    </Container>
  )
}

const Container = styled.div`
  padding: 20px;
`

const Title = styled.h1`
  text-align:center;
  font-size: 38px;
  font-weight: 600;
`

const Room = styled.div`
  margin-top: 20px;
  padding-left: 14px;
  width: 100%;
  background-color: #fff;
  border: 1px solid black;
  height: 40px;
  opacity: .9;
`