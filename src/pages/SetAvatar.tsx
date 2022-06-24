import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast, ToastOptions } from 'react-toastify'
import styled from 'styled-components'
import loader from '../assets/loader.gif'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios, { Axios, AxiosResponse } from 'axios'
import { setAvatarRoute } from '../utils/APIRoutes'
import { Toast } from 'react-toastify/dist/components'
import {Buffer} from 'buffer'

function SetAvatar() {
    const api = 'https://api.multiavatar.com'
    const navigate = useNavigate()
    const [avatars, setAvatars] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState<number | undefined>(undefined)
    const toastOption : ToastOptions = {
        position:'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
      }

    useEffect(() => {
      if(!localStorage.getItem('chat-app-user')) {
        navigate('/login')
      }
    },[])
    const setProfilePicture = async() => {
        if(selectedAvatar === undefined) {
            toast.error('아바타를 선택하주세요', toastOption)
        } else {
            const user = await JSON.parse(localStorage.getItem('chat-app-user') || "")
            const {data}  = await axios.post(`${setAvatarRoute}/${user._id}`,{
              image: avatars[selectedAvatar]
            })
            if(data.isSet) {
              user.isAvatarImageSet = true,
              user.avatarImage = data.image
              localStorage.setItem('chat-app-user',JSON.stringify(user))
              navigate('/')
            } else {
              toast.error('아바타를 설정하지 못했습니다. 다시 시도해주세요')
            }
        }

    }

    useEffect(() => {
        const data:string[] = []
        const getAvatarImg = async () => {
            for(let i=0; i<2; i++) {
                const res = await axios.get(`${api}/${Math.round(Math.random()*1000)}`)
                console.log(res.data)
                const buffer = new Buffer(res.data)
                data.push(buffer.toString('base64'))
            }
            return data
        }
        getAvatarImg().then((data) => {
            setAvatars(data)
            setIsLoading(false)
        })
    },[])

    if(isLoading) {
        return (<Container>
        <img src={loader} alt='loader' className='loader'/>
       </Container>)
    }

  return (
   <>
    <Container>
        <div className="title-container">
            <h1>
                아바타를 선택하세요!
            </h1>
        </div>
        <div className='avatars'>
            {
            avatars.map((avatar,index) => {
                return(
                    <div 
                    key={index}
                    className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                        <img src={`data:image/svg+xml;base64,${avatar}`}
                        alt='avatar'
                        onClick={() => setSelectedAvatar(index)}/>
                    </div>
                )
            })
            }
        </div>
        <button className='submit-btn' onClick={setProfilePicture}>
            프로필 사진으로 설정하기
        </button>
    </Container>
    <ToastContainer/>
   </>
  )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: #131324;
height: 100vh;
width: 100vw;
.loader {
  max-inline-size: 100%;
}
.title-container {
  h1 {
    color: white;
  }
}
.avatars {
  display: flex;
  gap: 2rem;
  .avatar {
    border: 0.4rem solid transparent;
    padding: 0.4rem;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
    img {
      height: 6rem;
      transition: 0.5s ease-in-out;
    }
  }
  .selected {
    border: 0.4rem solid #4e0eff;
  }
}
.submit-btn {
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
    background-color: #4e0eff;
  }
}
`

export default SetAvatar