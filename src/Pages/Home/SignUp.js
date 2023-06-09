import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import styles from './Home.module.css'; 
import axios from 'axios'

function SignUp() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
const {signUp, currentUser} = useAuth()
const navigate = useNavigate()


  function handleChange (event) {
    if (event.target.name === "email") {
      setEmail(event.target.value)
    } else  if (event.target.name === "password") {
      setPassword(event.target.value)
    } else if (event.target.name === "confirm_password") {
        setConfirmPassword(event.target.value)
      }
  }
useEffect(() => {
  if (currentUser) {
    navigate("/dashboard")
  }
}, [currentUser])

  async function handleSubmit (e) {
    e.preventDefault()
    
    if (password !== confirmPassword) {
        return setError("Passwords do not match!")
    } 
    try {
        setError(false)
        setLoading(true)
        await signUp(email, password)
        axios.put("https://notes-server-lac.vercel.app/", {
          email: email
        })
        navigate("/dashboard")
    } catch (error) {
        
    }
  }
 
  return (
    <div className={styles.homeWrapper}>
    <div className={styles.banner}>
      <h1>Organic<br/> Mind</h1>
      <img src='https://assets.api.uizard.io/api/cdn/stream/e99e168f-d429-4983-8089-5b67c2cb03be.png' alt='banner' />
    </div>
    <div className={styles.login}>
     <div className={styles.loginWrapper}>
        <h1 style={{marginBottom: "25px"}}>Sign up</h1>
        <form className={styles.signUpForm} onSubmit={handleSubmit}>
          <div>
            <input name='email' type="email" placeholder="example@email.com" onChange={(event) => handleChange(event)}/>
          </div>
          <div>
            <input name='password' type="password" placeholder='Password' onChange={(event) => handleChange(event)}/>
          </div>
          <div>
            <input name='confirm_password' type="password" placeholder='Confirm Password' onChange={(event) => handleChange(event)}/>
          </div>
          { error &&
            <div className={styles.error}>There is an error, check password or email!</div>
          }
          <button className={styles.signInButton} type="submit">Sign Up</button>
          <Link to={"/sign-in"}>Already have an account? Sign in</Link>
        </form>
      </div>
    </div>
  </div>  
  )
}

export default SignUp