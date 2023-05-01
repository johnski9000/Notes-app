import { createContext, useContext, useEffect, useState } from "react";
import React from 'react'
import  {auth} from "../firebase"

export const AuthContext = createContext()

export  function useAuth() {
  return useContext(AuthContext)
}


export function AuthProvider({children}) {
    const [currentUser, setcurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const unsubscribe =auth.onAuthStateChanged(user => {
        setcurrentUser(user)
        setLoading(false)
      })
      return unsubscribe
    }, [])
    

    function signUp(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        auth.signInWithEmailAndPassword(email, password)
    }
    function signOut(params) {
        auth.signOut()
    }
    const value = {
        currentUser,
        signUp,
        login,
        signOut
    }


  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
