import React from "react";
import { useState } from "react";
import axios from "axios";
import "./DiaryInput.css";
import Notification from "./DiaryInput/Notification";
import SubmitButton from "./DiaryInput/SubmitButton";

// Creates todays date object (YYYY-MM-DDTHH:mm:ss.sssZ)
const today = new Date(); 

// Returns the day of the week
function getDay(){
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]; // Array of days in the week
    return dayOfWeek[today.getDay()]; // Return todays day via the index in the array
}

// Returns the date as custom string (DD-MM-YYYYY)
function getDate(){
    const day = today.getDate();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
}

// Retrives the size of database for ID value
// Potentially not being used as database will auto incrament, made for early development
const result = await axios.get("https://localhost:7071/api/Entry");
const size = result.data.legnth;


const DiaryInput = ({setChange}) => {
    // Creates states for the current day to use in form header
    const[currentDate] = useState(getDate());
    const[currentDay] = useState(getDay());

    // Creates state for notification component
    const[notification , setNotification] = useState({
        style:"opacity-0",
        content:"",
    })

    // Creates state for entry object
    const [entry,setEntry] = useState({
        id: size,
        entry_date:getDate(),
        entry_day:getDay(),
        entry_content:""
    })

    // Changes the values of the entry object through inputs in the textfield
    const {entry_date,entry_day,entry_content} = entry
    const onInputChange = (e) => {
        setEntry({...entry,[e.target.name]:e.target.value})
    };

    // Method for submiting entries into the database from form element
    // The method will also change the styling of Notification Lable depending on the success of the entry
    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post("https://localhost:7071/api/Entry",entry);
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
                        <p className = "font-medium text-zinc-700 dark:text-zinc-500 italic pt-8 form--day--display pr-4" value = {entry_day} name = "entry_day" >{currentDay}</p>
                        <p className = "font-medium text-zinc-700 dark:text-zinc-500 italic pt-8 form--date--display" value = {entry_date} name = "currentDate">{currentDate}</p>
                    </div>
                </div>
                <div className="flex flex-col ">
                    <textarea spellCheck="false" className="text-base h-44 outline-0 resize-none rounded-xl bg-zinc-200 text-black dark:bg-zinc-900 dark:text-white" autoComplete = "off" id="form--input" value={entry_content} name = "entry_content" type="text" onChange={(e)=>onInputChange(e)}/>
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