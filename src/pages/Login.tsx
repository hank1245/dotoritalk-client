import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastOptions } from 'react-toastify'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { loginRoute } from '../utils/APIRoutes'

interface IProps {}

const Login: React.FC<IProps>  = () => {
    const [input, setInput] = useState({
        email:'',
        password:'',
    })

    const navigate = useNavigate()

    const toastOption : ToastOptions = {
      position:'bottom-right',
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark'
    }

    useEffect(() => {
      if(localStorage.getItem('chat-app-user')) {
        navigate('/chat')
      }
    },[])

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e:React.FormEvent) => {
        e.preventDefault()
        if(handleValidation()) {
          const { password, email} = input
          const { data } = await axios.post(loginRoute, {
            email, password
          })
          if(data.status == false) {
            toast.error('로그인에 실패하였습니다', toastOption)
          } else {
            localStorage.setItem('chat-app-user',JSON.stringify(data))
            navigate('/')
          }
        }
    }

    const handleValidation = () => {
      const { password, email} = input
       if (email ==="") {
        toast.error("이메일을 입력해주세요", toastOption)
        return false 
      } else if (password ==="") {
        toast.error('비밀번호를 입력해주세요', toastOption)
      }
      return true
    }

    const handleChange =  (e:React.ChangeEvent<HTMLInputElement>):void => {
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

  return (
    <>
    <FormContainer>
      <form onSubmit={handleSubmit}>
          <div className='brand'>
              <img src={Logo} alt="logo" style={{ borderRadius: '50%', width:'4rem', height:'4rem'}} />
              <h1>DOTORI Talk</h1>
          </div>
          <input type='email' placeholder='Email' name='email' onChange={handleChange} min='3'/>
          <input type='password' placeholder='비밀번호' name='password' onChange={handleChange}/>
          <button type='submit'>로그인</button>
          <span>계정이 없으신가요?<Link to='/register'>회원가입</Link></span>
      </form>
    </FormContainer>
    <ToastContainer/>
   </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #997af0;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }`;

export default Login