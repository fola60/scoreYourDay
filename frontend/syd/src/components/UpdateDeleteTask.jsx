
import '../styles/UpdateDeleteTask.css'
import CloseButton from 'react-bootstrap/CloseButton';
import { deleteTask,readTasks, updateTask } from '../Crud';
import UpdateTask from './UpdateTask';
import { useSelector, useDispatch } from "react-redux";
import { setTasksRedux } from "../taskSlice";
import { useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { filterByDay,filterByWeek,filterByMonth,filterByYear } from './ArrangeDates';
import ModUpdateTask from './ModUpdateTask';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function UpdateDeleteTasks({ tasks,updatedelete }) {
    const query = useQuery();
    const id = query.get('id');
    const dispatch = useDispatch();
    const TASKS = tasks;
    const today = new Date();
    const [displayed,setDisplayed] = useState(() => filterByWeek(TASKS,today));
    const [upDel,setUpDel] = useState(updatedelete);

    

    const [completions, setCompletions] = useState(displayed.map(task => task.taskCompletion ?? 0));

    useEffect(() => {
        setCompletions(displayed.map(task => task.taskCompletion ?? 0));
    }, [TASKS,displayed]);

    const [version,setVersion] = useState('Due This week')
    
    const deleteTaskById = async (ids) => {
        await deleteTask(ids,true);
        const result = await readTasks(id);
        dispatch(setTasksRedux(result));
    }

    const sendCompletion = useCallback(
        debounce(async (task_id, task) => {
          try {
            await updateTask(task_id, task);
            console.log('Task updated successfully');
          } catch (error) {
            console.error('Error updating task:', error);
          }
        }, 500),
        []
      );
      

      useEffect(() => {
        setDisplayed(TASKS);

      },[TASKS])

    

    return (
        <>
            <div className="task-container">
                {updatedelete == 1 ? displayed.map((task,index) => (
                    <ModUpdateTask prevTaskDate={task.taskDate} prevTaskName={task.taskName} prevTaskDes={task.taskDescription} taskId={task.id}>
                        <div className="task-update" key={task.id}>
                            <div className="top">
                                <div className="name">{task.taskName}</div>
                                <div className="completion">
                                    <Form.Label>Completion: <div>{task.taskCompletion}</div></Form.Label>
                                </div>
                            </div>
                            <div className="bottom">
                                <div className="description">{task.taskDescription}</div>
                                <div className="date">Due: {task.taskDate}</div>
                            </div>
                        </div>
                    </ModUpdateTask>
                )) :
                displayed.map((task,index) => (
                        <div className="task-delete" key={task.id} onClick={() => deleteTaskById(task.id)}>
                            <div className="top">
                                <div className="name">{task.taskName}</div>
                                <div className="completion">
                                    <Form.Label>Completion: <div>{task.taskCompletion}</div></Form.Label>
                                </div>
                            </div>
                            <div className="bottom">
                                <div className="description">{task.taskDescription}</div>
                                <div className="date">Due: {task.taskDate}</div>
                            </div>
                        </div>
                )) 
                }
            </div>
        </>
    )
}