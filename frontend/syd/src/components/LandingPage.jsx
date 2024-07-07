import "../styles/LandingPage.css"
import { useState,useEffect } from "react";
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function LandingPage() {
    const query = useQuery();

    const SEREVR_URL = "http://localhost:5000";

    const [id,setId] = useState("")

    const [tasks,setTasks] = useState({})

    const getTasks = async () => {
        const resposne = await fetch(
            SEREVR_URL + "/tasks/getTasks/" + id
        )
        const val = await resposne.json();
        if (!val || val.length === 0) {
            document.body = SEREVR_URL;
        } else {
            setTasks(val);
        }

    }
    function redirectServer(url) {
        document.body = url;
    }

    useEffect(() => {
        setId(query.get('id'));
        getTasks();
    },[])

   
    return (
        <>
            <div className="container-LP">
                <button onClick={getTasks}>Get Task</button>
                <button onClick={redirectServer(SEREVR_URL)}>Redirect</button>
                {tasks.map(task => (
                    <div>{task.className}</div>
                ))}
            </div>
        </>
    )
}