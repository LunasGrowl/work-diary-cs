import React from "react";
import { useState } from "react";
import SideBarEntry from "./components/DiaryEntry/SideBarEntry";

const HamburgerMenu = () => {

    /**
     * @Todo Add in redux and share the state
     */
    const [isOpen , setIsOpen] = useState(false);

    return(
        <div className="flex flex-row items-center bg-synth-900 w-[14em]">
            <div className="h--icon md:hidden space-y-2 cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            </div>
            <div className="md:hidden">
                {isOpen ? <SideBarEntry/>:<p className="hidden">Content</p>}
            </div>
        </div>
    );
} 

export default HamburgerMenu;