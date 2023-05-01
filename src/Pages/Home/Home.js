import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import styles from './Home.module.css'; 

function Home() {
  const [first, setfirst] = useState()
  const navigate = useNavigate()
  const {currentUser} = useAuth()

  useEffect(() => {
      if (currentUser) {
        navigate("/dashboard")
      }
  }, [currentUser])

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.banner}>
        <h1>Organic<br/> Mind</h1>
        <img src='https://assets.api.uizard.io/api/cdn/stream/e99e168f-d429-4983-8089-5b67c2cb03be.png' alt='banner' />
      </div>
      <div className={styles.login}>
       <div className={styles.loginWrapper}>
          <h1>Productive Mind</h1>
          <p>
          With only the features you need, Organic Mind is customized for individuals seeking a stress-free way to stay focused on their goals, projects, and tasks. 
          </p>
          
          <button>
          <Link to={"/sign-up"}>
            Get Started
            </Link>
          </button>
          <Link to={"/sign-in"}>Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default Home