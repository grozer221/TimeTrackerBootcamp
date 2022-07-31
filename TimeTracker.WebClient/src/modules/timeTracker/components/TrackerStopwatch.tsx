import React from "react";

const Stopwatch = () => {
    const [time, setTime] = React.useState(1000000);
    const [timerOn, setTimerOn] = React.useState(false);

    React.useEffect(() => {
        let interval : any = null;

        if (timerOn) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!timerOn) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerOn]);

    return (
        <div className="Timers">
            <div style={{fontSize: '72px'}}>
                <span>{("0" + Math.floor((time / (60 * 60 * 1000)) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / (60 * 1000)) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </div>

            <div id="buttons">
                <button onClick={() => setTimerOn(true)}>Start</button>
                {timerOn && <button onClick={() => setTimerOn(false)}>Stop</button>}
                {!timerOn && time > 0 && (
                    <button onClick={() => setTime(0)}>Reset</button>
                )}
            </div>
        </div>
    );
};

export default Stopwatch;