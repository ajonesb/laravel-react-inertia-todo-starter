<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// This is a route definition for the root URL ("/").
// When a user visits the root URL, it returns an Inertia view named "Task."
// Inertia is a package used to build modern, single-page apps in Laravel.

Route::get('/', function () {
    return Inertia::render('Task');
});

/* This route definition uses the "Route::resource" method to define RESTful routes
for the "TaskController" class. It specifies that only the "index," "store," and "destroy" actions
should be available, which correspond to viewing tasks, creating tasks, and deleting tasks. 
*/ 
Route::resource('tasks', TaskController::class)->only(['index', 'store', 'destroy']);
