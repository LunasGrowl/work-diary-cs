import React from "react";
import DiaryInput from "./components/DiaryInput";
import DiaryEntry from "./components/DiaryEntry";
import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";

const MainContent = () => {
    const [change,setChange] = useState('0');

    /**
     * @Todo Begin some module federation
     * @Todo Do some prefixing for tailwind
     */
    return(
        <main id = "element--container" className='max-w-3xl mx-auto  z-20 pt-10 xl:max-w-none '>
            <HamburgerMenu />
            <DiaryInput setChange = {setChange}/>
            <DiaryEntry change = {change} setChange = {setChange}/>
        </main>
    )
}

export default MainContent;