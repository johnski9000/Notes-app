import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';


function Dashboard() {
    const {signOut, currentUser} = useAuth()
    const navigate = useNavigate()


    useEffect(() => {
        if(!currentUser) {
            navigate("/")
        }
    }, [])
    

  return (
    <div onClick={signOut}>Sign Out</div>
  )
}

export default Dashboard