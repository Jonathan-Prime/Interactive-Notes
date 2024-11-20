import { resetBoard } from "@/features/private/boards/boardSlice";
import { resetUser } from "@/features/private/user/userSlice";
import { useAppDispatch } from "@/network/hooks";
import { useState, useEffect } from "react";


function CountdownTimer() {
    const dispatch = useAppDispatch();
    const [seconds, setSeconds] = useState(() => {
        const savedTime = localStorage.getItem("countdown_start");
        const currentTime = Date.now();
        const elapsedTime = savedTime ? currentTime - parseInt(savedTime) : 0;
        const remainingTime = 20 * 60 * 60 - Math.floor(elapsedTime / 1000);
        return remainingTime >= 0 ? remainingTime : 0;
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => {
                const updatedSeconds = prevSeconds - 1;
                return updatedSeconds;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        localStorage.setItem("countdown_start", Date.now().toString());
    }, []);

    useEffect(() => {
        if (seconds === 0) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('countdown_start');
            window.location.href = '/auth/login';
            dispatch(resetUser())
            dispatch(resetBoard())
        }
    }, [dispatch, seconds]);

    // Convert seconds to hours, minutes, and seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // const html = `Time remaining: ${hours}h ${minutes}m ${remainingSeconds}s`;

    // return <div dangerouslySetInnerHTML={{ __html: html }} />;
    return <span></span>
}

export default CountdownTimer;
