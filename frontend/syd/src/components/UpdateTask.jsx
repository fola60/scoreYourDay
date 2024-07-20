import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {readTasks, updateTask} from '../Crud.jsx'
import DatePicker from 'react-datepicker'
import { useLocation } from 'react-router-dom';
import {v4 as uuid4} from 'uuid'
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { setTasksRedux,fetchTasks } from "../taskSlice";

function useQuery() {

  return new URLSearchParams(useLocation().search);

}

export default function UpdateTask({ prevTaskName, prevTaskDate , prevTaskDes, taskId}) {
  const dispatch = useDispatch();
  const query = useQuery();
  const id = query.get('id');
  const [taskName,setTaskName] = useState("");
  const [taskDate,setTaskDate] = useState("");
  const [taskDes,setTaskDes] = useState(""); //task description

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


  const handleClose = async () => {
    setShow(false);
    
  };

  const handleShow = () => setShow(true);


  const [postObj,setPostObj] = useState({});

  

  async function saveChanges() {
    const newId = uuid4();
    setPostObj({
      "id": newId,
      "taskName": taskName,
      "taskDescription": taskDes,
      "taskDate": taskDate,
    })
    await updateTask(taskId,postObj);
    const result = await readTasks(id);
    dispatch(setTasksRedux(result));
    handleClose();

  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Update Task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="groceries..."
                onChange={(e) => setTaskName(e.target.value)}
                defaultValue={prevTaskName}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Task Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder='Grab milk and ...' onChange={(e) => setTaskDes(e.target.value)} defaultValue={prevTaskDes}/>
            </Form.Group>
          </Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Task End Date:  </Form.Label>
            <DatePicker
              selected={taskDate}
              onChange={(date) => setTaskDate(date)}
              placeholderText='9/25/2024'
              className='form-control'
              defaultValue={prevTaskDate}
            />
          </Form.Group>
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

