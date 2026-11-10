import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'; 
import api from './api';

function Register(){
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const credentialsFomat = {

        first_name : "",
        last_name : "",
        email : "",
        password : "",
        password_confirmation: "",
    }

    const [credentials, setCredentials] = useState(credentialsFomat);


    const credentialsChanges = (e) =>{

        const {name, value} = e.target;

        setCredentials(prev => ({
            ...prev,
            [name] : value,
        }));
        
    }

    const submitCredentials = async(e) => {
        
        e.preventDefault();

        try{
            setLoading(true);

            await api.get('http://localhost:8000/sanctum/csrf-cookie');

            await api.post('/register', credentials);
            alert("Successfully Registered Please login to continue");
            navigate('/login');
        }
        catch(error){
            setError(error.response?.data?.errors?.['email']?.[0])
            console.log(error.response?.data || error.message);
            if(!error.response?.data?.errors?.['email']?.[0])
            {
                alert(error.response?.data?.message);
            }
            
        }
        finally{
            setLoading(false);
        }

    } 

    return(
        <div className=" w-full min-h-screen overflow-x-hidden bg-gradient-to-bl from-red-50 to-blue-50 pb-10">
                            
            <div className="sticky top-0 z-50 flex items-center justify-between bg-white shadow-lg
                px-4 py-4 sm:px-8 md:px-20 gap-3">
        
                <div className='flex items-center'>
        
                    <div className=' flex  items-center justify-center h-8 w-8 bg-black rounded-lg mr-3'>
                                        
                        <FaCheck className='text-white'/>
        
                    </div>

                        <h2>Task Tracker</h2>

               </div>
                
                <div>

                    <p>A little progress every day</p>

                </div>

            </div>

            <form
                className="w-full max-w-md sm:max-w-lg md:max-w-xl xl:max-w-2xl mx-auto bg-white mt-10 sm:mt-20 p-5 sm:p-10 rounded-xl shadow-2xl "
                method="POST"
                onSubmit={submitCredentials}
            >
                <div>

                    <p
                        className="text-red-700 uppercase font-serif text-sm font-semibold tracking-widest mb-3"
                    >
                        Welcome Aboard
                    </p>

                    <h1
                        className="text-4xl font-semibold font-serif mb-1"
                    >

                        Create your account.

                    </h1>

                    <p
                        className="text-md font-serif text-gray-500 mb-4"
                    >

                        Pick up where you left off and
                        make room for what matters.

                    </p>

                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >

                        <div
                            className="w-full"
                        >

                            <label 
                                className="block text-gray-500 font-serif text-md mb-2"
                                htmlFor="first_name"
                            >
                                First Name <span className="font-semibold text-red-500">*</span>
                                
                            </label>

                            <input 
                                className="px-4 py-2 border border-gray-500 font-serif rounded-lg bg-gray-50 w-full
                                    focus:outline-none focus:ring-2 focus:border-none focus:ring-green-500"
                                type="text"
                                name="first_name"
                                id="first_name"
                                placeholder="First Name"
                                value={credentials.first_name}
                                onChange={credentialsChanges}
                                required
                            />
                        </div>

                        <div>

                            <label
                                className="block text-gray-500 font-serif text-md mb-2"
                                htmlFor="last_name"
                            >

                                Last Name <span className="font-semibold text-red-500">*</span>

                            </label>

                            <input 
                                className="px-4 py-2 border border-gray-500 font-serif rounded-lg bg-gray-50 w-full
                                    focus:outline-none focus:ring-2 focus:border-none focus:ring-green-500"
                                type="text"
                                name="last_name"
                                id="last_name"
                                value={credentials.last_name}
                                placeholder="Last Name"
                                onChange={credentialsChanges}
                                required

                            />

                        </div>

                        <div>

                            <label
                                className="block text-gray-500 font-serif text-md mb-2"
                                htmlFor="email"
                            >

                                Email <span className="font-semibold text-red-500">*</span>
                                <span className="font-serif text-red-500">{error}</span>

                            </label>

                            <input
                                className="px-4 py-2 border border-gray-500 font-serif rounded-lg bg-gray-50 w-full
                                    focus:outline-none focus:ring-2 focus:border-none focus:ring-green-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={credentials.email}
                                onChange={credentialsChanges}
                                required
                            />

                        </div>

                        <div>

                            <label
                                className="block text-gray-500 font-serif text-md mb-2"
                                htmlFor="password"
                            >

                                Password <span className="font-semibold text-red-500">*</span>

                            </label>

                            <input
                                className="px-4 py-2 border border-gray-500 font-serif rounded-lg bg-gray-50 w-full
                                    focus:outline-none focus:ring-2 focus:border-none focus:ring-green-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={credentials.password}
                                onChange={credentialsChanges}
                                required
                            />

                        </div>

                        <div>

                            <label
                                className="block text-gray-500 font-serif text-md mb-2"
                                htmlFor="confirm_password"
                            >
                                Confirm Password <span className="font-semibold text-red-500">*</span>
                            </label>

                            <input
                                className="px-4 py-2 border border-gray-500 font-serif rounded-lg bg-gray-50 w-full
                                    focus:outline-none focus:ring-2 focus:border-none focus:ring-green-500"
                                type="password"
                                id="confirm_password"
                                name="password_confirmation"
                                placeholder="Confirm Password"
                                value={credentials.password_confirmation}
                                onChange={credentialsChanges}
                                required
                            />
                        </div>

                    </div>

                    <div className="flex flex-col-reverse  sm:flex-row justify-end gap-3 mt-4">

                        <button
                            className="px-4 py-2 border border-gray-500 rounded-lg font-semibold
                                hover:bg-black hover:text-white hover:border-gray-500
                                transition-transform duration-300 hover:-translate-y-1 sm:hover:-translate-x-1 hover:shadow-lg"
                            type="button"
                            onClick= { () => navigate(-1) }
                        >
                            Back
                        </button>

                        <button
                        className="bg-amber-700 px-4 py-2 text-white font-semibold rounded-lg font-serif
                                transition-all duration-300 hover:-translate-y-1 sm:hover:translate-x-1 hover:shadow-lg"
                            type="submit"
                        >

                            {
                                loading ?
                                    (<>
                                        Creating account
                                        <span className="ml-1 inline-flex">
                                            <span className="animate-pulse">.</span>
                                            <span className="animate-pulse [animation-delay:150ms]">.</span>
                                            <span className="animate-pulse [animation-delay:300ms]">.</span>
                                        </span>
                                    </>)

                                    : ( "Register" )
                            }

                        </button>

                    </div>
                
                </div>

            </form>

        </div>
    )
}
    

    export default Register;