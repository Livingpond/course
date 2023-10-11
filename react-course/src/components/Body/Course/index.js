import Card from "../Card";
import "./index.css"

import {useState} from "react";

const list = ["最新","最热","活动"];

function Course(){
    const [focusIndex, setFoucusIndex] = useState(0);

    const handleClick = async (index) => {
        setFoucusIndex(index);
    };

    return(
        <div>
            <div className="header-tags">
                {list.map((item,index) => (
                    <div className={index === focusIndex ? "item item-focus" : "item"} 
                    onClick={() => handleClick(index)}>
                        {item}
                        </div>
                ))}
        </div>
        <Card></Card>
    </div>

    );

}

export default Course;