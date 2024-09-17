import React  from "react";

// Notification Component
// Changes depending on what styling is passed through
function Notification (prop){
    return(
        <div>
            <p id = "form--notification" className={prop.type}>{prop.content}</p>
        </div>
    )
}

export default Notification;