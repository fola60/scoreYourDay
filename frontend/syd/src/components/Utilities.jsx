import '../styles/Utilities.css'
import AddTask from './AddTask'
import SideBar from './SideBar'
import Tasks from './Tasks'
import { useSelector, useDispatch } from "react-redux";
import { setTasksRedux,fetchTasks } from "../taskSlice";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { filterByDay,filterByMonth,filterByOverDue,filterByWeek,filterByYear } from './ArrangeDates';
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
    const [shrink,setShrink] = useState(window.innerWidth >= 700)
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
    const [overDue,setOverDue] = useState(() => filterByOverDue(value).length);


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
            if (completion > 100) {
                newUser.dayCompletion = 100;
            } else if (completion < 1) {
                newUser.dayCompletion = 1;
            } else {
                newUser.dayCompletion = completion;
            }
            
            await updateUser(newUser,id);
        } else if (modalDisplay == 2) {
            const newUser = user;
            if (completion > 100) {
                newUser.weekCompletion = 100;
            } else if (completion < 1) {
                newUser.weekCompletion = 1;
            } else {
                newUser.weekCompletion = completion;
            }
            
            await updateUser(newUser,id);
        } else if (modalDisplay == 3) {
            const newUser = user;
            if (completion > 100) {
                newUser.monthCompletion = 100;
            } else if (completion < 1) {
                newUser.monthCompletion = 1;
            } else {
                newUser.monthCompletion = completion;
            }
            
            await updateUser(newUser,id);
        } else if (modalDisplay == 4) {
            const newUser = user;
            if (completion > 100) {
                newUser.yearCompletion = 100;
            } else if (completion < 1) {
                newUser.yearCompletion = 1;
            } else {
                newUser.yearCompletion = completion;
            }
            
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
        setOverDue(filterByOverDue(value).length);
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
        
      }

      useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setShrink(true);
            } else {
                setShrink(false);
            }
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
      },[])

      useEffect(() => {
        if (shrink) {
            console.log('shrunk')
        } else {
            console.log('not shrunk')
        }
      },[shrink])

      

      

    return (
        <>
            <div className="container-ut">
                <SideBar/>
                <div className="bodyContainer-ut">
                    <div className="add-task-btn">
                        <AddTask />
                        <DropdownButton id="dropdown-basic-button" title={'Set Goal'}>
                            <Dropdown.Item  eventKey="1" onClick={() => {handleShow(); setModalDisplay(1)}}>Today</Dropdown.Item>
                            <Dropdown.Item  eventKey="2" onClick={() => {handleShow(); setModalDisplay(4)}}>This week</Dropdown.Item>
                            <Dropdown.Item  eventKey="3" onClick={() => {handleShow(); setModalDisplay(3)}}>This Month</Dropdown.Item>
                            <Dropdown.Item  eventKey="4" onClick={() => {handleShow(); setModalDisplay(2)}}>This Year</Dropdown.Item>
                        </DropdownButton>
                        
                    </div>  
                    
                    {(!shrink) ? (<div className="header-ut">
                        
                        <div className="num">
                            <div className="text">Due for today :<div className="today">{numTaskToday}</div> </div>
                        </div>
                        <div className="num">
                            <div className="text">Due this week :<div className="week">{numTaskWeek}</div> </div>
                        </div>
                        <div className="num">
                            <div className="text">Due this month :<div className="month">{numTaskMonth}</div> </div>
                        </div>
                        <div className="num">
                            <div className="text">Due this year : <div className="year">{numTaskYear}</div></div>
                        </div>
                        <div className="num">
                            <div className="text">OverDue : <div className="overdue">{overDue}</div></div>
                        </div>
                    </div>): (
                        <>
                            {true ? (
                                <>  
                                    <div className="hiddent-tasknum">
                                        <div className="text">Due for today :<div className="today">{numTaskToday}</div> </div>
                                        <div className="text">Due this week :<div className="week">{numTaskWeek}</div> </div>
                                        <div className="text">Due this month :<div className="month">{numTaskMonth}</div> </div>
                                        <div className="text">Due this year : <div className="year">{numTaskYear}</div></div>
                                        <div className="text">OverDue : <div className="overdue">{overDue}</div></div>
                                    </div>
                                      
                                </>
                            ) : (
                                null
                            )}
                            
                        </>
                    )}
                     
                    <div className="body-ut">
                        <div className="selection">
                            <button className='update-btn' onClick={() => setUpDel(1)}>Update</button>
                            <button className='delete-btn' onClick={() => setUpDel(0)}>Delete</button>
                        </div>
                        <div className="del-up-msg">
                            click on task to {upDel ? ('update') : ('delete')}...
                        </div>
                        <UpdateDeleteTasks tasks={value} updatedelete={upDel}/>
                    </div>
                </div>
                <div className="targetCl-container">
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Completion Goal</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form onSubmit={(e) => e.preventDefault()}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            {modalDisplay == 0 && <Form.Label>goal</Form.Label>}
                            {modalDisplay == 1 && <Form.Label>Daily goal</Form.Label>}
                            {modalDisplay == 2 && <Form.Label>Weekly goal</Form.Label>}
                            {modalDisplay == 3 && <Form.Label>Monthly goal</Form.Label>}
                            {modalDisplay == 4 && <Form.Label>Yearly goal</Form.Label>}
                            <Form.Control
                                type="number"
                                min={1}
                                max={100}
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
                </div>
            </div>
        </>
    )
}