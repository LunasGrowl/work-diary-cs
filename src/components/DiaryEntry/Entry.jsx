import React, { useState } from "react";
import axios from "axios";
import { useRef } from "react";

const Entry = (prop) => {
    const URL = import.meta.env.VITE_API;
 
    /**
     * @brief Initialising states. 
     * 
     * @var currentDate State for the current Date in format YYYY-MM-DD.
     * @var currentTime State for the current time in 12 Hour clock format.
     * @var date State for the date data of an entry.
     */  
    const[currentDate] = useState(new Date().toISOString().substr(0,10));
    const[currentTime] = useState(new Date().toLocaleTimeString('en-US'));
    const [date , setDate] = useState(prop.date)

    // Refrences for content data 
    const paraRef = useRef();
    const listRef = useRef();

    /**
     * @brief Method for sending the updated entry object.
     * 
     * @var content Variable for the content of the Entry.
     * @var list Variable for any bullet points in the Entry.
     * Every list item will have a "-" infront
     * 
     * @description This is called when the update button is clicked.
     * First it will create a entry object by using the states
     * and refrences. After a check is made if there are any list 
     * elements. If true concat the list with the "-" bullet points.
     * Then try and update the entry via a put method witht he object
     * in the header.
     * 
     * Once complete display message success notification
     * 
     * @todo Make a failed notification
     */
    function handleClick(){
        var content = paraRef.current.innerText 
        const list =  listRef.current.innerText.replaceAll(/^/gm,"-")
        if(listRef.current.innerHTML !=""){
            content = content + list
        }
        try{
            axios.put(`${URL}/` + prop.id ,
            {
                'id':prop.id,
                'entry_Content': content, 
                'entry_Date': date, 
                'entry_Day': day,
                'entry_Modify_Date': currentDate, 
                'entry_Modify_Time': currentTime
                
            })
        }catch(err){}
        notificationPopup(prop.id);
    }

    /**
     * @brief Deletes an entry from the database.
     * 
     * @param id This is the Id of the entry to be deleted.
     * 
     * @description A delete method request is sent with the id appeneded
     * to the url. Once a delete has happened it will change a state
     * telling the app too re-render the entries.
     */
    const deleteEntry = async(id)=>{
        axios.delete(`${URL}/` + id);
        prop.setChange('1');
    }

    /**
     * @brief Displays a notification on specific entry when called.
     * 
     * @param id This is the Id of the entry to display the notificaiton.
     * 
     * @description This will first retrive the notification element for 
     * the entry that has been update. Then add the "fade" class which 
     * will mke it visable. After 2 seconds remove the fade class.
     */
    function notificationPopup(id){
        const notification = document.getElementById(id).getElementsByTagName('label')[0];
        notification.classList.add('fade');
        setTimeout(() => {notification.classList.remove('fade');}, 2000);
    }

    /**
     * @brief This will return the day of the week for any given date. 
     * 
     * @param dateString This is the current date in YYYY-MM-DD format.
     * 
     * @returns Returns the day of the week by acting as an index. 
     */

    function getDayName(dateString){
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d = new Date(dateString);
        return days[d.getDay()];
    }

    // Sets day as variable
    const day = getDayName(date)
    
    /**
     * @brief When the date gets changed it will change the value of the 
     * date state for update method.
     * 
     * @param  e On event
     */
    const onInputChangeDate = (e) => {
        setDate(e.target.value)
    };

    // HTML for each entry
    return(
        <div key = {prop.id} className = "group justify-between flex flex-row" id = "content--text">
            <div className="content--block flex" id = {prop.id}  >
                <div id = "id--child"className="content--title ">
                    <div className="flex flex-row items-center ">
                        <h3 className="font-semibold  text-cyan-700 dark:text-cyan-400">{getDayName(date)}</h3>
                        <input onChange={(e)=>onInputChangeDate(e)} id = "date"type ="date"  className = " bg-slate-100 text-lg border-0 font-medium text-zinc-700 dark:text-zinc-500 italic pl-8" defaultValue= {prop.date} name = "entry_date" />
                    </div>
                    <div className="flex-row  flex justify-end">
                        <label id="update--label" className="mt-1 py-1 px-2  bg-indigo-300 text-indigo-800 dark:text-indigo-300 dark:bg-indigo-800" >Entry Saved</label>
                        <span onClick = {() => handleClick()}  className="edit--icon text-zinc-700 dark:text-zinc-500 material-symbols-outlined transition h-6 rounded-lg opacity-0  group-hover:opacity-100 hover:text-indigo-800 hover:bg-indigo-300 hover:dark:text-indigo-300 hover:dark:bg-indigo-800 cursor-pointer inline-block list-none mt-1 py-1 px-1" >save</span>
                        <span onClick = {() => deleteEntry(prop.id)} className="delete--icon material-symbols-outlined text-zinc-700 dark:text-zinc-500 transition h-6 rounded-lg opacity-0  group-hover:opacity-100 hover:text-red-800 hover:bg-red-300 hover:dark:text-red-300 hover:dark:bg-red-800 cursor-pointer inline-block list-none mt-1 py-1 px-1" >delete</span>
                    </div>
                </div>
                <div suppressContentEditableWarning={true} className="content--entry max-w-max" spellCheck = "false" contentEditable = "true" id="content--content">
                    <p className="break-words text-justify flex" ref={paraRef}>{prop.content.split("-")[0]}</p>
                    <ul className="text-left" ref={listRef}>
                        {prop.content.split("-").slice(1).map((split, index) =>(
                            <li key = {prop.id +"."+index} className="italic">{split}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>  
    )
}

export default Entry;