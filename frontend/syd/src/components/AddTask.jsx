import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {createTask} from '../Crud.jsx'
import DatePicker from 'react-datepicker'
import { useLocation } from 'react-router-dom';
import {v4 as uuid4} from 'uuid'
import 'react-datepicker/dist/react-datepicker.css';


function useQuery() {

  return new URLSearchParams(useLocation().search);

}

export default function AddTask() {
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


  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);


  const currentDate = new Date();

  const [postObj,setPostObj] = useState({});

  

  async function saveChanges() {
    const newId = uuid4();
    setPostObj({
      "id": newId,
      "taskName": taskName,
      "taskDescription": taskDes,
      "taskDate": taskDate,
    })
    await createTask(postObj);
    handleClose();
    
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
                onChange={(e) => setTaskName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Task Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder='Task Description' onChange={(e) => setTaskDes(e.target.value)}/>
            </Form.Group>
          </Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Task Date:  </Form.Label>
            <DatePicker
              selected={taskDate}
              onChange={(date) => setTaskDate(date)}
              placeholderText='Set the end date for your task.'
              className='form-control'
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

