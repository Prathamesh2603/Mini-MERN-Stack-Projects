import { useState, useEffect } from 'react'

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the task data to the backend API
    const sendData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/todo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ task }),
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    sendData().then(() => {
      // Clear the input field after submission
      setTask(''); 
  
      // Fetch the updated list of tasks after adding a new task
      fetchData(); 
    });

  };

  const handleToggle = (taskId) => {
    // Send a PATCH request to the backend API to toggle the task completion status
    const toggleData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/todo/${taskId}`, {
          method: 'PATCH',
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    toggleData().then(() => {
      // Fetch the updated list of tasks after toggling a task
      fetchData(); 
    });
  };

  const handleDelete = (taskId) => {
    // Send a DELETE request to the backend API to delete the task
    const deleteData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/todo/${taskId}`, {
          method: 'DELETE',
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    deleteData().then(() => {
      // Fetch the updated list of tasks after deleting a task
      fetchData(); 
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/todo');
      const data = await response.json();
      setTasks(data);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className='w-full h-screen bg-gray-100 flex items-center justify-center'>
      <section className='w-100 bg-white p-6 rounded-lg shadow-md'>
        <h1 className='text-2xl text-center font-bold text-[#4f4f4f] mb-4'>Todo List</h1>
        <form 
          action="/api/todo" 
          method="post"
          onSubmit={handleSubmit}
          className='flex flex-col items-center'
        >
          
          <input 
            type="text" 
            name="task" 
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
            placeholder='Enter your task' 
            className='w-full p-2 border outline-none border-gray-300 rounded mb-4' 
          />
          <button 
            type="submit" 
            className='bg-[#4f4f4f] text-white py-2 px-4 rounded cursor-pointer'
          >
            Add Task
          </button>

        </form>

        <div className='mt-6'>
          <h2 className='text-xl font-semibold text-center text-[#4f4f4f] mb-2'>Tasks To be Completed</h2>
          <ul className='flex flex-col gap-2'>
            {tasks.map((task) => (
              <div className='flex items-center' key={task._id}>
                <input 
                  type="checkbox" 
                  name="task" 
                  value={task.task} 
                  checked={task.isCompleted}
                  onChange={() => handleToggle(task._id)}
                  className='mr-2' 
                />
                <li className={task.isCompleted ? 'line-through py-2 font-medium text-sm text-gray-500' : 'py-2 font-medium text-sm border-gray-300'}>
                  {task.task}
                </li>
                <button 
                  onClick={() => handleDelete(task._id)} 
                  className='ml-auto text-red-500 hover:text-red-700 bg-red-50 px-2 py-1 rounded cursor-pointer'
                >
                  Delete
                </button>
              </div>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default App