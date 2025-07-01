import { motion } from "framer-motion";
import { FiMail, FiLock } from 'react-icons/fi';
import GoogleButton from "../components/ui/GoogleButton";
import Input from "../components/ui/Input";
import useAuth from "../utils/useAuth";
import { Result } from "postcss";
import { useNavigate } from "react-router-dom";
import { Flip, toast } from "react-toastify";

const LoginForm = ({ toggleAuth }) =>{
  const {signIn} = useAuth();
  const navigate = useNavigate();


  const handleLogin = e =>{
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password)
    .then(result =>{
      navigate('/');
      toast.success('Successfully logged in', {
        position: 'bottom-center',
        transition: Flip
      })
    })
    .catch(error =>{
      const errorMessage = error.message;
      console.log(errorMessage);
    })
  }
  return(
    <>
      <div className="text-center mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#F1F5F9] mb-2">Sign In</h1>
        <p className="text-[#CBD5E1] text-sm lg:text-base">Access your Cozy Kindness account</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-[#E2E8F0] mb-2 text-sm font-medium">Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-[#94A3B8] z-50" />
            <Input type="email" name="email" placeholder="your@email.com" required />
          </div>
        </div>

        <div>
          <label className="block text-[#E2E8F0] mb-2 text-sm font-medium">Password</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-[#94A3B8] z-50" />
            <Input type="password" name="password" placeholder="••••••••" required />
          </div>
        </div>

        <div className="text-right">
          <button type="button" className="text-sm text-[#7DD3FC] hover:underline">
            Forgot password?
          </button>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-gradient-to-r from-[#7DD3FC] to-[#38BDF8] text-[#082F49] font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:shadow-[#7DD3FC]/20"
        >
          Sign In
        </motion.button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-[#475569]"></div>
          <span className="px-3 text-[#94A3B8] text-sm">or</span>
          <div className="flex-1 h-px bg-[#475569]"></div>
        </div>

        <GoogleButton />

        <p className="text-sm text-center text-[#CBD5E1] mt-4">
          Don't have an account?{' '}
          <button 
            type="button"
            onClick={toggleAuth}
            className="text-[#7DD3FC] hover:underline font-medium"
          >
            Sign up here
          </button>
        </p>
      </form>
    </>
  )
}

export default LoginForm;