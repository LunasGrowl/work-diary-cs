import { useEffect, useState } from "react";
import axios from "axios";
    import "./DiaryEntry.css";
import Entry from "./DiaryEntry/Entry";

const DiaryEntry = ({change, setChange}) => {
    const URL = import.meta.env.VITE_API;
    // Creates a state for a list of entries
    const [entry,setEntry] = useState([])

    const [sort,setSort] = useState({version : "1" , type : "Date" })


    // Retrives all entries from database and saves into 'entry' state
    const loadEntries=async()=>{
        try {
            const result = await axios.get(`${URL}/`,{
                headers:{
                    'X-API' : sort.version
            }}
            );
            setEntry(result.data)
        }catch(error){
            console.log("Yo that api kinda offline. You good bro?")
        }
    }

    // Retrives entries from database on any change
    // Change state used to indicate if database has been altered
    useEffect(()=>{
        loadEntries();
        setChange('0')
    },[change]);

    // HTML of entry builder
    // Passes each entry as a prop and creates a entry object out of it
    return(
        <div className = "flex-col flex w-9/12" id = "content--container">
            <div className="flex justify-end h-7 items-center space-x-2">
                <div className="m-0 flex flex-col items-start">
                    <p className="text-cyan-800 dark:text-cyan-400 m-0">Sorted by</p>
                    <p className="text-zinc-500 italic m-0">{sort.type}</p>
                </div>
                
                <span onClick = {() => {sort.version !== "1"? setSort({version : "1" , type : "Date" }): setSort({version : "2" , type : "Edit" }); setChange("1")}}  className="material-symbols-outlined transition m-0 py-1 px-3.5 leading-5 text- font-medium cursor-pointer border-0 da rounded-lg bg-cyan-300 text-cyan-700 hover:bg-cyan-400 bg-opacity-85 dark:text-cyan-300 dark:bg-cyan-700 dark:bg-opacity-75 dark:hover:bg-cyan-700" >sort</span>
            </div>
            {entry.toReversed().map((entry,index) =>(
                <div key = {index}>
                <Entry 
                    id = {entry.id}
                    day = {entry.entry_Day}
                    date = {entry.entry_Date}
                    content = {entry.entry_Content}
                    setChange = {setChange}
                />
                </div>
            ))}
        </div>
    )
}

export default DiaryEntry;