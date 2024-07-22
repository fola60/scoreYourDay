import '../styles/Utilities.css'
import AddTask from './AddTask'
import SideBar from './SideBar'
import Tasks from './Tasks'
import { useSelector, useDispatch } from "react-redux";
import { setTasksRedux,fetchTasks } from "../taskSlice";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Utilities() {
    const dispatch = useDispatch();

    const { value, status, error } = useSelector((state) => state.task);

    const query = useQuery();
    const id = query.get('id');

    useEffect(() => {
        dispatch(fetchTasks(id));
      }, [dispatch]);

    return (
        <>
            <div className="container-ut">
                <SideBar/>
                <div className="bodyContainer-ut">
                    <AddTask tasks={value}/>
                </div>
            </div>
        </>
    )
}