import React from "react";

const ToiletTitle = (props) => {
    return (
        <div id= 'toilet-title'>
            <div id ="toilet-title-name">
                {props.title}
            </div>
            <div id='toilet-tag-name'>
                이용 가능
            </div>
        </div>
    )
}

export default ToiletTitle;