<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Inertia\Inertia;

class TaskController extends Controller
{
    // Retrieve and return a JSON response of all tasks
    public function index()
    {
        $tasks = Task::orderBy('created_at', 'desc')->get();
        return response()->json(['tasks' => $tasks]);
    }

    // Store a new task, validate input, and return a rendered Inertia view
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
        ]);

        $task = Task::create([
            'name' => $request->input('name'),
        ]);

        // Render the 'Task' view with updated task data
        return Inertia::render('Task', [
            'tasks' => Task::orderBy('created_at', 'desc')->get(),
        ]);
    }

    // Delete a task and return a rendered Inertia view
    public function destroy(Task $task)
    {
        $task->delete();

        // Render the 'Task/Index' view with updated task data
        return Inertia::render('Task/Index', [
            'tasks' => Task::orderBy('created_at', 'desc')->get(),
        ]);
    }
}
