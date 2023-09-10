import React, { useState } from 'react'
import './auth.css'
import { auth, db, provider } from '../../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/userSlice'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginLayout,setLoginLayout] = useState(true)
    const [error,setError]= useState("")

    const userCollection = collection(db,"users")

    const [loginEmail,setLoginEmail] = useState("")
    const [loginPass,setLoginPass] = useState("")
    const [signUpEmail,setSignUpEmail] = useState("")
    const [signUpPass,setSignUpPass] = useState("")
    const [name,setName] = useState("")


    const loginWithGoogle = async (e)=>{
        e.preventDefault()
        try {
            const result = await signInWithPopup(auth, provider)
            const {displayName, email, photoURL} = result.user
            localStorage.setItem("user",JSON.stringify({displayName,email,photoURL}))
            dispatch(loginUser({displayName,email,photoURL}))

            const docRef = doc(db,"users", email)
            const user = await getDoc(docRef)
            
            if(!user.data()){
                await setDoc(doc(userCollection, email),{
                    displayName,
                    email,
                    photoURL,
                    password:''
                })
            }
            navigate("/")
        } catch (error) {
            setError(error.message)
        }
    }


    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(loginLayout){
            try {
                if(!loginEmail || !loginPass) return setError("Please fillin all the fields")
                const docRef = doc(db,"users", loginEmail)
                const user = await getDoc(docRef)
                if(!user.data()) return setError("Email not Registered")

                if(user.data().password !== loginPass) return setError("Incorrect Password")
                
                localStorage.setItem("user",JSON.stringify(user.data()))
                dispatch(loginUser(user.data()))
                navigate("/")
            } catch (error) {
                setError(error.message)
            }
            
        }else{
            if(!signUpEmail || !signUpPass || !name) return setError("Please fill all the fields")
            try {
                await createUserWithEmailAndPassword(auth,signUpEmail,signUpPass)
                
                const newUser = {
                    displayName:name,
                    email:signUpEmail,
                    photoURL:"",
                    password:signUpPass
                }

                await setDoc(doc(userCollection,signUpEmail),newUser)
        
                localStorage.setItem("user",JSON.stringify(newUser))
                dispatch(loginUser(newUser))
                navigate("/")
            } catch (error) {
                setError(error.message)
            }
        }
    }

  return (
    <div className='login-page'>
        <nav>
            <div className="slide">
                <h2>Tapop Assignment</h2>
            </div>
        </nav>
        <div className='login-form'>
            <form onSubmit={handleSubmit}>
                {loginLayout? 
                    <div className="login-form-group">
                        <h3>Login</h3>
                        <input 
                            type="text" 
                            placeholder='Email' 
                            onChange={(e)=>setLoginEmail(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder='password'
                            onChange={(e)=>setLoginPass(e.target.value)}
                        />
                        {error? <p className='error'>{error}</p>:null}
                        <button type='submit' className='btn submit'>Login</button>
                    </div>
                    :
                    <div className="login-form-group">
                        <h3>Create new account</h3>
                        <input 
                            type="text" 
                            placeholder='Name'
                            onChange={(e)=>setName(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder='Email'
                            onChange={(e)=>setSignUpEmail(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder='password'
                            onChange={(e)=>setSignUpPass(e.target.value)}
                        />
                        {error? <p className='error'>{error}</p>:null}
                        <button type='submit' className='btn submit'>Signup</button>
                    </div>    
                }
                <div className='login-options'>
                    <p>{loginLayout ? "Don't have an Account? "
                        :
                        "Already have an Account? "    
                    }
                    <span 
                        onClick={()=>setLoginLayout(!loginLayout)}
                    >
                        {loginLayout? "Register": "Login"}
                    </span>
                    </p>
                    <button className='login-with-google-btn' onClick={loginWithGoogle}>Signin with Google</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Auth