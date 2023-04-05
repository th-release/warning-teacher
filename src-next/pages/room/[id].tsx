import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import io from "socket.io-client";
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [onMouse, setEvent] = useState("normal");
  useEffect(() => {
    if (!router.isReady) return;
    const socket = io('http://localhost:3001')
    
    socket.on('warning', (res) => {
      if (!res || !res.warning) return
      else {
        if (res.warning.status) {
          const sound = new Audio("/warning.wav")
          sound.play();
          
          Swal.fire("warning", "! 공 습 경 보 !", "warning")
        }
      }
    })
    
    const check = setInterval(() => {
      socket.emit('check', router.query.id)
    }, 350);

    return () => clearInterval(check);
  }, [router.isReady]);

  const warning = () => {
    setEvent("click");
    setTimeout(() => {
      setEvent("normal");
    }, 150)
    
    const socket = io('http://localhost:3001');

    socket.emit("warning", router.query.id);
  }
  
  return (
    <Container>
      <Title>공 습 경 보</Title>
      <Button className={onMouse} onMouseOver={() => setEvent("over")} onMouseOut={() => setEvent("out")} onClick={() => warning()} />
      <Back onClick={() => router.back()}>
        <div>뒤로가기</div>
      </Back>
    </Container>
  )
}

const smallSize = keyframes`
  0% {
    width: 250px;
    height: 250px;
  }

  100% {
    width: 240px;
    height: 240px;
  }
`

const bigSize = keyframes`
  0% {
    width: 240px;
    height: 240px;
  }

  100% {
    width: 250px;
    height: 250px;
  }
`

const clickAnimation = keyframes`
  0% {
    width: 250px;
    height: 250px;
  }

  25% {
    width: 200px;
    height: 200px;
  }

  50% {
    width: 240px;
    height: 240px; 
  }

  75% {
    width: 270px;
    height: 270px;
  }

  100% {
    width: 250px;
    height: 250px;
  }
`

const Container = styled.div`
  padding: 20px;
`

const Title = styled.h1`
  text-align:center;
  font-size: 38px;
  font-weight: 600;
`

const Button = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: none;

  background-image: url(/warning.jpg);
  background-size: cover;
  background-repact: no-repeat;

  cursor: pointer;

  &.over {
    animation: ${smallSize} .15s forwards;
  }

  &.out {
    animation: ${bigSize} .15s forwards;
  }

  &.click {
    animation: ${clickAnimation} .15s forwards;
  }
`

const Back = styled.div`
  position: absolute;
  width: 90px;
  height: 50px;
  border: 1px solid black;
  cursor: pointer;
  border-radius: 12px;
  background-color: black;
  color: white;

  > div {
    position: absolute;
    width: 60px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`