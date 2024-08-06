import '../styles/Utilities.css'
import AddTask from './AddTask'
import SideBar from './SideBar'
import Tasks from './Tasks'
import { useSelector, useDispatch } from "react-redux";
import { setTasksRedux,fetchTasks } from "../taskSlice";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { filterByDay,filterByMonth,filterByWeek,filterByYear } from './ArrangeDates';
import UpdateDeleteTasks from './UpdateDeleteTask';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { updateGoal,getGoal, getUser, updateUser } from '../Crud';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Utilities() {
    const dispatch = useDispatch();
    const today = new Date();

    const [show, setShow] = useState(false);
    const { value, status, error } = useSelector((state) => state.task);
    const [user,setUser] = useState({
        "dayCompletion": 40,
        "weekCompletion": 40,
        "yearCompletion": 40,
        "monthCompletion": 40,
    });
    const [numTaskToday,setNumTaskToday] = useState(() => filterByDay(value,today).length);
    const [numTaskWeek,setNumTaskWeek] = useState(() => filterByWeek(value,today).length);
    const [numTaskMonth,setNumTaskMonth] = useState(() => filterByMonth(value,today).length);
    const [numTaskYear,setNumTaskYear] = useState(() => filterByYear(value,today).length);
    const [upDel,setUpDel] = useState(0);
    const [modalDisplay,setModalDisplay] = useState(0);
    const [completion,setCompletion] = useState(0);
    const [dayCompletion,setDayCompletion] = useState(0);
    const [weekCompletion,setWeekCompletion] = useState(0);
    const [monthCompletion,setMonthCompletion] = useState(0);
    const [yearCompletion,setYearCompletion] = useState(0);

    const query = useQuery();
    const id = query.get('id');

    const handleClose = async () => {
        setShow(false);
        
    };

    const handleShow = () => setShow(true);

    const saveChanges = async (id) => {
        if(modalDisplay == 1) {
            const newUser = user;
            newUser.dayCompletion = completion;
            await updateUser(newUser,id);
        } else if (modalDisplay == 2) {
            const newUser = user;
            newUser.weekCompletion = completion;
            await updateUser(newUser,id)
        } else if (modalDisplay == 3) {
            const newUser = user;
            newUser.monthCompletion = completion;
            await updateUser(newUser,id);
        } else if (modalDisplay == 4) {
            const newUser = user;
            newUser.yearCompletion = completion;
            await updateUser(newUser,id);
        }
        await fetchValues();
        handleClose();
    }
    const getCompletion = async (date,id) => {
        const result = await getGoal(date,id);
        return result;
    }

    useEffect( () => {
        dispatch(fetchTasks(id));
        console.log('dispatched from utilities.');
        setNumTaskToday(filterByDay(value,today).length);
        setNumTaskWeek(filterByWeek(value,today).length);
        setNumTaskMonth(filterByMonth(value,today).length);
        setNumTaskYear(filterByYear(value,today).length);
        fetchValues();
      }, [dispatch]);

      const fetchValues = async () => {
        const new_user = await getUser(id);
        setUser(new_user);
        console.log("newUser: " + new_user );
        console.log("id: " + id)
        setDayCompletion(new_user.dayCompletion);
        setYearCompletion(new_user.yearCompletion);
        setMonthCompletion(new_user.monthCompletion);
        setWeekCompletion(new_user.weekCompletion);
        
        console.log(user);
      }

      

      

    return (
        <>
            <div className="container-ut">
                <SideBar/>
                <div className="bodyContainer-ut">
                    <div className="header-ut">
                        <AddTask />
                        <div className="num">
                            <div className="text">Tasks due for today :<div className="today">{numTaskToday}</div> </div>
                        </div>
                        <div className="num">
                            <div className="text">Tasks due this week :<div className="week">{numTaskWeek}</div> </div>
                        </div>
                        <div className="num">
                            <div className="text">Tasks due this month :<div className="month">{numTaskMonth}</div> </div>
                        </div>
                        <div className="num">
                            <div className="text">Tasks due this year : <div className="year">{numTaskYear}</div></div>
                        </div>
                    </div>
                    <div className="body-ut">
                        <div className="selection">
                            <button className='update-btn' onClick={() => setUpDel(1)}>Update</button>
                            <button className='delete-btn' onClick={() => setUpDel(0)}>Delete</button>
                        </div>
                        <UpdateDeleteTasks tasks={value} updatedelete={upDel}/>
                    </div>
                </div>
                <div className="targetCl-container">
                    <DropdownButton id="dropdown-basic-button" title={'Set Goal'}>
                        <Dropdown.Item  eventKey="1" onClick={() => {handleShow(); setModalDisplay(1)}}>Today</Dropdown.Item>
                        <Dropdown.Item  eventKey="2" onClick={() => {handleShow(); setModalDisplay(2)}}>This week</Dropdown.Item>
                        <Dropdown.Item  eventKey="3" onClick={() => {handleShow(); setModalDisplay(3)}}>This Month</Dropdown.Item>
                        <Dropdown.Item  eventKey="4" onClick={() => {handleShow(); setModalDisplay(4)}}>This Year</Dropdown.Item>
                    </DropdownButton>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Completion Goal</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            {modalDisplay == 0 && <Form.Label>goal</Form.Label>}
                            {modalDisplay == 1 && <Form.Label>Daily goal</Form.Label>}
                            {modalDisplay == 2 && <Form.Label>Weekly goal</Form.Label>}
                            {modalDisplay == 3 && <Form.Label>Monthly goal</Form.Label>}
                            {modalDisplay == 4 && <Form.Label>Yearly goal</Form.Label>}
                            <Form.Control
                                type="text"
                                placeholder="groceries..."
                                onChange={(e) => setCompletion(e.target.value)}
                                defaultValue={0}
                                autoFocus
                            />
                            </Form.Group>
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
                    <div className="header-cl"></div>
                    <div className="body-cl">
                        <div className="daily-goal goal">
                            Daily Goal: <div className="dg">{dayCompletion}</div>
                        </div>
                        <div className="weekly-goal goal">
                            Weekly Goal: <div className="wg">{weekCompletion}</div>
                        </div>
                        <div className="monthly-goal goal">
                            Monthly Goal: <div className="mg">{monthCompletion}</div>
                        </div>
                        <div className="yearly-goal goal">
                            Yearly Goal: <div className="yg">{yearCompletion}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}