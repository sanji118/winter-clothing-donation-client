import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import GoogleButton from "../components/ui/GoogleButton";
import Input from "../components/ui/Input";
import useAuth from "../services/authService";
import Swal from "sweetalert2";
import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const RegisterForm = ({ toggleAuth }) => {
  const { createUser, updateUserProfile} = useAuth();
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState(null);

  const isValidPassword = (password) =>{
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasLength = password.length >= 6;


    const error = [];
    if(!hasLength) error.push('. At least 6 characters');
    if(!hasUpperCase) error.push('. One uppercase letter');
    if(!hasLowerCase) error.push('. One lowercase letter');
    
    return error.length? error : null;
  }

  const handleRegister = e =>{
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const photoURL = form.photoURL.value;
    console.log(name, email, password, photoURL);
    setPasswordError(null);

    if(!name || !photoURL){
      Swal.fire({
        icon: 'error',
        text: 'Please enter Your name and Photo!'
      })
      return;
    }

    const passwordError = isValidPassword(password);
    if(passwordError){
      setPasswordError(passwordError);
      return;
    }


    createUser(email, password)
    .then(result =>{
      const user = result.user;
      updateUserProfile(name, photoURL)
      navigate('/');
      toast.success('Successfully registered!')
    })
    .catch(error =>{
      const errorMessage = error.message;
      console.log(errorMessage);
    })

  }

  return(
    <>
      <div className="text-center mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#F1F5F9] mb-2">Join Cozy Kindness</h1>
        <p className="text-[#CBD5E1] text-sm lg:text-base">Register to donate or receive winter clothing</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-[#E2E8F0] mb-2 text-sm font-medium">Full Name</label>
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-[#94A3B8] z-50" />
            <Input type="text" name="name" placeholder="Your name" required />
          </div>
        </div>

        <div>
          <label className="block text-[#E2E8F0] mb-2 text-sm font-medium">Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-[#94A3B8] z-50" />
            <Input type="email" name="email" placeholder="your@email.com" required />
          </div>
        </div>
        <div>
          <label className="block text-[#E2E8F0] mb-2 text-sm font-medium">Your Photo URL</label>
          <div className="relative">
            <input 
              type="text" 
              name="photoURL"
              placeholder="http://example.jpg" 
              required
              className="bg-[#334155] border border-[#475569] text-white text-sm rounded-lg focus:ring-[#64748B] focus:border-[#64748B] block w-full p-2.5 placeholder-[#94A3B8]/50" 
            />
          </div>
        </div>

        <div>
          <label className="block text-[#E2E8F0] mb-2 text-sm font-medium">Password</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-[#94A3B8] z-50" />
            <Input
            type="password"
            name="password"
            placeholder="••••••••" 
            required 
            onChange = {(e)=>{
              setPasswordError(isValidPassword(e.target.value));
            }}
            />
          </div>
          {passwordError && (
            <div className="mt-2 bg-red-100 border border-red-300 text-red-700 text-sm rounded p-3">
              <p className="font-medium mb-1">Please fix these password issues:</p>
              <ul>
                {passwordError.map((error, id) =>(
                  <li key={id}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-gradient-to-r from-[#7DD3FC] to-[#38BDF8] text-[#082F49] font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:shadow-[#7DD3FC]/20"
        >
          Join Cozy Kindness
        </motion.button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-[#475569]"></div>
          <span className="px-3 text-[#94A3B8] text-sm">or</span>
          <div className="flex-1 h-px bg-[#475569]"></div>
        </div>

        <GoogleButton />

        <p className="text-sm text-center text-[#CBD5E1] mt-4">
          Already part of our community?{' '}
          <button
            type="button"
            onClick={toggleAuth}
            className="text-[#7DD3FC] hover:underline font-medium"
          >
            Sign in here
          </button>
        </p>
      </form>
    </>
  )
}

export default RegisterForm;