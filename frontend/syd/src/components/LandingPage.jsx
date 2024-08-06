import "../styles/LandingPage.css"
import { useState,useEffect } from "react";
import { useLocation } from 'react-router-dom';
import AddTask from "./AddTask";
import { readTasks, SEREVR_URL } from "../Crud";
import Tasks from "./Tasks";
import { getWeeks,getDays } from "./ArrangeDates";
import { useSelector, useDispatch } from "react-redux";
import { setTasksRedux,fetchTasks } from "../taskSlice";
import SideBar from "./SideBar";
import { filterByDay,filterByMonth,filterByWeek,filterByYear,convertNum } from "./ArrangeDates";
import AwesomeSlider from 'react-awesome-slider'


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function LandingPage() {
    const dispatch = useDispatch();
    const { value, status, error } = useSelector((state) => state.task);
    const query = useQuery();
    const id = query.get('id');
    const today = new Date();

    const [scoreLabel,setScoreLabel] = useState('Score today');

    const [dayGoal,setDayGoal] = useState(0);
    const [weekGoal,setWeekGoal] = useState(0);
    const [monthGoal,setMonthGoal] = useState(0);
    const [yearGoal,setYearGoal] = useState(0);

    const [showDay,setShowDay] = useState(true);
    const [showWeek,setShowWeek] = useState(false);
    const [showMonth,setShowMonth] = useState(false);
    const [showYear,setShowYear] = useState(false);

    
    
    useEffect(() => {
        dispatch(fetchTasks(id));
        if (!id) {
            window.location.href = SEREVR_URL  + "/login" 
        }

      }, [id, dispatch]);

      
      useEffect(() => {
        
        const dayTasks = filterByDay(value,today);
        const weekTasks = filterByWeek(value,today);
        const monthTasks = filterByMonth(value,today);
        const yearTasks = filterByYear(value,today);

        let dayTotal = 0;
        let weekTotal = 0;
        let monthTotal = 0;
        let yearTotal = 0;

        dayTasks.map(task => {
            dayTotal += task.taskCompletion;
            console.log('hi')
        })
        console.log('hey')
        weekTasks.map(task => {
            weekTotal += task.taskCompletion;
        })
        monthTasks.map(task => {
            monthTotal += task.taskCompletion;
        })
        yearTasks.map(task => {
            yearTotal += task.taskCompletion;
        })

        setDayGoal(dayTotal / dayTasks.length);
        setWeekGoal(weekTotal / weekTasks.length);
        setMonthGoal(monthTotal / monthTasks.length);
        setYearGoal(yearTotal / yearTasks.length);

        
    },[value]);

    useEffect(() => {
        console.log(monthGoal + 'month goal')
    },[monthGoal])

    const slideWindowForward = () => {
        if(showDay) {
            setShowDay(false);
            setShowWeek(true);
            setScoreLabel('Score this Week');
        } else if (showWeek) {
            setShowWeek(false);
            setShowMonth(true);
            setScoreLabel('Score this Month');
        } else if (showMonth) {
            setShowMonth(false);
            setShowYear(true);
            setScoreLabel('Score this Year');
        } else if (showYear) {
            setShowYear(false);
            setShowDay(true);
            setScoreLabel('Score today');
        }
    }

    const slideWindowBack = () => {
        if(showDay) {
            setShowDay(false);
            setShowYear(true);
            setScoreLabel('Score this Year');
        } else if (showWeek) {
            setShowWeek(false);
            setShowDay(true);
            setScoreLabel('Score today');
        } else if (showMonth) {
            setShowMonth(false);
            setShowWeek(true);
            setScoreLabel('Score this Week');
        } else if (showYear) {
            setShowYear(false);
            setShowMonth(true);
            setScoreLabel('Score this Month');
        }
    }
      
    

   
    return (
        <>
            <div className="container-LP">
                <div className="sidebar">
                    <SideBar />
                </div>
                <div className="bodyContainer-LP">
                    <div className="score">
                        <div className="score-header">
                            {(showMonth || showDay || showWeek || showYear) && scoreLabel}
                        </div>
                        <div className="display-score">
                            <div className="btn-score" onClick={slideWindowBack}>{'<'}</div>
                            <div className="score-number">
                                {showMonth && convertNum(monthGoal,1)}
                                {showYear && convertNum(yearGoal,1)}
                                {showDay && convertNum(dayGoal,1)}
                                {showWeek && convertNum(weekGoal,1)}
                            </div> 
                            <div className="btn-score" onClick={slideWindowForward}>{'>'}</div>
                        </div>
                    </div>
                    <div className="display-tasks">
                        <Tasks tasks={value} />
                    </div>
                </div>
            </div>
        </>
    )
}