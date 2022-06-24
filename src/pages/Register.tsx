import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastOptions } from 'react-toastify'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes'

interface IProps {}

const Register: React.FC<IProps>  = () => {
    const [input, setInput] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const navigate = useNavigate()

    const toastOption : ToastOptions = {
      position:'bottom-right',
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark'
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e:React.FormEvent) => {
        e.preventDefault()
        if(handleValidation()) {
          const { password, name, email} = input
          const response = await axios.post(registerRoute, {
            name, email, password
          })
          if(response.status !== 201) {
            toast.error('Register failed', toastOption)
          } else {
            localStorage.setItem('chat-app-user',JSON.stringify(response.data))
          }
          navigate('/')
        }
    }

    const handleValidation = () => {
      const { password, confirmPassword, name, email} = input
      if(password !== confirmPassword ) {
        toast.error("비밀번호와 비밀번호 확인이 다릅니다",toastOption)
        return false
      } else if (name.length < 3) {
        toast.error("이름은 3글자보다 더 길어야 합니다", toastOption )
        return false
      } else if (password.length < 6) {
        toast.error("비밀번호는 6글자보다 더 길어야 합니다", toastOption )
        return false
      } else if (email ==="") {
        toast.error("이메일을 입력해주세요", toastOption)
        return false
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
              <img src={Logo} alt="logo" style={{borderRadius: '50%', width:'4rem', height:'4rem'}} />
              <h1>DOTORI Talk</h1>
          </div>
          <input type='text' placeholder='이름' name='name' onChange={handleChange}/>
          <input type='email' placeholder='Email' name='email' onChange={handleChange}/>
          <input type='password' placeholder='비밀번호' name='password' onChange={handleChange}/>
          <input type='password' placeholder='비밀번호 확인' name='confirmPassword' onChange={handleChange}/>
          <button type='submit'>계정 만들기</button>
          <span>이미 계정이 있으신가요? <Link to='/login'> 로그인</Link></span>
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

export default Register