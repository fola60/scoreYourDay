
import '../styles/Tasks.css'
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

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Tasks({ tasks }) {
    const query = useQuery();
    const id = query.get('id');
    const dispatch = useDispatch();
    const TASKS = tasks;
    const today = new Date();
    const [displayed,setDisplayed] = useState(() => filterByWeek(TASKS,today));
    

    const [completions, setCompletions] = useState(displayed.map(task => task.taskCompletion ?? 0));

    useEffect(() => {
        setCompletions(displayed.map(task => task.taskCompletion ?? 0));
    }, [TASKS,displayed]);

    const [version,setVersion] = useState('Due This week')
    
    const deleteTaskById = async (ids) => {
        await deleteTask(ids);
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
      const displayDay = () => {
        setDisplayed(filterByDay(TASKS,today));
        setVersion('Due Today');
        console.log('swapped to day');
      }

      const displayWeek = () => {
        setDisplayed(filterByWeek(TASKS,today));
        setVersion('Due This week');
        console.log('swapped to week');
      }

      const displayMonth = () => {
        setDisplayed(filterByMonth(TASKS,today));
        setVersion('Due This month');
        console.log('swapped to month');
      }

      const displayYear = () => {
        setDisplayed(filterByYear(TASKS,today));
        setVersion('Due This year');
        console.log('swapped to year');
      }

      useEffect(() => {
        setDisplayed(TASKS);

      },[TASKS])

    

    return (
        <>
            <div className="task-container">
                <DropdownButton id="dropdown-basic-button" title={version}>
                    <Dropdown.Item href="#/action-1" eventKey="1" onClick={() => displayDay()}>Today</Dropdown.Item>
                    <Dropdown.Item href="#/action-2" eventKey="2" onClick={() => displayWeek()}>This week</Dropdown.Item>
                    <Dropdown.Item href="#/action-3" eventKey="3" onClick={() => displayMonth()}>This Month</Dropdown.Item>
                    <Dropdown.Item href="#/action-4" eventKey="1" onClick={() => displayYear()}>This Year</Dropdown.Item>
                </DropdownButton>
                {displayed.map((task,index) => (
                    <div className="task" key={task.id}>
                        <div className="top">
                            <div className="name">{task.taskName}</div>
                            <div className="completion">
                                <Form.Label>Completion</Form.Label>
                                <Form.Range 
                                min={0}
                                max={100}
                                step={10}
                                value={completions[index]}
                                onChange={(event) => {
                                    let cpy = [...completions];
                                    cpy[index] = event.target.value;
                                    setCompletions(cpy);
                                    
                                    const updatedTask = { ...task, taskCompletion: completions[index] };
                                    console.log('newTask: ' + JSON.stringify(updatedTask));
                                    sendCompletion(task.id,updatedTask);
                                    console.log(completions[index])}}
                                />
                            </div>
                            <CloseButton onClick={() => {deleteTaskById(task.id)}}/>
                            <UpdateTask prevTaskDate={task.taskDate} prevTaskName={task.taskName} prevTaskDes={task.taskDescription} taskId={task.id} />
                        </div>
                        <div className="bottom">
                            <div className="description">{task.taskDescription}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}