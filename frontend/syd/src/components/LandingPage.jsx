import "../styles/LandingPage.css"
import { useState,useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { redirect } from "react-router-dom";
import AddTask from "./AddTask";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function LandingPage() {
    const query = useQuery();



    const [id,setId] = useState("")

    const [tasks,setTasks] = useState([])

   

   
    
    

    useEffect(() => {
        setId(query.get('id'));
    },[])

   
    return (
        <>
            <div className="container-LP">
                <div className="header-LP"></div>
                <div className="bodyContainer-LP">
                    <div className="sidebar-LP">
                        <AddTask />
                    </div>
                    <div className="body-LP"></div>
                </div>
            </div>
        </>
    )
}