import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../utils/useAuth';

const GoogleButton = () => {
  const {signInWithGoogle} = useAuth();

  const googleSignIn = () =>{
    signInWithGoogle()
    .then(result =>{
      const user = result.user;
      console.log(user);
      toast.success('Successfully registered!')
      navigate('/');
    })
    .catch(error =>{
      const errorMessage = error.message;
      console.log(errorMessage);
    })
  }
  return (
    <button 
      onClick={googleSignIn}
      type="button"
      className="
        w-full 
        bg-[#334155] hover:bg-[#3E4A61] 
        text-[#E2E8F0] 
        font-medium 
        rounded-lg 
        py-2.5 px-4 
        flex items-center justify-center 
        transition-all duration-200 
        border border-[#475569] hover:border-[#64748B]
        text-sm sm:text-base
        md:py-3 md:px-5
      "
    >
      <FcGoogle className="mr-2 text-lg md:text-xl" />
      <span className="whitespace-nowrap">Sign up with Google</span>
    </button>
  );
};

export default GoogleButton;