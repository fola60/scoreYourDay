import "../styles/LandingPage.css"
import { useState,useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { redirect } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function LandingPage() {
    const query = useQuery();

    const SEREVR_URL = "http://localhost:8080";

    const [id,setId] = useState("")

    const [tasks,setTasks] = useState([])

    const getTasks = async () => {
        try {
            const resposne = await fetch(
                SEREVR_URL + "/tasks/getTasks/" + id,
                { method: 'GET', redirect: "follow", credentials: 'include' }
            )
            const val = await resposne.json();
            if (!val || val.length === 0) {
                <redirect to={SEREVR_URL} />
            } else {
                console.log(val);
                setTasks([val]);
            }
        } catch (error) {
            console.error('error: ' + error)
        }

    }

    const postTasks = async (Task) => {
        requestOptions = {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Task)
        }
        try {
            const response = fetch (
                SEREVR_URL + '/tasks',
                requestOptions
            )
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('error' + error);
        }
    }
    

    useEffect(() => {
        setId(query.get('id'));
        getTasks();
    },[])

   
    return (
        <>
            <div className="container-LP">
                <div className="header-LP"></div>
                <div className="bodyContainer-LP">
                    <div className="sidebar-LP"></div>
                    <div className="body-LP"></div>
                </div>
            </div>
        </>
    )
}