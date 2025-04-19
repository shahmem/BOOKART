import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";

function Login() {
  const navigate = useNavigate();
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
   

    const onSubmit=(data)=>{
        const existUser = JSON.parse(localStorage.getItem("user"))
        if(existUser && existUser.email === data.email && existUser.password === data.password){
            localStorage.setItem("authenticated","true")
            setIsLoggged(true);
            navigate('/')
        }else{
            alert('Invalid User')
        }
    }
    
  return (
    <>
      <div className=" w-full h-full bg-[#a9fde9] px-4 py-10 md:px-32 lg:px-[24%]  md:py-28">
        <div className="w-full h-[76vh] md:h-[60vh] flex flex-col md:flex-row items-center ">
          <div className="h-[15rem] w-[80%] md:h-full md:w-[37%] -mb-7 md:mb-0 bg-[#3aad92] flex flex-col items-center pt-4 md:pt-0 md:justify-center gap-3 md:gap-8 text-white rounded-t-3xl md:rounded-none md:rounded-l-3xl">
            <p className="text-xl md:text-3xl font-semibold">Hello !</p>
            <p className="text-[9px] md:text-xs text-center font-light max-w-[90%]">
              Enter Your Personal details and start journey with us
            </p>
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="rounded-3xl font-light text-[10px] md:text-xs px-4 md:px-9 py-1 md:py-3 mt-3 md:mt-[10%] border-white border-[1px]"
            >
              SIGN UP
            </button>
          </div>
          <div className="h-full w-[80%] lg:w-[63%]  bg-[#ffffff] rounded-3xl md:rounded-none md:rounded-r-3xl">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center pt-12 gap-3 md:gap-8">
              <p className="text-xl text-center md:text-2xl lg:text-4xl font-bold text-[#3aad92] ">
                Sign in to QuickRide
              </p>
              <div className="flex flex-col mt-5 md:mt-10 [&>div>input]:px-2 [&>div>input]:placeholder:text-[10px] [&>div>input]:bg-slate-200 [&>div>input]:md:placeholder:text-xs gap-4">
                <div>
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
                    <p className="text-xs absolute text-[#f53232]">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type="password"
                    className="focus:outline-none p-1 "
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="text-xs absolute text-[#f53232] ">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#3aad92] text-white mt-4 md:mt-0 rounded-3xl text-[10px] md:text-xs px-4 md:px-9 py-1 md:py-2 "
              >
                SIGN IN
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
