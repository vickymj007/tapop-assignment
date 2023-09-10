import React from 'react'
import './navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { signOutUser } from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const {data} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignOut = async ()=>{
    try {
      await signOut(auth)
      localStorage.removeItem("user")
      dispatch(signOutUser())
      navigate('/auth')
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className='navbar'>
        <div className="navbar-wrapper">
            <div className='marquee'>
              <h2>Welcome back <span>{data?.displayName}</span></h2>
              <h2>Welcome back <span>{data?.displayName}</span></h2>
              <h2>Welcome back <span>{data?.displayName}</span></h2>
              <h2>Welcome back <span>{data?.displayName}</span></h2>
            </div>
            <button onClick={handleSignOut}>SIGN OUT</button>
        </div>
    </div>
  )
}

export default Navbar