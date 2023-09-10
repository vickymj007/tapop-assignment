import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Main from '../../components/Main/Main'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom'

const User = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))

    if(!user) return navigate('/auth')

    dispatch(loginUser(user))

  },[dispatch,navigate])

  return (
    <div>
        <Navbar/>
        <Main/>
    </div>
  )
}

export default User