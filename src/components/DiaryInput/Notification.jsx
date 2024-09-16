import React, { useEffect } from "react";
import {useState} from "react";

function Notification (prop){
    return(
        <div>
            <p id = "form--notification" className={prop.type}>{prop.content}</p>
        </div>
    )
}

export default Notification;