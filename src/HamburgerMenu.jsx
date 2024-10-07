import React, { useEffect } from "react";
import { useState } from "react";
import SideBarEntry from "./components/DiaryEntry/SideBarEntry";
import axios from "axios";


const HamburgerMenu = () => {

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
     * @Todo Add in redux and share the state
     * @Todo Share the isOpen state to blur the screen
     */
    const [isOpen , setIsOpen] = useState(false);

    return(
        <div className={"fixed md:hidden flex items-start flex-col  " +(isOpen?"h-full bg-zinc-300 dark:bg-synth-900 w-[16em]":" w-full bg-zinc-300 dark:bg-synth-900 ") }>
            <div className="pl-10 pb-[0.5em] border-synth-700 w-[calc(100%-40px)] border-b-2 border-0 border-solid pt-[1em] h--icon md:hidden space-y-2 cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
                <span className="block h-0.5 w-8  bg-gray-600"></span>
                <span className="block h-0.5 w-8  bg-gray-600"></span>
                <span className="block h-0.5 w-8  bg-gray-600"></span>
            </div>
            {isOpen ? 
            <div className={"pl-10 flex flex-col items-start w-[16em] md:hidden pt-[1em] text/[calc(0.8em + 1vw)]"}>
                {entry.map((entry) => 
                    <SideBarEntry
                        id = {entry.id}
                        day = {entry.entry_Day}
                        date = {entry.entry_Date}
                        content = {entry.entry_Content}
                    />)}
            </div> : <p className="hidden"></p>}

        </div>
    );
} 

export default HamburgerMenu;