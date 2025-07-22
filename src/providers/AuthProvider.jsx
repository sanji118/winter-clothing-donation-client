import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../config/firebase';
import axiosInstance from '../hooks/axiosInstance';

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  PARTNER: 'partner',
  VOLUNTEER: 'volunteer'
};

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (name, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  const saveUser = async (user) => {
    if (!user?.email) return;

    const userData = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      phone: user.phoneNumber || ''
    };

    try {
      await axiosInstance.post('/users', userData);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const getMe = async () => {
    try {
      const { data } = await axiosInstance.get('/auth/me');
      setUserRole(data.user?.role || ROLES.USER);
      setUserData(data.user);
      return data.user;
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserRole(ROLES.USER);
      return null;
    }
  };

  const checkRole = async (requiredRole) => {
    try {
      const response = await axiosInstance.get(`/auth/check-role/${requiredRole}`);
      return response.data.hasRole;
    } catch (error) {
      console.error('Role check error:', error);
      return false;
    }
  };

  const hasRole = (role) => {
    return userRole === role;
  };

  const hasAnyRole = (roles) => {
    return roles.includes(userRole);
  };

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          await saveUser(currentUser);
          await axiosInstance.post('/auth/jwt', { email: currentUser.email });
          await getMe();
        } catch (error) {
          console.error('Auth state error:', error);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          await axiosInstance.post('/auth/logout');
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          setUserRole(null);
          setUserData(null);
          setLoading(false);
        }
      }
    });

    return () => unsubscriber();
  }, []);

  const authInfo = {
    user,
    userData,
    loading,
    userRole,
    ROLES,
    createUser,
    signIn,
    signInWithGoogle,
    updateUserProfile,
    signOutUser,
    getMe,
    checkRole,
    hasRole,
    hasAnyRole
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;