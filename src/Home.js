import { FaCheck } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
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

                    <div className="mt-16 sm:mt-20 lg:mt-28 lg:px-10">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 max-w-6xl mx-auto w-full px-5 lg:px-0">
                            {/* Left */}
                            <div className="w-full">
                                <p
                                    className="text-red-700 uppercase font-semibold tracking-widest font-serif"
                                >
                                    Your Space to focus
                                
                                </p>

                                <h2
                                    className="font-bold text-4xl sm:text-5xl lg:text-6xl mt-5 leading-snug"
                                >

                                    Welcome to a clearer day.

                                </h2>

                                <p
                                    className="text-gray-500 text-sm sm:text-base font-serif mt-5 max-w-[400px] leading-relaxed"
                                >

                                    meet a thoughtful home for your to-dos. Gather
                                    what's on you mind, see what matters next, and
                                    make a little progress every day.

                                </p>

                                <div className="flex flex-col xs:flex-row sm:flex-row gap-3 mt-7">
                                    <button
                                        className="px-4 py-2 bg-amber-700 rounded-lg text-white font-serif font-semibold shadow-sm
                                            transition-all duration-500 hover:-translate-y-2 hover:bg-amber-800 hover:shadow-lg w-full sm:w-auto"
                                        onClick={() => navigate('/login')}
                                    >

                                        Log in
                                    
                                    </button>

                                    <button
                                        className="px-4 py-2 bg-white text-gray-900 font-semibold font-serif border border-black
                                            rounded-lg hover:bg-black hover:text-white transition-transform duration-500 hover:-translate-y-2
                                            w-full sm:w-auto"
                                        onClick={() => navigate('/register')}
                                    >

                                        Register
                                        
                                    </button>
                                </div>

                            </div>

                            {/* Right */}
                            <div className="bg-white rounded-2xl w-full min-w-0 shadow-xl overflow-hidden">
                                <div className="flex justify-between gap-3 px-5 sm:px-8 lg:px-10 py-5 min-w-0">
                                    <div>
                                        <p
                                            className="text-red-700 uppercase font-semibold tracking-widest font-serif mb-2"
                                        >

                                            a look inside
                                        
                                        </p>

                                        <h2
                                            className="text-3xl font-semibold font-serif"
                                        >

                                            Your day, at a glance.

                                        </h2>

                                        <p
                                            className="text-gray-400 text-md"
                                        >

                                            A little structure makes room for the good stuff.

                                        </p>

                                    </div>

                                    <div className=" flex justify-center items-center w-10 h-10 bg-gray-200 rounded-xl">
                                            <FaCheck />
                                    </div>
                                    
                                </div>

                                <hr className="border-1 border-gray-200"/>

                                <div className="px-5 sm:px-8 lg:px-10 py-7 md:py-2 lg:py-9">

                                    <div className="flex justify-between">

                                        <p className="text-md text font-semibold font-serif">

                                            Today's priorities

                                        </p>

                                        <p
                                            className="bg-gray-200 px-4 py-2 rounded-xl font-serif font-semibold text-gray-400 text-xs"
                                        >

                                            2 to go

                                        </p>

                                    </div>

                                    <div className="flex flex-col gap-y-3">
                                        <div className="flex items-center gap-5">
                                            <p className="h-5 w-5 border-2 border-red-600 rounded-full shrink-0"></p>

                                            <p>Plan the week ahead</p>
                                        </div>

                                        <hr className="border-1 border-gray-300"/>

                                        <div className="flex items-center gap-4 py-2">
                                            <p className="h-5 w-5 border-2 border-red-600 rounded-full shrink-0"></p>

                                            <p>Send the project update</p>
                                        </div>

                                        <hr className="border-1 border-gray-300"/>

                                        <div className="flex items-center gap-5">
                                            <p className="flex justify-center items-center h-5 w-5 bg-green-500 rounded-full shrink-0">
                                                <FiCheck  className="text-white"/>
                                            </p>

                                            <p className="line-through text-gray-400">Plan the week ahead</p>
                                        </div>
                                        
                                    </div>

                                </div>

                                <hr className="border border-gray-200"/>
                                <div className="flex items-center px-10 py-5 bg-gray-100 rounded-b-2xl" >

                                    <span className="h-2 w-2 rounded-full bg-orange-600 mr-3 font-extrabold text-5xl"></span>

                                    <p
                                        className="text-gray-500 font-serif"
                                    >One thing at a time. You've got this.</p>
                                </div>

                            </div>

                        </div>

                    </div>
        </div>
    )
}
export default Home;
