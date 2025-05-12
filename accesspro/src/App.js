import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';  // Asegúrate de tener esta página creada
import Login from './pages/Login';        // Agrega esta importación
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} /> {/* Ruta para Login */}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
