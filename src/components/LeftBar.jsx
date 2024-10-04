import React from "react";
import SideBarEntry from "./DiaryEntry/SideBarEntry";
import { useState,useEffect } from "react";
import axios from "axios";

const LeftBar = () => {
    const URL = import.meta.env.VITE_API;

    const [entry,setEntry] = useState([])
    
    useEffect(()=>{
        loadEntries();
    },[]);

    const loadEntries=async()=>{
        try {
            const result = await axios.get(`${URL}/`,{
                headers:{
                    'X-API' : 1
            }}
            );
            setEntry(result.data)
        }catch(error){
            console.log(error)
        }
    }


    /**
     * @Todo Create a Search Box
     */
    return( 
        <div id = "leftBar--container" className=" overflow-y-scroll [&::-webkit-scrollbar-thumb]:bg-synth-300 [&::-webkit-scrollbar-track]:bg-synth-700 [&::-webkit-scrollbar]:w-2 max-w-[20em] h-full bg-synth-900">
            <p className="m-0 p-5">Search BO</p>
            <div className="flex items-start flex-col pl-10 md:text-sm text-md/[calc(0.8em + 1vw)] ">
                {entry.toReversed().map((entry,index) =>(
                    <SideBarEntry
                        id = {entry.id}
                        day = {entry.entry_Day}
                        date = {entry.entry_Date}
                        content = {entry.entry_Content}
                    />
                    ))}
            </div>
        </div>
    )
}

export default LeftBar;