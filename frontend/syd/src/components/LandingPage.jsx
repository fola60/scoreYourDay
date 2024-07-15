import "../styles/LandingPage.css"
import { useState,useEffect } from "react";
import { useLocation } from 'react-router-dom';
import AddTask from "./AddTask";
import { readTasks } from "../Crud";
import Tasks from "./Tasks";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function LandingPage() {
    const query = useQuery();
    const id = query.get('id');

    const [tasks,setTasks] = useState([])
    const getTasks = async () => {
        const result = await readTasks(id);
        setTasks(result)
    }
    useEffect(() => {
        getTasks();
    },[id])
   

   
    return (
        <>
            <div className="container-LP">
                <h1 className="header-LP">ScoreYourDay</h1>
                <div className="bodyContainer-LP">
                    <div className="sidebar-LP">
                        <AddTask />
                    </div>
                    <div className="body-LP">
                        <div className="display-tasks">
                            <Tasks tasks={tasks}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}