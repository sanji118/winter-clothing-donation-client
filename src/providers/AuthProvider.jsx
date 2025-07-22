import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import auth from '../config/firebase';
import axiosInstance from '../hooks/axiosInstance';



export const AuthContext = createContext(null);
const googleProvider =  new GoogleAuthProvider();



const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

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

  const getMe = async () => {
    try {
      const { data } = await axiosInstance.get('/auth/me');
      setUserRole(data.user.role);
      return data.user;

    } catch (error) {
      console.log(error);
      setUserRole(null);
      return null;
    }
  }

  const checkRole = async (role) => {
    try {
      await axiosInstance.get(`/auth/${role}/dashboard`, { withCredentials: true });
      return true;
    } catch (error) {
      return false;
    }
  }


  useEffect(()=>{
    const unsubscriber = onAuthStateChanged(auth, async (currentUser) =>{
      setUser(currentUser);


      if(currentUser){
          try {
            const {data} = await axiosInstance.post('/jwt', {
              email : currentUser.email
            });
            await saveUser(currentUser);
            await getMe();
            setLoading(false);
          } catch (error) {
            console.log('jwt error: ', error);
            setLoading(false)
          }
      }else{
        await axiosInstance.post('/logout');
        setUserRole(null);
        setLoading(false);
      }
    });

    return () => unsubscriber();
  }, [])

  const authInfo = {
    user, loading, createUser, signIn, signInWithGoogle,updateUserProfile, signOutUser,getMe, userRole, checkRole
  }

  return(
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider