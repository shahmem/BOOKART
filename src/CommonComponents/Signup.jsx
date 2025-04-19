import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import Footer from './Footer';

function Signup() {
  const navigate= useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [data,setData]=useState([])
  const [isLogged , setIsLoggged]=useState(false)

  const Register =(data)=>{
    setData(data)
    const user =JSON.parse(localStorage.getItem("user"))
      if(user.email === data.email){
        alert("Already Existing User")
        navigate('/login')
      }else{
        localStorage.setItem("user",JSON.stringify(data));
    console.log(data);
    
    alert("Registration successfull")
    navigate('/login')
      }
    
  }
  const password = watch("password");

  return (
    <>
   
    <div className=' w-full h-full bg-[#a9fde9] px-4 py-10 md:px-32 lg:px-[24%] md:py-28'>
        <div className='w-full h-[76vh] md:h-[60vh] flex flex-col md:flex-row items-center '>
            <div className='h-[15rem] w-[80%] md:h-full md:w-[37%] -mb-7 md:mb-0 bg-[#3aad92] flex flex-col items-center pt-4 md:pt-0 md:justify-center gap-3 md:gap-8 text-white rounded-t-3xl md:rounded-none md:rounded-l-3xl'>
                <p className='text-xl text-center md:text-3xl font-semibold'>Welcome Back!</p>
                <p className='text-[9px] md:text-xs text-center font-light'>To Keep With Us Please Login With Your Details</p>
                <button onClick={()=>{navigate('/login')}} className='rounded-3xl font-light text-[10px] md:text-xs px-4 md:px-9 py-1 md:py-3 mt-1 md:mt-[10%] border-white border-[1px]'>SIGN IN</button>
            </div>
            <div className='h-full w-[80%] md:w-[63%] bg-[#fff] rounded-3xl md:rounded-none md:rounded-r-3xl'>
                <form onSubmit={handleSubmit(Register)} className='flex flex-col items-center pt-4 lg:pt-8 gap-2 md:gap-7'>
                    <p className='md:text-3xl lg:text-4xl font-bold text-[#3aad92] '>Create Account</p>
                    <div className='flex flex-col pb-3 md:mt-0 [&>div>input]:px-2 [&>div>input]:placeholder:text-[10px] [&>div>input]:bg-slate-200 [&>div>input]:md:placeholder:text-xs gap-5'>
                        <div className="">
                            <input
                                {...register("name", { required: "Name is required" })}
                                type="text"
                                className="focus:outline-none p-1"
                                placeholder="Name"
                            />
                            {errors.name && (
                                <p className="text-xs absolute text-[#f53232]">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="">
                            <input
                                {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                                })}
                                type="email"
                                className="focus:outline-none p-1 "
                                placeholder="Email"
                            />
                            {errors.email && (
                                <p className="text-xs absolute text-[#f53232]">{errors.email.message}</p>
                            )}
                         </div>
                         <div className="">
                            <input
                                {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                    message:
                                    "At least 8 characters and include letters, numbers, and symbols.",
                                },
                                })}
                                type="password"
                                className="focus:outline-none p-1 "
                                placeholder="Password"
                            />
                            {errors.password && (
                            <p  className="text-[10px] absolute text-[#f53232]">{errors.password.message}</p>
                            )}
                         </div>
                         <div className="">
                            <input
                                {...register("confirmPassword", {
                                required: "Please confirm your password",
                                 validate: (value) => value === password || "Passwords do not match"
                                })}
                                type="password"
                                className="focus:outline-none p-1 "
                                placeholder="Confirm Password"
                            />
                            {errors.confirmPassword && (
                            <p className="text-xs absolute text-[#f53232]">{errors.confirmPassword.message}</p>
                            )}
                         </div>
                    </div>
                    <button type='submit' className='bg-[#3aad92] text-white mb-2 md:mb-0 md:-mt-5 rounded-3xl text-[10px] md:text-xs px-4 md:px-9 py-1 md:py-2 '>SIGN UP</button>

                </form>
            </div>
        </div>
    </div>
        

    <Footer/>
    </>
  )
}

export default Signup