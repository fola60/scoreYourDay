import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {createTask,readTasks} from '../Crud.jsx'
import DatePicker from 'react-datepicker'
import { useLocation } from 'react-router-dom';
import {v4 as uuid4} from 'uuid'
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { setTasksRedux,fetchTasks } from "../taskSlice";
import { TiPlus } from "react-icons/ti";
import { daysLeftInMonth,daysLeftInWeek,daysLeftInYear } from './ArrangeDates.jsx';

function useQuery() {

  return new URLSearchParams(useLocation().search);

}

export default function AddTask() {

  const query = useQuery();
  const dispatch = useDispatch();
  const id = query.get('id');

  const [taskName,setTaskName] = useState("");
  const [taskDate,setTaskDate] = useState("");
  const [taskDes,setTaskDes] = useState(""); //task description
  const [postObj,setPostObj] = useState({});
  const [valid,setValid] = useState(false);

  const [applyDay,setApplyDay] = useState(true);
  const [applyWeek,setApplyWeek] = useState(false);
  const [applyMonth,setApplyMonth] = useState(false);
  const [applyYear,setApplyYear] = useState(false);

  useEffect(() => {
    
    const newId = uuid4();
      setPostObj({
        "id": newId,
        "taskName": taskName,
        "taskDescription": taskDes,
        "taskDate": taskDate
      })
  },[taskDate,taskName,taskDes,id])

  
  const [show, setShow] = useState(false);


  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);


  const currentDate = new Date();

 
  const checkValid = () => {
    console.log('task name: ' + taskName);
    const taskname = taskName;
    if (taskname.length > 0) {
      setValid(true);
    } else {
      setValid(false);
    }
  }
  

  async function saveChanges() {
    if (valid) {
      let range = 0;
      if (applyDay) {
        range = 1;
      } else if (applyWeek) {
        range = daysLeftInWeek() + 1;
      } else if (applyMonth) {
        range = daysLeftInMonth();
      } else if(applyYear) {
        range = daysLeftInYear();
      }
      
      
      let currentDate = (taskDate == "") ? new Date() : new Date(taskDate)
      let tasksToCreate = [];
      let today = new Date();
      

      for(let i = 1;i < range + 1; i++) {
          const newId = uuid4();
          console.log('get date: ' + currentDate.getDate() + 'new id: ' + newId);
          let newTaskDate = new Date(currentDate);
          newTaskDate.setDate(currentDate.getDate() + i);

          let newDate = new Date(today); 
          newDate.setDate(newDate.getDate() + i - 1);
          let timeAdded = new Date(newDate);
          const objToPush = {
            "id": newId,
            "taskName": `${taskName} ${i}`,
            "taskDescription": taskDes,
            "taskDate": newTaskDate,
            "timeAdded": timeAdded,
          }
          tasksToCreate.push(objToPush);
      }

      for(let i = 0; i < tasksToCreate.length;i++) {
        console.log('task' + tasksToCreate[i]);
        await createTask(tasksToCreate[i]);
      }
      let result = await readTasks(id);
      dispatch(setTasksRedux(result));
      handleClose();
    } else {
      //some functionaltiy
      console.log('invalid');
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="groceries..."
                onChange={(e) => {setTaskName(e.target.value); checkValid();}}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Task Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder='Grab milk and ...' onChange={(e) => {setTaskDes(e.target.value); checkValid();}}/>
            </Form.Group>
          </Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Task End Date: </Form.Label>
            <DatePicker
              selected={taskDate}
              onChange={(date) => {setTaskDate(date); checkValid();}}
              placeholderText={currentDate}
              className='form-control'
              defaultValue={currentDate}
              utcOffset={0}
            />
          </Form.Group>
          <Form>
                <Form.Check
                    inline
                    type="radio"
                    label="Apply to today"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    onClick={() => {
                      setApplyDay(true);
                      setApplyWeek(false);
                      setApplyMonth(false);
                      setApplyYear(false);
                      
                    }}
                />
                <Form.Check
                    inline
                    type="radio"
                    label="Apply to whole Week"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    onClick={() => {
                      setApplyDay(false);
                      setApplyWeek(true);
                      setApplyMonth(false);
                      setApplyYear(false);
                      
                    }}
                />
                <Form.Check
                    inline
                    type="radio"
                    label="Apply to whole Month"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    onClick={() => {
                      setApplyDay(false);
                      setApplyWeek(false);
                      setApplyMonth(true);
                      setApplyYear(false);
                      
                    }}
                />
                <Form.Check
                    inline
                    type="radio"
                    label="Apply to whole Year"
                    name="inlineRadioOptions"
                    id="inlineRadio3"
                    onClick={() => {
                      setApplyDay(false);
                      setApplyWeek(false);
                      setApplyMonth(false);
                      setApplyYear(true);
                      
                    }}
                />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

