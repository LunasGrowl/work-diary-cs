import axios from "axios";
import React, { useEffect, useState } from "react";

const SingleEntry = (prop) =>{
    const id = 52;
    const URL = import.meta.env.VITE_API;
    const [entry,setEntry] = useState([])
    const loadEntries=async()=>{
        try {
            const result = await axios.get(`${URL}/${id}`,{
                headers:{
                    'X-API' : 1
            }}
            );
            setEntry(result.data)
        }catch(error){
            console.log("Yo that api kinda offline. You good bro?")
        }
    }
    useEffect(()=>{
        loadEntries()
    },[prop])

    return(
        <div className = "group justify-between flex flex-row">
            <div>
                <p className="font-normal  text-cyan-700 dark:text-cyan-400">{entry.id}</p>
                <p className=" font-normal  text-cyan-700 dark:text-cyan-400">{entry.entry_Day}</p>
                <p className=" bg-slate-100 text-lg border-0 font-medium text-zinc-700 dark:text-zinc-500 italic pl-8">{entry.entry_Date}</p>
            </div>
            <p className="break-words text-synth-300 text-justify flex">{entry.entry_Content}</p>
        </div> 
    )
}

export default SingleEntry;