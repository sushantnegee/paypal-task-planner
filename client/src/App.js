import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/HomePage';
import TaskPlannerPage from './Pages/TaskPlannerPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<HomePage/>}/>
        <Route path={'/taskplanner'} element={<TaskPlannerPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
