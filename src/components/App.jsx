import "../styles/index.css";
import { useEffect, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineReload } from "react-icons/ai";
import { BiPlay } from "react-icons/bi";
import { BsPauseFill } from "react-icons/bs";
import breakAUdio from "../assets/break_time.wav";
import alarmAudio from "../assets/alarma.wav";

let timeTick = [];
let tickDegrees = 360 / 60;

for (let i = 1; i <= 60; i++) {

    timeTick.push(
        <div
            key={i}
            className={"tick " + (i % 6 === 0 ? "tick-thick" : "tick-thin")}
            style={{
                transformOrigin: "50% 50%",
                transform: `rotate(${tickDegrees}deg)`,
            }}>
            {i % 6 === 0 ? (
                <p style={{ transform: `rotate(-${tickDegrees}deg)`}}>
                    {i}
                </p>) : (<></>)}
        </div>
    );
    tickDegrees += 360 / 60;
    console.log(tickDegrees);
}

const App = () => {
    const [breakTime, setBreak] = useState(5);
    const [workTime, setWork] = useState(25);

    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(25 * 60);

    const [workBool, setWorkBool] = useState(false);
    const [breakBool, setBreakBool] = useState(false);

    const [startCount, setStart] = useState(false);
    const [startAnimation, setAnimation] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            if (seconds % 60 == 0 && startCount) {
                if (breakBool && minutes > 0)
                    setMinutes((current) => current - 1);
                if (minutes == 0 && seconds == 0 && breakBool) {
                    setBreakBool(false);
                    setWorkBool(true);
                    setStart(false);
                    setAnimation(true);
                    setMinutes(25);
                    setWork(25);
                    setBreak(5);
                    setSeconds(60 * 25);
                }

                if (workBool && minutes > 0)
                    setMinutes((current) => current - 1);
                if (minutes == 0 && seconds == 0 && workBool) {
                    setBreakBool(true);
                    setWorkBool(false);
                    setAnimation(true);
                    setMinutes(breakTime);
                    setSeconds(0);
                    setSeconds(60 * breakTime);
                }
            }

            if (seconds >= 1 && startCount) {
                setSeconds((current) => current - 1);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    });

    const addReduceTime = (add, value) => {
        if (startCount) {
            setStart(false);
            setSeconds(60 * workTime);
            setMinutes(25);
            setBreak(5);
            setWork(25);
        } else {
            if (add && workTime < 60 && value == "work") {
                setWork((current) => current + 1);
                setMinutes((current) => current + 1);
            } else if (!add && workTime > 1 && value == "work") {
                setWork((current) => current - 1);
                setMinutes((current) => current - 1);
            }

            setSeconds(60 * workTime);

            if (add && breakTime < 60 && value == "break") {
                setBreak((current) => current + 1);
            } else if (!add && breakTime > 1 && value == "break") {
                setBreak((current) => current - 1);
            }
        }
    };

    const startTimer = () => {
        setAnimation(false)
        setWorkBool(true);
        setStart(true);
    };

    return (
        <div className="container">
            <h1>25 + 5 Clock</h1>
            <div className="controls-container">
                <div className="set_time">
                    <h3>Break Length</h3>
                    <div>
                    <a
                        href="#"
                        className="upTime"
                        onClick={() => {
                            addReduceTime(true, "break");
                        }}>
                        <AiOutlineArrowUp size={20} color="white"/>
                    </a>
                    {breakTime}
                    <a
                        href="#"
                        className="downTime"
                        onClick={() => {
                            addReduceTime(false, "break");
                        }}>
                        <AiOutlineArrowDown size={20} color="white"/>
                    </a>
                    </div>
                </div>
                <div className="start_pause_container">
                <a  
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        startTimer();
                    }}>
                    <BiPlay size={40} />
                </a>
                <a 
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        setMinutes(25);
                        setSeconds(25 * 60);
                        setStart(false);
                        setBreak(5);
                        setWork(25);
                        setWorkBool(true);
                        setBreakBool(false);
                        setAnimation(false);
                    }}>
                    <AiOutlineReload
                    size={32}/>
                </a>
                <a  
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        setStart(false);
                    }}>
                    {" "}
                    <BsPauseFill size={35} />
                </a>
                </div>
                <div className="set_time">
                    <h3>Session length</h3>
                    <div>
                        <a
                            href="#"
                            className="upTime"
                            onClick={() => {
                                addReduceTime(true, "work");
                            }}>
                            <AiOutlineArrowUp size={20} color="white"/>
                        </a>
                        {workTime}
                        <a
                            href="#"
                            className="downTime"
                            onClick={() => {
                                addReduceTime(false, "work");
                            }}>
                            <AiOutlineArrowDown size={20} color="white"/>
                        </a>
                    </div>
                </div>
            </div>
            {/*This the clock that I'll build style={{ animation: !workBool && startCount ? "tilt-n-move-shaking 0.1s 50" : !breakBool && !workBool && startCount ? "tilt-n-move-shaking 0.1s 50" : "none"}}*/}
            <div className={"timer-container " +  (startAnimation && !workBool && startCount ? "timer-work" : !breakBool && !startCount && startAnimation ? "timer-break" : "none")} >
                <div
                    className="timer-button"
                    onClick={() => {
                        startTimer();
                    }}
                    style={{ bottom: startCount ? "91%" : "97%" }}>
                    <div className="button-head">
                        <div className="button_head_background"></div>
                        <div className="button_head_front"></div>
                    </div>
                    <div className="button-body"></div>
                </div>
                <div className="timer-outside">
                    <div className="timer-inside">
                        {timeTick.map((item) => item)}
                        <div className="timer-center"></div>
                        <div className="big-ring"></div>
                        <div className="small-ring"></div>
                        <div
                            className="minute-hand"
                            style={{
                                transform: `rotate(${(360 / 60) * minutes}deg)`,
                            }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="180"
                                viewBox="0 0 40 209"
                                fill="none">
                                <path
                                    xmlns="http://www.w3.org/2000/svg"
                                    d="M20.2621 -6.08032e-06L4.22779 27.4086L35.9815 27.5904L20.2621 -6.08032e-06ZM21.867 200.016L22.8704 24.7653L17.3705 24.7338L16.3671 199.984L21.867 200.016Z"
                                    fill="#0B0A0A"
                                />
                            </svg>
                        </div>
                        <div
                            className="second-hand"
                            style={{
                                transform: `rotate(${(360 / 60) * seconds}deg)`,
                            }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="7"
                                height="200"
                                viewBox="0 0 7 211"
                                fill="none">
                                <path
                                    d="M3.38333 211L0 105.5L3.38333 0H3.73333L7 105.5L3.73333 211H3.38333Z"
                                    fill="black"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            { startAnimation && !workBool && startCount ? (<audio src={breakAUdio}  
            autoPlay ></audio>) : !breakBool && !startCount && startAnimation ? (<audio src={alarmAudio} autoPlay ></audio>) : (<></>) }
            
        </div>
    );
};

export default App;
