import React, { useEffect, useRef, useState } from 'react'
import './main.css'
import { useDispatch, useSelector } from 'react-redux'
import {BsInstagram,BsFacebook,BsTwitter,BsLinkedin} from 'react-icons/bs'
import { auth } from '../../config/firebase'
import { signOut } from 'firebase/auth'
import { signOutUser } from '../../redux/userSlice'
import avatar from '../../assets/Avatar-2.png'
import { useNavigate } from 'react-router-dom'


const Main = () => {
    const {data} = useSelector(state => state.user) 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const cardRef = useRef(null)
    const [offSetX, setOffSetX] = useState(0)
    const [offSetY, setOffSetY] = useState(0)


    useEffect(()=>{
        window.addEventListener('mousemove',rotateElement)

        function rotateElement (e){
            const x = e.clientX
            const y = e.clientY
            
            const middleX = window.innerWidth / 2
            const middleY = window.innerHeight / 2
            
            setOffSetX(((x - middleX) / middleX) * 45)
            setOffSetY(((y - middleY) / middleY) * 45)

            cardRef.current.style.setProperty("--rotateX",-1*offSetY+"deg")
            cardRef.current.style.setProperty("--rotateY",offSetX+"deg")

        }
        return ()=>{
          window.removeEventListener('mousemove', rotateElement)
        }
    },[setOffSetX,setOffSetY, offSetX, offSetY])

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
    <div className='card-container'>
        <div className="card" ref={cardRef}>
            <div className="profile-pic">
              <img src={data?.photoURL? data?.photoURL : avatar} alt="Profile" />
            </div>
            <div className="profile-body">
              <h3>{data?.displayName}</h3>
              <p>{data?.email}</p>
            </div>
            <div className="social-media">
              <BsInstagram/>
              <BsFacebook/>
              <BsTwitter/>
              <BsLinkedin/>
            </div>
            <div className="navbar-wrapper actions">
              <button onClick={handleSignOut}>SIGN OUT</button>
            </div>
        </div>
    </div>
  )
}

export default Main