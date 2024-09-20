import { useEffect, useState } from "react";
import axios from "axios";
import "./DiaryEntry.css";
import Entry from "./DiaryEntry/Entry";

const DiaryEntry = ({change, setChange}) => {
    
    // Creates a state for a list of entries
    const [entry,setEntry] = useState([])

    // Retrives all entries from database and saves into 'entry' state
    const loadEntries=async()=>{
        try {
            const result = await axios.get("https://localhost:7071/api/Entry");
            setEntry(result.data)
        }catch(error){
            console.log("Yo that api kinda offline. You god bro?")
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