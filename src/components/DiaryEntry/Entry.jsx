import React from "react";
import { renderToString } from "react-dom/server";
import axios from "axios";
import { useRef } from "react";

const Entry = (prop) => {
    const paraRef = useRef();
    const listRef = useRef();
    function handleClick(){
        const content = paraRef.current.innerText 
        const list =  listRef.current.innerText.replaceAll(/^/gm,"-")
        try{
            if(listRef.current.innerHTML !=""){
                axios.put("https://localhost:7071/api/Entry/"+(prop.id)+"?entry_content="+content + list)
            }
            else{
                axios.put("https://localhost:7071/api/Entry/"+(prop.id)+"?entry_content="+contnet)
            }
        }catch{console.error();}
        notificationPopup(prop.id);
    }


    // Deletes an entry from the database 
    const deleteEntry = async(id)=>{
        axios.delete("https://localhost:7071/api/Entry/"+id);
        prop.setChange('1');
    }

    // Displays a notification on successfull edit
    function notificationPopup(id){
        const notification = document.getElementById(id).getElementsByTagName('label')[0];
        notification.classList.add('fade');
        setTimeout(() => {notification.classList.remove('fade');}, 2000);
    }

    return(
        <div key = {prop.id} className = "group justify-between flex flex-row" id = "content--text">
            <div className="content--block flex" id = {prop.id}  >
                <div id = "id--child"className="content--title ">
                    <div className="flex flex-row items-center ">
                        <h3 className="font-semibold  text-cyan-800 dark:text-cyan-400">{prop.day}</h3>
                        <p className="content--date pl-11 text-zinc-700 dark:text-zinc-500">{prop.date}</p>
                    </div>
                    <div className="flex-row  flex justify-end">
                        <label id="update--label" className="mt-1 py-1 px-2  bg-indigo-300 text-indigo-800 dark:text-indigo-300 dark:bg-indigo-800" >Entry Saved</label>
                        <span onClick = {() => handleClick()}  className="edit--icon material-symbols-outlined transition h-6 rounded-lg opacity-0  group-hover:opacity-100 hover:text-indigo-800 hover:bg-indigo-300 hover:dark:text-indigo-300 hover:dark:bg-indigo-800 cursor-pointer inline-block list-none mt-1 py-1 px-1" >save</span>
                        <span onClick = {() => deleteEntry(prop.id)} className="delete--icon material-symbols-outlined transition h-6 rounded-lg opacity-0  group-hover:opacity-100 hover:text-red-800 hover:bg-red-300 hover:dark:text-red-300 hover:dark:bg-red-800 cursor-pointer inline-block list-none mt-1 py-1 px-1" >delete</span>
                    </div>
                </div>
                <div suppressContentEditableWarning={true} className="content--entry max-w-max" spellCheck = "false" contentEditable = "true" id="content--content">
                    <p className="break-words text-justify flex"  ref={paraRef}>{prop.content.split("-")[0]}</p>
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