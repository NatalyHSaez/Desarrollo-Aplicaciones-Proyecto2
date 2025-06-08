import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

import InicioSesion from './components/InicioSesion';
import Acceso from './components/Acceso';
import Registro from './components/Registro';
import ControlGeneral from './components/ControlGeneral';
import ControlUsuario from './components/ControlUsuario';
import Historial from './components/Historial';
import Perfil from './components/Perfil';

function App() {
  const [autenticado, setAutenticado] = useState(false);
  const [mostrarSidebar, setMostrarSidebar] = useState(true);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    setAutenticado(false);
    navigate('/inicio');
  };

  const handleLoginSuccess = () => {
    setAutenticado(true);
    navigate('/perfil');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`bg-blue-900 text-white flex flex-col sticky top-0 h-screen z-20 transition-all duration-300 ${mostrarSidebar ? 'w-1/6' : 'w-16'}`}>
        <div className="h-16 bg-blue-900 flex items-center px-4">
          <button onClick={() => setMostrarSidebar(!mostrarSidebar)} className="text-white">
            <FaBars size={20} />
          </button>
        </div>

        {mostrarSidebar && (
          <nav className="flex-1 mt-4 space-y-2 px-4">
            {autenticado ? (
              <>
                <Link to="/perfil" className="block py-2 px-3 rounded hover:bg-blue-700">Perfil</Link>
                <Link to="/control-general" className="block py-2 px-3 rounded hover:bg-blue-700">Control General</Link>
                <Link to="/control-usuario" className="block py-2 px-3 rounded hover:bg-blue-700">Control Usuario</Link>
                <Link to="/historial" className="block py-2 px-3 rounded hover:bg-blue-700">Historial</Link>
                <Link to="/registro" className="block py-2 px-3 rounded hover:bg-blue-700">Registro</Link>
                <button onClick={cerrarSesion} className="w-full text-left py-2 px-3 rounded hover:bg-blue-700">Cerrar Sesión</button>
              </>
            ) : (
              <>
                <Link to="/inicio" className="block py-2 px-3 rounded hover:bg-blue-700">INICIO</Link>
                <Link to="/acceso" className="block py-2 px-3 rounded hover:bg-blue-700">ACCESO</Link>
              </>
            )}
          </nav>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="h-16 bg-blue-900 text-white flex items-center justify-center px-4">
          <h1 className="text-4xl font-bold text-white">AccessPro</h1>
        </div>

        <div className="p-8 flex-1 flex items-center justify-center bg-gray-100 overflow-auto">
          <Routes>
            <Route
              path="/inicio"
              element={
                autenticado
                  ? <Navigate to="/perfil" />
                  : <InicioSesion onLoginSuccess={handleLoginSuccess} />
              }
            />
            <Route path="/acceso" element={<Acceso />} />
            <Route path="/perfil" element={autenticado ? <Perfil /> : <Navigate to="/inicio" />} />
            <Route path="/control-general" element={autenticado ? <ControlGeneral /> : <Navigate to="/inicio" />} />
            <Route path="/control-usuario" element={autenticado ? <ControlUsuario /> : <Navigate to="/inicio" />} />
            <Route path="/historial" element={autenticado ? <Historial /> : <Navigate to="/inicio" />} />
            <Route path="/registro" element={autenticado ? <Registro /> : <Navigate to="/inicio" />} />
            <Route path="*" element={<Navigate to="/inicio" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
