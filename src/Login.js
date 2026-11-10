import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import api from './api';
import { useNavigate, useLocation } from 'react-router-dom';


function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const credentialsFormat = {
        
        email : "",
        password : "",
    }
    const [credentials, setCredentials] = useState(credentialsFormat);

    const handleCredentialsChange = (e) => {

        const {name, value} = e.target;

        setCredentials(prev => ({
            ...prev,
            [name] : value,
        }))

    }

    const handleCredentialsSubmit = async(e) => {

        e.preventDefault();

        try{
            setLoading(true);
            
            await api.get('http://localhost:8000/sanctum/csrf-cookie');
            
            await api.post('/login', credentials)
            setCredentials(credentialsFormat);
            navigate('/dashboard');
            setError("");
            
        }
        catch(error){
            const err = error.response?.data?.message;
            console.log(error.response?.data || error.message);
            setError(err || "");
        }
        finally{
            setLoading(false);
        }

    }
    return(
        <div className="w-full min-h-screen overflow-x-hidden bg-gradient-to-bl from-red-50 to-blue-50 pb-10">
                            
            <div className="sticky top-0 z-50 flex items-center justify-between bg-white shadow-lg
                            px-4 py-4 sm:px-8 md:px-20 gap-3">
        
                <div className='flex items-center'>
        
                    <div className=' flex  items-center justify-center h-8 w-8 bg-black rounded-lg mr-3'>
                                        
                        <FaCheck className='text-white'/>
        
                    </div>

                    <h2>Task Tracker</h2>
                            
                </div>
                
                <div>
                    <p> A little progress every day </p>
                </div>
            </div>

                <form
                    className="flex flex-col mx-auto  max-w-md w-full mt-20 bg-white p-10
                        rounded-xl shadow-2xl"
                    method="POST"
                    onSubmit={handleCredentialsSubmit}
                >

                    <p
                    className="text-red-700 uppercase font-semibold tracking-widest font-serif mb-2 text-sm"
                    >

                        Your space to focus

                    </p>

                    <h2
                     className="font-semibold font-serif text-4xl mb-3"
                    >

                        Welcome back.

                    </h2>
                    <p
                        className="font-serif text-md text-gray-500 mb-4"
                    >

                        A clearer day starts here. Pick up where you left off.

                    </p>

                    <label
                        className="font-serif text-md text-gray-500 mb-2"
                        htmlFor="email"
                    >

                        Email  <span className="text-red-600 font-bold">* </span>
                        <span className="text-red-600 font-serif"> {error}</span>
                            
                    </label>

                    <input 
                        className="mb-5 px-4 py-2 w-full border border-gray-400 rounded-lg font-serif bg-gray-50
                        focus:outline-none focus:ring-1 focus:border-none focus:ring-green-500"
                        id="email"
                        name="email"
                        type="email"
                        value={credentials.email}
                        placeholder="Email"
                        onChange={handleCredentialsChange}
                        required
                    />
                    
                    <label
                        className="text-md font-serif text-gray-500 mb-2"
                    >
                        
                        password <span className="text-red-600 font-bold">*</span>
                        
                    </label>

                    <input
                        className="px-4 py-2 w-full border border-gray-400 rounded-lg font-serif bg-gray-50
                            focus:outline-none focus:ring-1 focus:border-none focus:ring-green-500"
                        name="password"
                        type="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleCredentialsChange}
                        required
                    />

                    <div className="flex flex-col-reverse mt-6 gap-3 md:flex-row md:justify-end">
                        <button
                            className="px-4 py-2 border border-gray-500 rounded-lg font-semibold
                                hover:bg-black hover:text-white hover:border-gray-500
                                transition-transform duration-300 hover:-translate-y-1 sm:hover:-translate-x-1 hover:shadow-lg"
                            type="button"
                            onClick={() => navigate('/')}
                        >

                            Back

                        </button>

                        <button
                            className="bg-amber-700 px-4 py-2 text-white font-semibold rounded-lg
                                transition-all duration-300 hover:-translate-y-1 sm:hover:translate-x-1 hover:shadow-lg"
                            type="submit"

                        >
                            {
                                    loading ?
                                        (<>
                                            
                                            Signing in
                                            <span className="ml-1 inline-flex font-semibold">
                                            <span className="animate-pulse">.</span>
                                            <span className="animate-pulse [animation-delay:150ms]">.</span>
                                            <span className="animate-pulse [animation-delay:300ms]">.</span> 
                                            </span>
                                        </>)

                                        :  ('Login')
                            }
                            

                        </button>
                    </div>

                </form>
            </div>

    )

}
export default Login;