import "../styles/LandingPage.css"
import { useState,useEffect } from "react";
import { useLocation } from 'react-router-dom';
import AddTask from "./AddTask";
import { readTasks } from "../Crud";
import Tasks from "./Tasks";
import { getWeeks } from "./ArrangeDates";
import { useSelector, useDispatch } from "react-redux";
import { setTasksRedux,fetchTasks } from "../taskSlice";
import SideBar from "./SideBar";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function LandingPage() {
    const dispatch = useDispatch()
    
    const { value, status, error } = useSelector((state) => state.task);


    const query = useQuery();
    const id = query.get('id');

    
    const [taskWeek,setTaskWeek] = useState([])
    
    useEffect(() => {
        dispatch(fetchTasks(id));
      }, [id, dispatch]);

   
    

   
    return (
        <>
            <div className="container-LP">
                <div className="sidebar">
                    <SideBar />
                </div>
                <div className="bodyContainer-LP">
                    <div className="sidebar-LP">
                        <AddTask />
                    </div>
                    <div className="body-LP">
                        <div className="display-tasks">
                            <Tasks tasks={value}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}