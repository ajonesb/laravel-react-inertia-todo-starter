import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Index(props) {
    // Initialize state to manage the task input
    const [taskName, setTaskName] = useState("");

    // Function to handle task submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        await Inertia.post("/tasks", { name: taskName }); // Send a POST request to create a task
        setTaskName(""); // Clear the task input after submission
    };

    // Function to handle task deletion
    const handleDelete = async (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            // Display a confirmation dialog before deleting
            await Inertia.delete(`/tasks/${taskId}`); // Send a DELETE request to remove the task
            setTasks((prevTasks) =>
                prevTasks.filter((task) => task.id !== taskId)
            ); // Update the UI to remove the deleted task
        }
    };

    return (
        <div className="form-container">
            <h1 className="task-heading">Tasks</h1>{" "}
            {/* Display the tasks heading */}
            <form onSubmit={handleSubmit} className="task-form-container">
                {/* Task input field */}
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Add a task"
                    className="task-input"
                />
                {/* Submit button */}
                <button type="submit" className="task-submit-btn">
                    + Add
                </button>
            </form>
            <ul className="task-wrapper">
                {/* Display the list of tasks */}
                {props.tasks ? (
                    props.tasks.map((task) => (
                        <li key={task.id} className="task-items">
                            <span className="task-item-name">
                                {task.completed ? (
                                    <del>{task.name}</del>
                                ) : (
                                    task.name
                                )}
                            </span>
                            {/* Delete button */}
                            <button
                                onClick={() => handleDelete(task.id)}
                                className="task-delete-btn"
                            >
                                X
                            </button>
                        </li>
                    ))
                ) : (
                    <li>No tasks available.</li> // Display a message if there are no tasks
                )}
            </ul>
        </div>
    );
}
