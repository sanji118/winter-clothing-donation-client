import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import auth from '../config/firebase';
import axiosInstance from '../hooks/axiosInstance';



export const AuthContext = createContext(null);
const googleProvider =  new GoogleAuthProvider();



const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }
  const signIn = (email, password) => {
    setLoading(true);
   return signInWithEmailAndPassword(auth, email, password);
  }

  const signInWithGoogle = () =>{
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }
  const updateUserProfile = (name, photoURL)=>{
    setLoading(true);
    return updateProfile(auth.currentUser, {
        displayName : name,
        photoURL: photoURL,
    })
  }

  const saveUser = async (user) => {
    if(!user?.email) return;

    const userData = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      phone: user.phoneNumber
    }

    await axiosInstance.post('/users', userData);
  }
  const signOutUser = () =>{
    setLoading(true);
    return signOut(auth);
  }

  useEffect(()=>{
    const unsubscriber = onAuthStateChanged(auth, async (currentUser) =>{
      setUser(currentUser);


      if(currentUser){
          try {
            const {data} = await axiosInstance.post('/jwt', {
              email : currentUser.email
            });
            saveUser(currentUser);
            console.log('JWT set in cookie: ', data.token);
            setLoading(false);
          } catch (error) {
            console.log('jwt error: ', error);
            setLoading(false)
          }
      }else{
        await axiosInstance.post('/logout');
        setLoading(false);
      }
    });

    return () => unsubscriber();
  }, [])

  const authInfo = {
    user, loading, createUser, signIn, signInWithGoogle,updateUserProfile, signOutUser
  }

  return(
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider