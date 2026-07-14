"use client";
import styles from "./sliderswitch.module.css";
import { useState } from "react";

export default function SliderSwitch() {
    const [switchOn, setSwitchOn] = useState(false);
    return (
        <div className={switchOn ? styles.sliderSwitchContainerA : styles.sliderSwitchContainerB}>
            <button onClick={()=>{setSwitchOn(!switchOn)}} className={switchOn ? styles.sliderSwitchOn : styles.sliderSwitchOff}>
                {switchOn ? "O" : "X"}
            </button>
        </div>
    );
}