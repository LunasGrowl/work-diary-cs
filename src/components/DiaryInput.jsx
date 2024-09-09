import React from "react";
import { useState } from "react";
import "./DiaryInput.css";
import axios from "axios";

const today = new Date();

function getDate(){
    const day = today.getDate();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
    
}

const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

function getDay(){
    return dayOfWeek[today.getDay()];
}

const DiaryInput = ({setChange}) => {
    const[currentDate] = useState(getDate());
    const[currentDay] = useState(getDay());
    
    
    const [entry,setEntry] = useState({
        entry_date:getDate(),
        entry_day:getDay(),
        entry_content:""
    })
    const {entry_date,entry_day,entry_content} = entry
    const onInputChange = (e) => {
        setEntry({...entry,[e.target.name]:e.target.value})
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/entry/add",entry);
        setChange(('1'));

    }

    const notification = document.getElementById('form--notification');
    function notificationPopup(){
        notification.classList.add('fade');
        setTimeout(() => {notification.classList.remove('fade');}, 2000);
        

    }

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
                        <p id = "form--notification">Entry Submitted</p>
                        <button onClick = {notificationPopup} className = "transition m-0  px-3.5 leading-5 text-base font-semibold cursor-pointer border-0 da rounded-lg bg-cyan-300 text-cyan-700 hover:bg-cyan-400 bg-opacity-85 dark:text-cyan-300 dark:bg-cyan-700 dark:bg-opacity-75 dark:hover:bg-cyan-700" id = "form--button" type = "submit">Add</button>
                    </div>
                </div>
            </form>
            <hr className = "h-1 mx-auto my-4 bg-zinc-200 border-0 rounded dark:bg-zinc-800" ></hr>
        </div>
    )
}

export default DiaryInput;