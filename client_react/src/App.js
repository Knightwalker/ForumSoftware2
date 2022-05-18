import { BrowserRouter as Router } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import './App.css';

function App() {
  return (
    <div className="App">
        <Router>
            <MainLayout>
                
            </MainLayout>
        </Router>
    </div>
  );
}

export default App;
