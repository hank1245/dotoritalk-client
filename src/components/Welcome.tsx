import React from 'react'
import { IUser } from '../pages/Chat'
import styled from'styled-components'
import Robot from '../assets/robot.gif'

interface Props {
    currentUser: IUser | undefined
}

const Welcome = ({currentUser}:Props) => {
  return (
    <>
        <Container>
            <img src={Robot} alt='Robot'/>
            <h1>
                환영합니다, <span>{currentUser?.name}님!</span>
            </h1>
            <h3>대화할 상대를 선택해주세요!</h3>
        </Container>
    </>
  )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
color: white;
flex-direction: column;
img {
  height: 20rem;
}
span {
  color: #4e0eff;
}
`

export default Welcome