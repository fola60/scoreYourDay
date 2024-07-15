
import '../styles/Tasks.css'
export default function Tasks({ tasks }) {
    


    return (
        <>
            <div className="task-container">
                {tasks.map(task => (
                    <div className="task" key={task.id}>
                        <div className="top">
                            <div className="name">{task.taskName}</div>
                            <div className="completion">{task.taskCompletion}</div>
                        </div>
                        <div className="bottom">
                            <div className="description">{task.taskDescription}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}