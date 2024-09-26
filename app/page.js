"use client";
import React, { useState } from 'react';

const Page = () => {
  const [title, setTitle] = useState("");   // State for task title
  const [desc, setDesc] = useState("");     // State for task description
  const [mainTask, setmainTask] = useState([]);  // State for the list of tasks

  // Submit handler to add a new task
  const submitHandler = (e) => {
    e.preventDefault();
    
    setmainTask([...mainTask, { title, desc, completed: false }]);  // Add new task with completed flag
    setTitle("");   // Clear title input
    setDesc("");    // Clear description input
  };

  // Handler to delete a task
  const deleteHandler = (i) => {
    const copyTask = [...mainTask];
    copyTask.splice(i, 1);   // Remove the task at index i
    setmainTask(copyTask);   // Update task state
  };

  // Handler to mark task as complete/incomplete
  const completeHandler = (i) => {
    const copyTask = [...mainTask];
    copyTask[i].completed = !copyTask[i].completed;   // Toggle task completion
    setmainTask(copyTask);   // Update task state
  };

  // Default message if no tasks are available
  let renderTask = <h2>No Task Available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => (
      <li key={i} className='flex items-center justify-between mb-8'>
        <div className={`flex items-center justify-between mb-5 w-2/3 ${t.completed ? 'line-through text-gray-400' : ''}`}>
          <h5 className='text-2xl font-semibold'>{t.title}</h5>
          <h6 className='text-lg font-medium'>{t.desc}</h6>
        </div>
        
        {/* Complete/Undo Button */}
        <button 
          onClick={() => completeHandler(i)}
          className={`px-4 py-3 text-2xl font-bold rounded m-5 ${t.completed ? 'bg-gray-400' : 'bg-green-600 text-white'}`}
        >
          {t.completed ? 'Undo' : 'Complete'}
        </button>
        
        {/* Delete Button */}
        <button 
          onClick={() => deleteHandler(i)}
          className='bg-red-900 text-white px-4 py-3 text-2xl font-bold rounded m-5'
        >
          Delete
        </button>
      </li>
    ));
  }

  return (
    <>
      <h1 className='bg-black text-white p-5 text-2xl font-bold text-center'>Harshita's Todo List</h1>
      
      {/* Input Form */}
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2 w-full'
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}  // Update title state
        />
        
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2 w-full"
          placeholder="Enter description here"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}   // Update description state
        />
        
        <button
          type="submit"
          className='bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5'
        >
          Add Task
        </button>
      </form>
      
      <hr />
      
      {/* Task List */}
      <div className="bg-slate-200 p-8">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default Page;
