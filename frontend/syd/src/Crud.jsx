//File to execute all crud operations

export const SEREVR_URL = "http://localhost:8080";

export async function createTask(task) {
        
        
        console.log(task);
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

export async function updateTask(task_id,task) {
    try {
        await deleteTask(task_id);
        await createTask(task);
    } catch (error) {
        console.error('error update: ' + error);
    }
}

export async function deleteTask(taskId) {
    try {
        const response = await fetch (
            SEREVR_URL + "/tasks/deleteTask" + taskId, {
                method: 'DELETE'
            });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('error delete: ' + error);
    }
}

export async function updateGoal(date,task) {
    // only need to pass id and completion goal in to task object.
    //date should be a string of day,week,month or year.
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task),
        credentials: "include"
    }
    try {
        const response = fetch(
            SEREVR_URL + "/users" + date,
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