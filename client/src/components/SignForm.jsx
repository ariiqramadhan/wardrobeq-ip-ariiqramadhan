import { useEffect, useState } from 'react';
import axios from '../config/axiosinstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function SignForm({ type }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleLogin() {
        try {
            const { data } = await axios({
                method: 'post',
                url: '/login',
                data: {
                    email,
                    password,
                },
            });

            localStorage.setItem('access_token', data.access_token);
            toast.success('Successfully login');
            navigate('/');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    async function handleRegister() {
        try {
            await axios({
                method: 'post',
                url: '/register',
                data: {
                    email,
                    password,
                },
            });

            navigate('/login');
            toast.success('Successfully create account!');
        } catch (err) {
            if (Array.isArray(err.response.data.message)) {
                toast.error(err.response.data.message.join(', '));
            } else {
                toast.error(err.response.data.message);
            }
        }
    }

    function handleTask(e) {
        e.preventDefault();
        switch(type) {
            case 'login':
                handleLogin();
                break;
            case 'register':
                handleRegister();
                break;
        }
    } 


    useEffect(() => {
        async function handleCredentialResponse(response) {
            try {
                const { data } = await axios({
                    method: 'post',
                    url: '/google-login',
                    headers: {
                        google_token: response.credential
                    }
                });

                localStorage.setItem('access_token', data.access_token);
                navigate('/');
            } catch (err) {
                toast.error(err.response.data.message);
            }
        }

        google.accounts.id.initialize({
            client_id: '2663186177-c0olje8h84hhdvs5pjqdtesnvhvgek7g.apps.googleusercontent.com',
            callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: 'outline', size: 'large' }
        );
        google.accounts.id.prompt();
    }, []);


    return (
        <>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form className="card-body" onSubmit={handleTask}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="text"
                            placeholder="email"
                            className="input input-bordered"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            className="input input-bordered"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="label">
                            <a
                                href="#"
                                className="label-text-alt link link-hover"
                            >
                                Forgot password?
                            </a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary" type="submit">
                            {type === 'login' ? 'Login' : 'Sign Up'}
                        </button>
                    </div>
                </form>
                <div className="flex justify-center pb-5">
                    <div id="buttonDiv"></div>
                </div>
            </div>
        </>
    );
}
