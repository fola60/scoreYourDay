import getAverageCompDate, { getAverageCompletion ,dayCompletion,SEREVR_URL, monthCompletion,getUser} from '../Crud';
import '../styles/Analytics.css'
import SideBar from './SideBar'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useSelector ,useDispatch} from "react-redux";
import { setTasksRedux,fetchTasks } from "../taskSlice";
import { filterByDay,filterByMonth,filterByWeek,filterByYear } from './ArrangeDates';
import {
    Chart as ChartJs,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJs.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

function useQuery() {

    return new URLSearchParams(useLocation().search);
  
  }
//timeAdded
export default function Analytics() {

    const query = useQuery();
    const id = query.get('id');
    const dispatch = useDispatch();
    const today = new Date();

    useEffect(() => {
        dispatch(fetchTasks(id));
        if (!id) {
            window.location.href = SEREVR_URL  + "/login" 
        }

      }, [id, dispatch]);

    const { value, status, error } = useSelector((state) => state.task);
    const [tasks,setTasks] = useState(0);

    const [avDay,setAvDay] = useState(0);
    const [avWeek,setAvWeek] = useState(0);
    const [avMonth,setAvMonth] = useState(0);
    const [avYear,setAvYear] = useState(0);

    const [avComp,setAvComp] = useState([]);

    const [dayGoal,setDayGoal] = useState(0);
    const [weekGoal,setWeekGoal] = useState(0);
    const [monthGoal,setMonthGoal] = useState(0);
    const [yearGoal,setYearGoal] = useState(0);

    const [maxDayGoal,setMaxDayGoal] = useState(100);
    const [maxWeekGoal,setMaxWeekGoal] = useState(100);
    const [maxMonthGoal,setMaxMonthGoal] = useState(100);
    const [maxYearGoal,setMaxYearGoal] = useState(100);

    const [dayMapping,setDayMapping] = useState({})
    

    const [data,setData] = useState({
        labels: ['Mon','Tue','Wed','Thurs','Fri','Sat','Sun'],
        datasets: [
            {
                label:'Average Task Completion By Day',
                data:[1,1,1,1,1,1,1],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                  ],
                  borderWidth: 1
            }
        ]
    });

    const [data2,setData2] = useState({
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
            {
                label:'Average Task Completion By Month',
                data:[1,1,1,1,1,1,1,1,1,1,1,1],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(255, 87, 51, 0.2)',   
                    'rgba(144, 238, 144, 0.2)',  
                    'rgba(238, 130, 238, 0.2)',  
                    'rgba(173, 216, 230, 0.2)',  
                    'rgba(255, 182, 193, 0.2)'   
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(255, 87, 51)',    
                    'rgb(144, 238, 144)',  
                    'rgb(238, 130, 238)',  
                    'rgb(173, 216, 230)',
                    'rgb(255, 182, 193)'
                ],
                  borderWidth: 1
            }
        ]
    });
    const options = {
        scales: {
            y: {
                min: 0,
                max:100,
                beginAtZero: true,
                ticks: {
                    stepSize: 10
                }
            }
        }
    }

    const fetchValues = async () => {
        const new_user = await getUser(id);
        console.log("newUser: " + new_user );
        console.log("id: " + id)
        setMaxDayGoal(new_user.dayCompletion);
        setMaxWeekGoal(new_user.yearCompletion);
        setMaxMonthGoal(new_user.monthCompletion);
        setMaxYearGoal(new_user.weekCompletion);
        
      }

    const getAverage = async () => {
        const average = await getAverageCompDate(id);
        console.log(average);
        setAvComp(average);
        
    }
    
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

        console.log('day total : ' + dayTotal);
        console.log('week total : ' + weekTotal);
        console.log('week total : ' + weekTotal);
        console.log('month total : ' + monthTotal);
        setTasks(value);

        getAverage(id);
        fetchValues();
        
    },[value])



    

    useEffect(() => {
        console.log('max day goal : ' + maxDayGoal);
    },[maxDayGoal])

    useEffect(() => {
        console.log('average: ' + avComp)
    },[avComp])



    const fetchAnalytics = async () => {
        const day = await getAverageCompletion('day',id);
        setAvDay(day);
        const week = await getAverageCompletion('week',id);
        setAvWeek(week);
        const month = await getAverageCompletion('month',id);
        setAvMonth(month);
        const year = await getAverageCompletion('year',id);
        setAvYear(year);

        let daymappings = await dayCompletion(id);
        let monthMappings = await monthCompletion(id);
        setData({
            labels: ['Mon','Tue','Wed','Thurs','Fri','Sat','Sun'],
            datasets: [
                {
                    label:'Average Task Completion By Day',
                    data:[daymappings[1],daymappings[2],daymappings[3],daymappings[4],daymappings[5],daymappings[6],daymappings[0]],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                      ],
                      borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                      ],
                      borderWidth: 1
                }
            ]
        });

        setData2({
            labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            datasets: [
                {
                    label:'Average Task Completion By Month',
                    data:[monthMappings[0],monthMappings[1],monthMappings[2],monthMappings[3],monthMappings[4],monthMappings[5],monthMappings[6],monthMappings[7],monthMappings[8],monthMappings[9],monthMappings[10],monthMappings[11],],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)',
                        'rgba(255, 87, 51, 0.2)',   
                        'rgba(144, 238, 144, 0.2)',  
                        'rgba(238, 130, 238, 0.2)',  
                        'rgba(173, 216, 230, 0.2)',  
                        'rgba(255, 182, 193, 0.2)'   
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)',
                        'rgb(255, 87, 51)',    
                        'rgb(144, 238, 144)',  
                        'rgb(238, 130, 238)',  
                        'rgb(173, 216, 230)',
                        'rgb(255, 182, 193)'
                    ],
                      borderWidth: 1
                }
            ]
        })

        
        console.log('DayMapping analytics : ' + daymappings[1] );
        setDayMapping(dayMapping)
    }


    useEffect(() => {
        fetchAnalytics();
        
    },[]);

    useEffect(() => {
        setData({
            labels: ['Mon','Tue','Wed','Thurs','Fri','Sat','Sun'],
            datasets: [
                {
                    label:'Task Completion Per Day',
                    data:[dayMapping[1],dayMapping[2],dayMapping[3],dayMapping[4],dayMapping[5],dayMapping[6],dayMapping[0]],
                    backgroundColor: 'aqua',
                    borderColor:'black',
                    borderWidth: 1,
                }
            ]
        });
        
    },[dayMapping])



    return (
        <>
            <div className="anly-container">
                <div className="sidebar-anly">
                    <SideBar  />
                </div>  
                <div className="anly-body">
                    <div className="anly-header">
                        <div className="anly-header-name">Analytics</div>
                        <div className="av-container">
                            <div className="first-two">
                            <div className="daily-av av">
                                <div className="daily-av-label dal">Average Day long task completion rate </div>
                                {(isNaN(avDay)) ?  '0' : (avDay)}%
                            </div>
                            <div className="weekly-av av">
                                <div className="weekly-av-label dal">Average Week long task completion rate</div> 
                                {(isNaN(avWeek)) ?  '0' : (avWeek)}%
                            </div>
                            </div>
                            <div className="second-two">
                                <div className="monthly-av av">
                                    <div className="monthly-av-label dal">Average Month long task completion rate</div>
                                    {(isNaN(avMonth)) ?  '0' : (avMonth)}%
                                </div>
                                <div className="yearly-av av">
                                    <div className="yearly-av-label dal">Average Year long task completion rate</div>
                                    {(isNaN(avYear)) ?  '0' : (avYear)}%
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="charts-row1">
                        <div className="bar-chart">
                            <Bar
                                data={data}
                                options={options}
                                
                            ></Bar>
                        </div>
                        <div className="bar-chart2">
                            <Bar
                                data={data2}
                                options={options}
                            ></Bar>
                        </div> 
                    </div>
                    <div className="charts-row2">
                        <div className="progress-bar">
                            Distance to Daily Goal <ProgressBar animated variant='success' now={dayGoal} min={0} max={maxDayGoal} style={{ width: `${maxDayGoal}%` }}/>
                            Distance to Weekly Goal <ProgressBar animated variant='info' now={weekGoal} min={0} max={maxWeekGoal} style={{ width: `${maxWeekGoal}%` }}/>
                            Distance to Monthly Goal <ProgressBar animated variant='warning' now={monthGoal} min={0} max={maxMonthGoal} style={{ width: `${maxMonthGoal}%` }}/>
                            Distance to Yearly Goal <ProgressBar animated variant='danger' now={yearGoal} min={0} max={maxYearGoal} style={{ width: `${maxYearGoal}%` }}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}