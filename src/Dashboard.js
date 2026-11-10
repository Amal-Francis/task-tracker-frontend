import { FaCheck, FaTrash } from 'react-icons/fa';
import {useState, useEffect} from 'react';
import api from './api';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [all, setAll] = useState([]);
    const [taskStatus, setTaskStatus] = useState(false);
    const [active, setActive] = useState([]);
    const [errors, setErrors] = useState({});
    const [completed, setCompleted] = useState([]);
    const [newTask, setNewTask] = useState({title : ''});
    const [status, setStatus] = useState({

         all : true ,
         active : false ,
         completed : false ,

    });

    useEffect(() =>{
        getTask();
    },[]);

    
    const filterdTask = status.all? all
                        :status.active ? active
                        :completed;
                             

    const getTask = async() => {
        try{
            const response = await api.get('/show');
            const task = response.data.all;
            setAll([...task].sort(
                (a, b) => Number(a.completed) - Number(b.completed)
            ))
            
            setActive(response.data.active);
            setCompleted(response.data.completed);
            // console.log(response.data.active);
            setTaskStatus(true);

            
        }
        catch(error){
            console.log(error.response?.data || error.message );

            try{

                await api.post('/logout');
                navigate('/login');

            }
            catch(error){
                if(error.response?.status === 401)
                {
                    navigate('/login');
                }else{
                    alert("Oops! Something went wrong. Please restart the application and try again.");

                }
            }
        }
        
        
    }

    const addTask = async () => {
        
        if(newTask.title === "")
        {
            setErrors({title : ['The title field is required.']})
            return;
        }
        const id = all.length > 0 ? Math.max(...all.map(task => Number(task.id))) : 0;
        setAll(prev =>[{
            id : id + 1,
            title : newTask.title,
            updated_at : new Date().toISOString(),
            created_at : ""
        }, ...prev])

        setErrors({title : ""});
        try{
            await api.post('/add', newTask);
            // console.log(response);
            setNewTask({title : ''});
            getTask();
        }
        catch(error){
            if(error.response?.statu === 401){
                navigate('/login');
            }
            if(error.response?.status === 422 ){

                const errors = error.response.data.errors;
                setErrors(errors);
                console.log(errors.title?.[0]);
            }else{
                console.log("Something went wrong");
            }
        }
    } 


    const changeStatus = (e) => {
        
        const name = e.currentTarget.name;
        
        setStatus(prevStatuses =>{
            return Object.fromEntries(
                Object.entries(prevStatuses).map(([key]) =>{
                    return [key, key === name];
                })
            )
        }
         );

    }

    const logout = async() => {
        try{
            setLoading(true);
            await api.post('/logout');
            navigate('/login');
        }
        catch(error){

            if(error.response?.data?.status === 401){
                navigate('/login');
            }else{

                alert('Oops! Something went wrong. Please restart the application and try again.');
                console.log(error.response?.data || error.message);

            }

            
        }
        finally{
            setLoading(false);
        }
    }

    const toggleCompleted = async (id) => {
        
           const updated =  all.map(all =>
            all.id === id ?
            {...all , completed:!all.completed, updated_at : new Date().toISOString()}
            : all
        );

        const sorted = updated.sort(
            (a, b) =>  Number(a.completed) - Number (b.completed) ||
                       new Date(b.updated_at) - new Date(a.updated_at)
        );
        
        setAll(sorted)
        setActive(sorted.filter(task => !task.completed));
        setCompleted(sorted.filter(task => task.completed));


        try{
            await api.put(`/completed/${id}`)
            getTask();
            
        }
        catch(error){
            console.log(error.response?.data || error.message);
        }
        
    }

    const remove = async (id) => {

        const confirm = window.confirm("Are you sure you want to delete this task? This action cannot be undone.")
        if(!confirm) return;

        setAll(all.filter((task) => task.id !== id));
        setCompleted(completed.filter((task) =>task.id !== id));
        setActive(active.filter((task) =>task.id !== id));
        try{
            await api.delete(`/delete/${id}`)
            getTask();

        }
        catch(error){
            console.log(error.response?.data || error.message);
            alert("Somthing went Wrong")
        }
    } 


    return(
        <div className=" w-screen min-h-screen bg-gradient-to-bl from-red-50 to-blue-50 pb-10">
            <div className="sticky top-0 z-50 flex justify-between bg-white shadow-lg
                px-4 py-4 sm:px-8 md:px-20 gap-3">
                <div className='flex items-center'>
                    <div className=' flex  items-center justify-center h-8 w-8 bg-black rounded-lg mr-3'>
                        <FaCheck className='text-white'/>
                    </div>
                    <h2>Task Tracker</h2>
                </div>

                <div className='flex items-center gap-4'>
                    <p>A little progress every day</p>

                    <button
                    className={`px-4 py-2 border border-gray-600 rounded-md font-serif
                        transition-all duration-100 hover:bg-black hover:text-white
                        ${loading ? "bg-black text-white" : ""}`}
                    onClick={logout}
                    >
                        {
                            loading?
                            (<>
                                Signing out
                                <span className='ml-1 inline-flex'>
                                    <span className='animate-pulse'>.</span>
                                    <span className='animate-pulse [animation-delay:150ms]'>.</span>
                                    <span className='animate-pulse [animation-delay:350ms]'>.</span>
                                </span>
                            </>)
                            : ('Logout')
                        }
                        
                        
                    </button>

                </div>
            </div>

            <div className='w-full mx-auto max-w-3xl px-4'>
                <h2 className='text-4xl font-bold font-serif mt-10'>
                    Make room for what matters.
                </h2>
                <p
                 className='font-serif text-gray-500 mt-2'
                >
                    A simple place to collect your tasks and keep moving
                    
                </p>

                <div>
                    <h3
                        className='text-2xl font-semibold font-serif mt-6'
                    >
                        Add somthing to your list
                        
                    </h3>

                    <div className='w-full flex flex-col sm:flex-row gap-3 mt-3'>
                        <input 
                            className='w-full sm:flex-1  min-w-0 px-5 py-4 rounded-md border border-gray-300
                                shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500'
                            type='text'
                            name='title'
                            placeholder='What nees to get done?'
                            value={newTask.title}
                            onChange={(e) => {setNewTask({
                                title : e.target.value
                            }) }}
                        />
                        <button 
                            className='w-full sm:w-auto px-4 py-4 bg-amber-800 text-white font-semibold rounded-xl transition-all
                                duration-500 hover:-translate-y-1 hover:bg-amber-900'
                            onClick={addTask}
                        >
                            Add Task
                        </button>
                    </div>
                    {
                        errors.title && (
                            <p className='text-red-500 text-sm mt-1 font-serif'>
                                *{errors.title[0]}
                            </p>
                        )
                    }
                </div>

                <div className='w-full mt-10 bg-white p-10 rounded-t-md shadow-md'>
                    <div className='flex justify-between'>
                        <h3
                            className='font-semibold font-serif text-2xl'
                        >
                            Your tasks
                            
                        </h3>

                        <p className='text-md text-gray-500'>{active.length} active . {all.length} total</p>
                    </div>

                    <div className='flex justify-start mt-5'>
                        <button
                            className={`px-4 py-2 rounded-lg mr-5 font-semibold
                                ${status.all ? "bg-black text-white"  :  "text-black"}  `}
                            name='all'
                            onClick={changeStatus}
                        >
                            All
                            
                        </button>

                        <button
                            className={`px-4 py-2 mr-5 font-semibold rounded-lg
                                ${status.active ? "bg-black text-white"  :  "text-black"}`}
                                name='active'
                            onClick={changeStatus}
                        >
                            Active
                        
                        </button>

                        <button
                            className={`px-4 py-2 font-semibold rounded-lg
                                 ${status.completed ? "bg-black text-white"  :  "text-black"}`}
                            name='completed'
                            onClick={changeStatus}
                        >
                            Completed
                            
                        </button>

                    </div>

                </div>

                <div className='w-full min-h-[250px] mt-[1px] bg-white p-10 rounded-b-md shadow-md h-full'>

                    <div className=''>
                        {filterdTask.length !== 0
                            ?<div>
                                <AnimatePresence>
                                { 

                                
                                    filterdTask.map((task) => {
                                        return(
                                            <motion.div
                                                key={task.id}
                                                layout
                                                initial={{opacity: 0, y : 10}}
                                                animate={{opacity: 1, y: 0}}
                                                exit={{ opacity: 0, y: -10}}
                                                transition={{
                                                    layout:{
                                                        type: "spring",
                                                        stiffness: 300,
                                                        damping: 30
                                                    },
                                                    opacity: { duration: 0.2 }
                                                }}
                                                className='flex items-center justify-between mb-5'
                                            >
                                                
                                                    
                                                <label
                                                    className={`px-5 py-3  w-full mr-5 rounded-md font-serif hover:cursor-pointer
                                                        flex items-center ${task.completed? 
                                                            "border-2 border-green-500 text-green-500 bg-green-50" 
                                                            : "border-2 border-gray-700" }`}
                                                >

                                                    <input 
                                                    className='mr-3 h-5 w-5'
                                                    id={task.id}
                                                    type='checkbox'
                                                    checked={task.completed}
                                                    onChange={() => toggleCompleted(task.id)}
                                                    />
                                                        <div className='flex justify-between w-full'>
                                                            <span className={`${task.completed ? "line-through" : ""}`}>{ task.title}</span>

                                                            <p>{task.completed? "completed" : ""}</p>
                                                        </div>
                                                       
                                                </label>
                                                

                                                <FaTrash size={20} className='text-red-500 transition-all duration-500
                                                    hover:-translate-y-1 hover:text-red-600 '
                                                    onClick={() =>remove(task.id)}
                                                />
                                                

                                            
                                        </motion.div>
                                    )})}

                                    
                                    

                            </AnimatePresence>
                            </div>

                            : taskStatus ? (<div className='flex flex-col justify-center items-center h-full'>

                                <div className=' flex justify-center items-center w-10 h-10 bg-blue-600
                                    rounded-xl'>
                                    <FaCheck size={20} className='text-white'/>
                                </div>
                                <h3 
                                    className='text-center font-semibold text-lg font-serif mt-2'
                                >

                                    { all.length === 0 ? "A fresh page." 
                                     : active.length === 0 ? "No active task found" : "No completed task found"}
                                    
                                </h3>

                                <p
                                    className='text-gray-600 font-serif text-md mt-1'>

                                    { all.length === 0 ? "Add your first task above to get started." : ""}
                                    
                                </p>
                            </div>)
                            : (<div className='flex flex-col justify-center min-h-full mt-10 items-center'>
                                    <div className='h-10 w-10 border-4 border-gray-300 border-t-blue-600 rounded-full
                                     animate-spin'>

                                    </div>
                                    <h2>Loading</h2>
                            </div>)
                            }
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Dashboard;
