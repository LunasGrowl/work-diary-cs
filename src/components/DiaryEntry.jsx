import { useEffect, useState } from "react";
import "./DiaryEntry.css";
import axios from "axios"
import { renderToString } from "react-dom/server";

const DiaryEntry = ({change, setChange}) => {

    const [entry,setEntry] = useState([])

    useEffect(()=>{
        loadEntries();
        setChange('0')
    
         
    },[change]);

    // Loads all entries from the database and creates them as components
    const loadEntries=async()=>{
        const result =await axios.get("http://localhost:8080/entry");
        setEntry(result.data)
        console.log(result.data);
    }

    // Deletes an entry from the database 
    const deleteEntry = async(id)=>{
        axios.delete("http://localhost:8080/entry/"+id);
        console.log(id);
        setChange('1');
    }

    const editEntry = async(id)=>{
        const content = document.getElementById(id).getElementsByTagName("p")[1];
        const list = document.getElementById(id).getElementsByTagName("ul")[0];
        const urlContent = renderToString(content.textContent);
        const urlList = renderToString(list.innerText.replaceAll(/^/gm,"-"));
        const update = urlContent + urlList
        axios.put("http://localhost:8080/entry/"+id+"?entry_content="+update);
    }

    return(
        <div className = "flex-col flex w-9/12" id = "content--container">
            {entry.toReversed().map((entry) =>(
                <div className = "group justify-between flex flex-row" id = "content--text">
                    <div className="content--block flex" id={entry.id} >
                        <div id = "id--child"className="content--title ">
                            <div className="flex flex-row items-center">
                                <h3 className="font-semibold  text-cyan-800 dark:text-cyan-400">{entry.entry_day}</h3>
                                <p className="content--date pl-11 text-zinc-700 dark:text-zinc-500">{entry.entry_date}</p>
                            </div>
                            <div className="flex-row  flex justify-end">
                                <span onClick = {() => editEntry(entry.id)} id ={entry.id} className="edit--icon material-symbols-outlined h-6 transition h-6 rounded-lg opacity-0  group-hover:opacity-100 hover:text-indigo-800 hover:bg-indigo-300 hover:dark:text-indigo-300 hover:dark:bg-indigo-800 cursor-pointer inline-block list-none mt-1 py-1 px-1" >save</span>
                                <span onClick = {() => deleteEntry(entry.id)} id ={entry.id} className="delete--icon material-symbols-outlined transition h-6 rounded-lg opacity-0  group-hover:opacity-100 hover:text-red-800 hover:bg-red-300 hover:dark:text-red-300 hover:dark:bg-red-800 cursor-pointer inline-block list-none mt-1 py-1 px-1" >delete</span>
                            </div>
                        </div>
                        <div className="content--entry max-w-max" contentEditable = "true" id="content--content">
                            <p className="break-words text-justify flex">{entry.entry_content.split("-")[0]}</p>
                            <ul className="text-left">
                                {entry.entry_content.split("-").slice(1).map(split =>(
                                    <li className="italic">{split}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>  
            ))}
        </div>
    )
}

export default DiaryEntry;