import React from "react";

const SideBarEntry = (prop) => {
    const el = document.getElementById(prop.id)
    const scroll = () => {
        el.scrollIntoView({ behavior:"smooth" , block:"center"})
    }
    

    return(
        <p  tabIndex="-1" onClick={() => {scroll()}} className=" cursor-pointer  before:content-['|'] m-0 focus:text-synth-500 hover:text-synth-500 text-zinc-800 dark:text-zinc-400">{prop.date} - {prop.day}</p>
    )
}

export default SideBarEntry