import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import {
  taskAdded,
  taskInProgress,
  taskResolved,
  taskRemoved,
  tasksCleared,
  tasksLoaded,
  tasksStored,
} from './store/tasksSlice';

import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

const App = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.entities.tasks);
  const [showForm, setShowForm] = useState(false);
  const [taskFormData, setTaskFormData] = useState({
    tagline: '',
    description: '',
  });

  const handleCreateNewTask = e => {
    e.preventDefault();
    if (!taskFormData.tagline || !taskFormData.description) return;
    dispatch(
      taskAdded({
        ...taskFormData,
      })
    );
    setTaskFormData({ tagline: '', description: '' });
    setShowForm(false);
  };

  useEffect(() => {
    const loadData = () => {
      dispatch(tasksLoaded());
    };
    loadData();
  }, [dispatch]);

  useEffect(() => {
    const storeData = () => {
      window.addEventListener('beforeunload', () => {
        dispatch(tasksStored());
      });
    };
    storeData();
  }, [dispatch]);

  return (
    <div className="App">
      <div className="bg-neutral-100">
        <div className="w-full min-h-screen p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-bold text-neutral-700 text-3xl">
              TASK TRACKER
            </h1>
            <button
              className="bg-red-400 text-white font-bold py-2 px-6 rounded flex items-center justify-center"
              onClick={() => dispatch(tasksCleared())}
            >
              <DeleteIcon /> Clear All
            </button>
          </div>

          <div className="w-full flex items-start justify-between">
            <div className="w-80">
              <div>
                <div className="rounded bg-neutral-800">
                  <div className="p-2">
                    <h2 className="font-semibold text-neutral-200 pb-1">
                      To Do
                    </h2>
                  </div>
                  {showForm && (
                    <form
                      className="w-full bg-white text-black p-2"
                      onSubmit={e => handleCreateNewTask(e)}
                    >
                      <div className="flex flex-col">
                        <label htmlFor="tagline">Tagline</label>
                        <input
                          id="tagline"
                          type="text"
                          className="bg-neutral-100 border-neutral-500 p-1 text-md rounded-sm outline-none border-none"
                          value={taskFormData.tagline}
                          onChange={e =>
                            setTaskFormData(state => ({
                              ...state,
                              tagline: e.target.value,
                            }))
                          }
                        />

                        <label htmlFor="description" className="mb-2">
                          Description
                        </label>
                        <textarea
                          id="description"
                          className="bg-neutral-100 border-neutral-500 p-1 h-24 text-md rounded-sm outline-none border-none resize-none"
                          value={taskFormData.description}
                          onChange={e =>
                            setTaskFormData(state => ({
                              ...state,
                              description: e.target.value,
                            }))
                          }
                        ></textarea>
                      </div>

                      <div className="flex items-center justify-between py-2 text-sm">
                        <button
                          type="submit"
                          className="bg-green-400 text-white py-1 px-4 rounded-md"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowForm(false)}
                        >
                          <ClearIcon />
                        </button>
                      </div>
                    </form>
                  )}
                  <div className="p-2 flex items-center text-neutral-100">
                    <button
                      id="toggleBtn"
                      className="font-semibold text-sm mr-5"
                      onClick={() => setShowForm(!showForm)}
                    >
                      <AddIcon />
                    </button>
                    <label className="text-sm" htmlFor="toggleBtn">
                      Add new task
                    </label>
                  </div>
                </div>

                <div className="flex flex-col space-y-5 mt-5">
                  {tasks.length > 0 &&
                    tasks.map(
                      task =>
                        task.resolved === 0 && (
                          <article
                            key={task.id}
                            className="bg-white p-2 rounded border-r-4 border-red-400"
                          >
                            <button
                              className="text-sm block ml-auto"
                              onClick={() => dispatch(taskRemoved(task.id))}
                            >
                              <ClearIcon />
                            </button>
                            <h3 className="text-lg font-bold">
                              {task.tagline}
                            </h3>
                            <p className="text-sm py-2">{task.description}</p>
                            <div className="flex items-center">
                              <button
                                className="bg-yellow-400 text-white text-sm py-1 px-3 rounded block ml-auto"
                                onClick={() =>
                                  dispatch(taskInProgress(task.id))
                                }
                              >
                                <DoneIcon />
                              </button>
                            </div>
                          </article>
                        )
                    )}
                </div>
              </div>
            </div>

            <div className="w-80">
              <div>
                <div className="p-2 rounded bg-neutral-800 text-neutral-100">
                  <h2 className="font-semibold">Doing</h2>
                </div>

                <div className="flex flex-col space-y-5 mt-5">
                  {tasks.length > 0 &&
                    tasks.map(
                      task =>
                        task.resolved === 1 && (
                          <article
                            key={task.id}
                            className="bg-white p-2 rounded border-r-4 border-yellow-400"
                          >
                            <button
                              className="text-sm block ml-auto"
                              onClick={() => dispatch(taskRemoved(task.id))}
                            >
                              <ClearIcon />
                            </button>
                            <h3 className="text-lg font-bold">
                              {task.tagline}
                            </h3>
                            <p className="text-sm py-2">{task.description}</p>
                            <div className="flex items-center">
                              <button
                                className="bg-green-400 text-white text-sm py-1 px-3 rounded block ml-auto"
                                onClick={() => dispatch(taskResolved(task.id))}
                              >
                                <DoneIcon />
                              </button>
                            </div>
                          </article>
                        )
                    )}
                </div>
              </div>
            </div>

            <div className="w-80">
              <div>
                <div className="p-2 rounded bg-neutral-800 text-neutral-100">
                  <h2 className="font-semibold">Done</h2>
                </div>
                <div className="flex flex-col space-y-5 mt-5">
                  {tasks.length > 0 &&
                    tasks.map(
                      task =>
                        task.resolved === 2 && (
                          <article
                            key={task.id}
                            className="bg-white p-2 rounded border-r-4 border-green-400"
                          >
                            <button
                              className="text-sm block ml-auto"
                              onClick={() => dispatch(taskRemoved(task.id))}
                            >
                              <ClearIcon />
                            </button>
                            <h3 className="text-lg font-bold">
                              {task.tagline}
                            </h3>
                            <p className="text-sm py-2">{task.description}</p>
                          </article>
                        )
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
