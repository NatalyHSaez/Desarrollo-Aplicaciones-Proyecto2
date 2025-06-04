import React, { useState } from 'react';
import InicioSesion from './components/InicioSesion';
import Acceso from './components/Acceso';

function App() {
  const [contenido, setContenido] = useState('inicio');

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/6 bg-blue-900 text-white flex flex-col">
        <div className="h-16 bg-blue-900 flex items-center pl-2">
          {/* Logo ajustado */}
          <img src="/LogoAccessPro.png" alt="Logo" className="w-10 h-10 object-contain" />
        </div>
        <nav className="flex-1 mt-4 space-y-2 px-4">
          <button
            onClick={() => setContenido('inicio')}
            className="w-full text-left py-2 px-3 rounded hover:bg-blue-700"
          >
            INICIO
          </button>
          <button
            onClick={() => setContenido('acceso')}
            className="w-full text-left py-2 px-3 rounded hover:bg-blue-700"
          >
            ACCESO
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 bg-blue-900 text-white flex items-center justify-center px-4">
          <h1 className="text-4xl font-bold text-white">AccessPro</h1>
        </div>

        {/* Contenido debajo del header */}
        <div className="p-8 flex-1 flex items-center justify-center bg-gray-100">
          {contenido === 'inicio' && <InicioSesion />}
          {contenido === 'acceso' && <Acceso />}
        </div>
      </div>
    </div>
  );
}

export default App;
