import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/add-task" element={<AddTask />} />
        {/* Redireciona qualquer rota inválida para "/tasks" */}
        <Route path="*" element={<Navigate to="/tasks" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
