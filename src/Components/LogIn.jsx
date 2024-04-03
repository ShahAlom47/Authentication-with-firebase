


import { CiFacebook } from "react-icons/ci";
import { VscGithub } from "react-icons/vsc";
import { RiGoogleFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useRef, useState } from "react";
import { AuthContext } from "./AuthProvider";



const LogIn = () => {
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passError, setPassError] = useState(null)
    const [passShow, setPassShow] = useState(false)
    const navigate = useNavigate();
    const emailRef = useRef(null);

    const { user, LoginUser, googleSignIn, ForgetUserPass } = useContext(AuthContext)


    const registerHandel = (e) => {
        // reset msg 
        setErrorMsg('')
        setSuccessMsg('')
        setPassError('')
        setEmailError('')

        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value



        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setEmailError('Please Provide valid Email')
            return
        }
        else if (password.length < 6) {
            setPassError('Password should be at least 6 characters')
            return
        }
        else if (!/[A-Z]/.test(password)) {
            setPassError('Password should be provide UpperCase')
            return
        }


        LoginUser(email, password)
            .then((result) => {
                console.log(result.user);
                setSuccessMsg('Login Successfully')
                e.target.reset()
                navigate('/')


            })
            .catch((error) => {

                const errorMessage = error.message;
                console.log(errorMessage);
                setErrorMsg(errorMessage)
            });

    }

    const googleLogInHandel = () => {

        googleSignIn()
            .then(() => {

            }).catch((error) => {
                console.log(error);

            });
    }


    const forgetPassHandel = () => {
        const email = emailRef.current.value
        ForgetUserPass(email)
            .then(() => {
                alert('please check your email and se new password ')
            })
            .catch((error) => {

                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    return (
        <div className=" w-full min-h-screen bg-slate-500 flex justify-center items-center lg:p-10">
            <div className="w-6/12 bg-slate-200 text-gray-700  rounded-xl  shadow-lg shadow-[#a700c7] p-14">
                <h1 className='text-3xl font-bold mb-8 '>Login</h1>
                <form onSubmit={registerHandel} >

                    <div className='email flex flex-col '>
                        <label htmlFor="email" className='font-semibold p-1 text-xl'> Email</label>
                        <input
                            ref={emailRef}
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Your Email'
                            className='p-4 rounded-xl border-[3px] border-gray-300' />
                        <p className="text-red-500">{emailError}</p>
                    </div>
                    <div className='password flex flex-col  '>
                        <label htmlFor="password" className='font-semibold p-1 text-xl'> Password</label>
                        <div className=' rounded-xl  border-gray-300   '>
                            <input
                                type={passShow ? "password" : 'text'}
                                name="password"
                                id="password"
                                placeholder='Your password'
                                className="p-4 w-full  rounded-xl border-[3px] border-gray-300" />
                            <span onClick={() => setPassShow(!passShow)} className="relative -top-10 -right-96 ">{passShow ? 'Show' : 'Hide'}</span>
                        </div>
                        <p className="text-red-500">{passError}</p>
                    </div>

                    <div>
                        <button className='btn btn-primary w-full my-8'>LogIn</button>
                    </div>
                    <p className="text-red-500">{errorMsg}</p>
                    <p className="text-green-500">{successMsg}</p>

                </form>

                <div className='my-4   '>
                    <hr className='border-t-2 border-gray-600' />
                    <p className=' relative -top-3 left-1/2 font-semibold p-1 border-2  border-gray-600 bg-slate-100 rounded-lg inline'>OR</p>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div className=' flex gap-4 ' >

                        <button className=" btn btn-ghost p-0 rounded-full"> <CiFacebook className='text-blue-500 w-11 h-11' /></button>
                        <button onClick={googleLogInHandel} className=" btn btn-ghost p-0 rounded-full">  <RiGoogleFill className='text-red-500 w-10 h-10 p-1  font-bold rounded-full border-4 border-red-500' /></button>
                        <button className=" btn btn-ghost p-0 rounded-full"> <VscGithub className='text-gray-800 w-10 h-10' /></button>

                    </div>
                    <div className='text-xl font-semibold py-4'>
                        <span>Create A new Account ?<Link to={'/register'} className='btn btn-link text-'>Register</Link></span>
                        <p onClick={forgetPassHandel} className="btn btn-link">Forget Password</p>
                    </div>

                </div>


            </div>

        </div>
    );
};

export default LogIn;