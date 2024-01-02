import { BrowserRouter } from 'react-router-dom';
import './App.css';
import ProjectsMap from './components/projects-map';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ProjectsMap />
      </BrowserRouter>
    </div>
  );
}

export default App;
