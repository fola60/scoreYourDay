
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

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Tasks({ tasks }) {
    const query = useQuery();
    const id = query.get('id');

    const dispatch = useDispatch();
    const [completions, setCompletions] = useState(tasks.map(task => task.taskCompletion ?? 0));
    useEffect(() => {
        setCompletions(tasks.map(task => task.taskCompletion ?? 0));
    }, [tasks]);

    
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

      useEffect(() => {
        
        
      },[])

    return (
        <>
            <div className="task-container">
                {tasks.map((task,index) => (
                    <div className="task" key={task.id}>
                        <div className="top">
                            <div className="name">{task.taskName}</div>
                            <div className="description">{task.taskDescription}</div>
                        </div>
                        <div className="bottom">
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
                        </div>
                        <CloseButton onClick={() => {deleteTaskById(task.id)}}/>
                        <UpdateTask prevTaskDate={task.taskDate} prevTaskName={task.taskName} prevTaskDes={task.taskDescription} taskId={task.id}/>
                    </div>
                ))}
            </div>
        </>
    )
}