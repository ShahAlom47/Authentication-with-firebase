import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";




const Navbar = () => {
    const { user, LogOutUser } = useContext(AuthContext)
    const navigate = useNavigate();

    const LogOutHandel = () => {
        LogOutUser()
            .then(() => {
                navigate('/')
            }).catch((error) => {
                console.log(error);
            });


    }
  


    return (
        <div className=" navbar  justify-between bg-base-100 ">
            <div className="flex-">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="nav-center ">
                <ul className="flex gap-5 font-semibold">
                    <NavLink>Home</NavLink>
                    <NavLink>Blog</NavLink>
                    <NavLink>About Us</NavLink>
                </ul>

            </div>
            <div className="flex-none">

                <div className="dropdown dropdown-end flex flex-row items-center">
                    <p className=" mx-4 text-lg font-semibold "> {user?.displayName}</p>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component"
                                src={user ? "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" :
                                    'https://img.freepik.com/free-vector/modern-question-mark-template-idea-message-vector_1017-47932.jpg?w=360&t=st=1712077300~exp=1712077900~hmac=bdc72319ef30d7e118913bfdf9e2b8a01a96423d867cf95bd39e10a8d96ae069'} />
                        </div>

                    </div>
                    {
                        user && <ul tabIndex={0} className="menu menu-sm dropdown-content mt-5 top-7 left-1 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a >Settings</a></li>
                            <li><a onClick={LogOutHandel}>Logout</a></li>
                        </ul>
                    }


                </div>
                <div>
                    {
                        user ?  <p></p> :<>
                        <Link to={'/login'} className=" btn btn-primary font-bold text-gray-200  mx-3 ">LogIn</Link>
                        <Link to={'/register'} className="btn btn-secondary font-bold ">Register</Link>
                    </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;