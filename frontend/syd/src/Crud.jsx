//File to execute all crud operations

export const SEREVR_URL = "http://localhost:8080";

export async function createTask(task) {
        
        
        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task),
            credentials: "include"
        }
        try {
            const response = await fetch (
                SEREVR_URL + '/tasks',
                requestOptions
            )
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('Success:', result);
            
        } catch (error) {
            console.error('error create' + error);
        }
}
    
export async function readTasks(id) {
        try {
            const response = await fetch(
                SEREVR_URL + "/tasks/getTasks/" + id,
                { method: 'GET', redirect: "follow", credentials: 'include' }
            )
            const val = await response.json();
            console.log(val);
            return val;
            
            
        } catch (error) {
            console.error('error read: ' + error);
            window.location.href = SEREVR_URL;
        }

    
}

export async function updateTask(task_id,task,boole) {
    try {
        const tasks = await getTaskById(task_id);
        const newtask = tasks[0];
        await deleteTask(task_id,boole);
        const timeAdded = new Date(newtask.timeAdded);
        console.log('created time added' + timeAdded)
        task.timeAdded = timeAdded;
        console.log('updated task: ' + JSON.stringify(task));
        await createTask(task);
        
    } catch (error) {
        console.error('error update: ' + error);
    }
}

export async function deleteTask(taskId,delTaskData) {
    try {
        if(delTaskData) {
            await deleteTaskData(taskId);
            console.log('deleted task data')
        } else {
            console.log('didnt delete task data')
        }
    } catch(error) {
        console.error(error);
    }

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    }
    try {
        const response = await fetch (
            SEREVR_URL + "/tasks/deleteTask/" + taskId, requestOptions);

        const result = await response.json();
        
        return result;
        
    } catch (error) {
        console.error('error delete: ' + error);
    }
}

export async function getTaskById(id) {
    try {
        const response = await fetch(
            SEREVR_URL + "/tasks/getTaskById/" + id,
            {method:'GET', redirect: "follow", credentials: "include"}
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        } else {
            console.log('Response was ok.');
        };
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Get Task By id error:  ' + error);
    }
}

export async function updateGoal(date,task) {
    // only need to pass id and completion goal in to task object.
    //date should be a string of 'day','week','month' or 'year'.
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task),
        credentials: "include"
    }
    try {
        const response = await fetch(
            SEREVR_URL + "/users/" + date,
            requestOptions
        )
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('Success:', result);   
        
    } catch (error) {
        console.error('error' + error);
    }
    
}

export async function updateCompletion(task,completion) {
    try {
        await deleteTask(task.task_id);
        task.TaskCompletion = completion;
        console.log('updated Task' + task);
        await createTask(task);
    } catch (error) {
        console.error('Error updateCompletion ' + error)
    }
}

export async function getGoal(date,user_id) {
    
    try {
        const response = await fetch(
           SEREVR_URL + '/users'  + '/get' + date + 'Completion/' + user_id,
           { method: 'GET', redirect: "follow", credentials: 'include' }
        )
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('getGoal error: ' + error);
    }
}

export async function getUser(id) {
    const requestOption = {
        method: 'GET',
        redirect: "follow",
        credentials: 'include'
    }

    try {
        const response = await fetch(
            SEREVR_URL + '/users/getUser/' + id,
            requestOption
        )

        const result = await response.json();
        return result;

    } catch (error) {
        console.error('Error from getUser crud.jsx ' + error);
    }
}

export async function deleteUser(id) {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }

    }

    try {
        const response = await fetch (
            SEREVR_URL + '/users/deleteUser/' + id,
            requestOptions
        )
        const result = await response.json();
        return result
    } catch (error) {
        console.error('Error from deleteUser' + error);
    }
}

export async function saveUser(user) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(user),
        credentials: 'include'
    }

    try {
        const response = await fetch (
            SEREVR_URL + '/users/saveUser',
            requestOptions
        )
        const result = await response.json();
        return result;
    }   catch(error) {
        console.error('save error' + error)
    }
}

export async function updateUser(user,id) {
    await deleteUser(id);
    await saveUser(user);
}

export async function getAverageCompletion(date,id) {
    if (date == 'day') {

        const tasks = await readTasks(id);
        let totalComp = 0;
        let length = 0;
        tasks.map(task => {
            if(task.taskDate == task.timeAdded) {
                totalComp += task.taskCompletion;
                length += 1;
            }
        });
        return parseInt(totalComp / length);
    } else if (date == 'week') {

        const tasks = await readTasks(id);
        let totalComp = 0;
        let length = 0;

        tasks.map(task => {

            const timeSet = new Date(task.taskDate).getTime();
            const startTime = new Date(task.timeAdded).getTime();

            console.log('timeSet: ' + timeSet)
            console.log('time added: ' + startTime);

            const diffrence = Math.abs(timeSet - startTime);

            const day = 24 * 60 * 60 * 1000;
            const week = 7 * 24 * 60 * 60 * 1000;

            if(day <= diffrence && diffrence <= week) {
                totalComp += task.taskCompletion;
                length++;
            }

        });
        return parseInt(totalComp / length);
    } else if (date == 'month') {
        const tasks = await readTasks(id);
        let totalComp = 0;
        let length = 0;

        tasks.map(task => {
            
            const timeSet = new Date(task.taskDate).getTime();
            const startTime = new Date(task.timeAdded).getTime();

            console.log('timeSet: ' + timeSet)
            console.log('time added: ' + startTime);

            const diffrence = Math.abs(timeSet - startTime);

            const week = 7 * 24 * 60 * 60 * 1000;
            const month = 4 * 7 * 24 * 60 * 60 * 1000;

            if(week <= diffrence && diffrence <= month) {
                totalComp += task.taskCompletion;
                length += 1;
            }

        });
        return parseInt(totalComp / length);
    } else if (date == 'year') {
        const tasks = await readTasks(id);
        let totalComp = 0;
        let length = 0;

        tasks.map(task => {
            
            
            const timeSet = new Date(task.taskDate).getTime();
            const startTime = new Date(task.timeAdded).getTime();

            console.log('timeSet: ' + timeSet)
            console.log('time added: ' + startTime);

            const diffrence = Math.abs(timeSet - startTime);

            const month = 4 * 7 * 24 * 60 * 60 * 1000;
            const year =36 * 7 * 24 * 60 * 60 * 1000;

            if(month <= diffrence && diffrence <= year) {
                console.log('month: ' + month + 'difference: ' + diffrence + 'year: ' + year)
                totalComp += task.taskCompletion;
                length += 1;
            }

        });
        return parseInt(totalComp / length);
    } else {
        console.log('invalid Date: ' + date)
    }
}

export async function getTaskData(id) {
    try {
        const response = await fetch (
            SEREVR_URL + '/taskData/getTaskData/' + id,
            {method:'GET', credentials: 'include', redirect: 'follow'}
        )

        const result = await response.json();
        console.log('TaskData: ' + result);
        return result;
    } catch (error) {
        console.error('Error get task data: ' + error);
    }
}

export async function dayCompletion(id) {
    const taskData = await getTaskData(id);
    const tasks = await readTasks(id);
    let dayMapping = {
        0:0,
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
    }
    let dayMappingLength = {
        0:0,
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
    }

    let visitedIds = new Set();

    taskData.map(task => {
        
        dayMapping[new Date(task.timeAdded).getDay()] += task.compDiff;
        if( visitedIds.has(task.taskId)  ) {
            
        } else {
            dayMappingLength[new Date(task.timeAdded).getDay()] += 1;
            console.log('Id duplicate not found');
        }
        visitedIds.add(task.taskId);
    });
    for(let i = 0;i < 7;i++) {
        dayMapping[i] = dayMapping[i] / dayMappingLength[i] ;  
    }
    console.log('DayMapping: ' + JSON.stringify(dayMapping));
    return dayMapping;
}

export async function postTaskData(taskData) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(taskData),
        credentials: 'include'
    }

    try {
        const response = await fetch (
            SEREVR_URL + "/taskData/postTaskData",
            requestOptions
        )

        if (response.ok) {
            console.log('Response was good');
        } else {
            console.log('Response wasnt good!');
        }
        
        
    } catch (error) {
        console.error('Post error : ' + error);
    }
}

export async function deleteTaskData(id) {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }

    }

    try {
        const response = await fetch(
            SEREVR_URL + '/taskData/deleteTaskData/' + id,
            requestOptions
        )

        if(response.ok) {
            console.log('Delete task data was ok!')
        } else {
            console.log('Delete task data wasnt ok.')
        }
    } catch (error) {
        console.error('Delete taskData: ' + error);
    }

} 