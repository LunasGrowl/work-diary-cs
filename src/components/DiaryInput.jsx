import React from "react";
import { useState } from "react";
import axios from "axios";
import "./DiaryInput.css";
import Notification from "./DiaryInput/Notification";
import SubmitButton from "./DiaryInput/SubmitButton";

// Creates todays date object (YYYY-MM-DDTHH:mm:ss.sssZ)
const today = new Date(); 

// Returns the day of the week
function getDay(val){
    const day = new Date(val)
    const dayOfWeek = ['Sunday' ,'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]; // Array of days in the week
    return dayOfWeek[day.getDay()]; // Return todays day via the index in the array
}

// Diary Input Component
const DiaryInput = ({setChange}) => {
    const URL = import.meta.env.VITE_API;
    // Creates states for the current day to use in form header
    const[currentDate] = useState(new Date().toISOString().substr(0,10));
    const[currentDay] = useState(getDay(today));
    const[currentTime] = useState(new Date().toLocaleTimeString('en-US'));

    // Creates state for notification component
    const[notification , setNotification] = useState({
        style:"opacity-0",
        content:"",
    })

    // Creates state for entry object
    const [entry,setEntry] = useState({
        entry_date: currentDate,
        entry_day: currentDay,
        entry_content:"",
        entry_modify_date: currentDate,
        entry_modify_time: currentTime
    })


    // Changes the values of the entry object through inputs in the textfield
    const {entry_day,entry_content} = entry
    const onInputChange = (e) => {
        setEntry({...entry,[e.target.name]:e.target.value})
    };

    // will change the date only on every calander date change
    const onInputChangeDate = (e) => {
        setEntry({...entry,[e.target.name]:e.target.value, entry_day:getDay(e.target.value)})
    };

    // Method for submiting entries into the database from form element
    // The method will also change the styling of Notification Lable depending on the success of the entry
    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post(`${URL}/`,entry);
            setNotification({style:"text-indigo-800 bg-indigo-300 dark:text-indigo-300 dark:bg-indigo-900 opacity-1" , content : "Entry Sent" })
            await setChange(('1'));
        }catch(err){
            setNotification({style:"text-red-800 bg-red-300 dark:text-red-300 dark:bg-red-900 opacity-1" , content : "Entry Failed"})
        }
        setTimeout(()=> {setNotification({...notification})},3000) //Notification dissapears after a period of time
    }

    // HTML Form Structure
    return(
        <div id="form--block" className="w-9/12">
            <form onSubmit={(e)=> onSubmit(e)}>
                <div id = "form--heading" className="shrink flex justify-between flex-row"> 
                    <p className= "font-semibold pt-8">What did you do?</p>
                    <div id="form--date"className="flex" >
                        <p className = "font-medium text-zinc-700 dark:text-zinc-500 italic pt-8 form--day--display pr-4"   name = "entry_day" >{entry_day}</p>
                        <input onChange={(e)=>onInputChangeDate(e)} id = "dateHeader" type ="date"  className = "my-2 font-synth bg-slate-100 text-lg border-0 font-medium text-zinc-700 dark:text-zinc-500 italic pt-8" defaultValue= {new Date().toISOString().substr(0,10)} name = "entry_date" />
                    </div>
                </div>
                <div className="flex flex-col ">
                    <textarea spellCheck="false" className="text-base h-44 outline-0 resize-none rounded-xl bg-zinc-200 text-black dark:bg-synth-900 dark:text-white" autoComplete = "off" id="form--input" value={entry_content} name = "entry_content" type="text" onChange={(e)=>onInputChange(e)}/>
                    <div className="pt-2 flex justify-end">
                        <Notification  type  = {notification.style} content = {notification.content} /> 
                        <SubmitButton/>
                    </div>
                </div>
            </form>
            <hr className = "h-1 mx-auto my-4 bg-zinc-200 border-0 rounded dark:bg-zinc-800" ></hr>
        </div>
    )
}

export default DiaryInput;