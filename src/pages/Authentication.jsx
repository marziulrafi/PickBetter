import React, { useState, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../provider/AuthProvider";

const Authentication = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const { login, createUser, googleLogin, setUser } = useContext(AuthContext);
    const emailRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        if (isLogin) {
            // Login flow
            login(email, password)
                .then(() => {
                    navigate(from, { replace: true });
                })
                .catch((error) => setErrorMessage(error.message));
        } else {
            // Register flow
            const name = form.name.value;
            const photo = form.photo.value;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
            if (!passwordRegex.test(password)) {
                return setErrorMessage(
                    "Password must have 1 uppercase, 1 lowercase & min 6 characters."
                );
            }
            createUser(email, password)
                .then((result) => {
                    const user = result.user;
                    updateProfile(user, {
                        displayName: name,
                        photoURL: photo,
                    }).then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        navigate(from, { replace: true });
                    });
                })
                .catch((error) => setErrorMessage(error.message));
        }
    };

    const handleGoogleAuth = () => {
        googleLogin()
            .then(() => {
                navigate(from, { replace: true });
            })
            .catch((error) => setErrorMessage(error.message));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8">

                <div className="flex mb-6 border-b border-gray-200">
                    <button
                        className={`flex-1 py-2 cursor-pointer text-lg font-semibold transition ${isLogin
                            ? "text-indigo-600 border-b-2 border-indigo-600"
                            : "text-gray-500 hover:text-indigo-500"
                            }`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`flex-1 py-2 cursor-pointer text-lg font-semibold transition ${!isLogin
                            ? "text-indigo-600 border-b-2 border-indigo-600"
                            : "text-gray-500 hover:text-indigo-500"
                            }`}
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <>
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Photo URL</label>
                                <input
                                    type="text"
                                    name="photo"
                                    className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
                                    placeholder="Profile Image Link"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            ref={emailRef}
                            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-lg cursor-pointer font-semibold hover:from-indigo-600 hover:to-purple-600 transition"
                    >
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>


                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-3 text-gray-500 text-sm">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <button
                    onClick={handleGoogleAuth}
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                    <svg
                        aria-label="Google logo"
                        width="18"
                        height="18"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path
                            fill="#34a853"
                            d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                        ></path>
                        <path
                            fill="#4285f4"
                            d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                        ></path>
                        <path
                            fill="#fbbc02"
                            d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                        ></path>
                        <path
                            fill="#ea4335"
                            d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                        ></path>
                    </svg>
                    {isLogin ? "Login" : "Register"} with Google
                </button>


                {errorMessage && (
                    <p className="text-red-600 font-semibold text-sm mt-3">{errorMessage}</p>
                )}
            </div>
        </div>
    );
};

export default Authentication;
