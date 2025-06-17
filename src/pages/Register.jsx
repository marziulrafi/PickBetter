import React, { useState, use } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../provider/AuthProvider';

const Register = () => {
    const { createUser, setUser, googleLogin } = use(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleRegister = e => {
        e.preventDefault();

        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return setErrorMessage(
                'Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.'
            );
        }

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                updateProfile(user, {
                    displayName: name,
                    photoURL: photo,
                })
                    .then(() => {
                        setUser({
                            ...user,
                            displayName: name,
                            photoURL: photo,
                        });
                        navigate(from, { replace: true });
                    })
                    .catch((error) => {
                        console.log(error.message);
                        setErrorMessage(error.message);
                    });
            })
            .catch((error) => {
                console.log(error.message);
                setErrorMessage(error.message);
            });
    };

    const handleGoogleRegister = () => {
        googleLogin()
            .then((result) => {
                const user = result.user;
                setUser(user);
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error.message);
                setErrorMessage(error.message);
            });
    };

    return (
        <div className="card bg-base-100 w-full max-w-sm mx-auto mt-10 mb-10 shrink-0 shadow-xl">
            <h1 className="text-3xl text-center mt-3 font-bold">Register Here</h1>
            <div className="card-body">
                <form onSubmit={handleRegister} className="fieldset">
                    <label className="label">Name</label>
                    <input type="text" className="input" name="name" placeholder="Enter Name" required />
                    <label className="label">Photo URL</label>
                    <input type="text" className="input" name="photo" placeholder="Enter Photo URL" required />
                    <label className="label">Email</label>
                    <input type="email" className="input" name="email" placeholder="Enter Email" required />
                    <label className="label">Password</label>
                    <input type="password" className="input" name="password" placeholder="Password" required />
                    <button className="btn btn-neutral mt-4">Register</button>
                </form>

                <div className="divider">OR</div>

                <button onClick={handleGoogleRegister} className="btn bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Register with Google
                </button>

                <p className="mt-5">
                    Already have an account? <Link className="underline text-blue-600" to="/login">Please Login</Link>
                </p>

                {errorMessage && <p className="text-red-600 font-bold mt-4">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Register;