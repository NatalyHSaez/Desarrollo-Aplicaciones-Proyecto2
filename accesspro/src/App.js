import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { db } from './firebase';

import InicioSesion from './components/InicioSesion';
import Acceso from './components/Acceso';
import Registro from './components/Registro';
import ControlGeneral from './components/ControlGeneral';
import ControlUsuario from './components/ControlUsuario';
import Historial from './components/Historial';
import Perfil from './components/Perfil';

function App() {
  const [autenticado, setAutenticado] = useState(null); // null = pendiente
  const [cargo, setCargo] = useState(null); // cargo del usuario
  const [mostrarSidebar, setMostrarSidebar] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAutenticado(true);
        try {
          const snapshot = await get(ref(db, `usuarios/${user.uid}`));
          if (snapshot.exists()) {
            const data = snapshot.val();
            setCargo(data.cargo ? data.cargo.toLowerCase() : null); // Normalizar cargo a minúsculas
          } else {
            setCargo(null);
          }
        } catch (error) {
          console.error('Error al obtener cargo:', error);
          setCargo(null);
        }
      } else {
        setAutenticado(false);
        setCargo(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      setAutenticado(false);
      setCargo(null);
      navigate('/inicio');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleLoginSuccess = () => {
    setAutenticado(true);
    navigate('/perfil');
  };

  if (autenticado === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  // Componente para rutas privadas y permisos de cargo
  const RutaPrivada = ({ children, soloAdmin = false }) => {
    if (!autenticado) {
      return <Navigate to="/inicio" replace />;
    }
    if (soloAdmin && cargo !== 'admin') {
      return <Navigate to="/perfil" replace />;
    }
    return children;
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
          <nav className="flex-1 mt-4 space-y-2 px-2 text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg">
            {autenticado ? (
              <>
                <Link to="/perfil" className="block py-2 px-3 rounded hover:bg-blue-700 whitespace-normal">Perfil</Link>
                <Link to="/historial" className="block py-2 px-3 rounded hover:bg-blue-700 whitespace-normal">Historial</Link>

                {cargo === 'admin' && (
                  <>
                    <Link to="/control-general" className="block py-2 px-3 rounded hover:bg-blue-700 whitespace-normal">Control General</Link>
                    <Link to="/control-usuario" className="block py-2 px-3 rounded hover:bg-blue-700 whitespace-normal">Control Usuario</Link>
                    <Link to="/registro" className="block py-2 px-3 rounded hover:bg-blue-700 whitespace-normal">Registro</Link>
                  </>
                )}

                <button onClick={cerrarSesion} className="w-full text-left py-2 px-3 rounded hover:bg-blue-700 whitespace-normal">
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/inicio" className="block py-2 px-3 rounded hover:bg-blue-700 whitespace-normal">INICIO</Link>
                <Link to="/acceso" className="block py-2 px-3 rounded hover:bg-blue-700 whitespace-normal">ACCESO</Link>
              </>
            )}
          </nav>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="h-16 bg-blue-900 text-white flex items-center justify-center px-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">AccessPro</h1>
        </div>

        <div className="p-8 flex-1 flex items-center justify-center bg-gray-100 overflow-auto">
          <Routes>
            {!autenticado && (
              <>
                <Route path="/inicio" element={<InicioSesion onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/acceso" element={<Acceso />} />
                <Route path="*" element={<Navigate to="/inicio" replace />} />
              </>
            )}

            {autenticado && (
              <>
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/historial" element={<Historial />} />

                <Route
                  path="/control-general"
                  element={
                    <RutaPrivada soloAdmin={true}>
                      <ControlGeneral />
                    </RutaPrivada>
                  }
                />
                <Route
                  path="/control-usuario"
                  element={
                    <RutaPrivada soloAdmin={true}>
                      <ControlUsuario />
                    </RutaPrivada>
                  }
                />
                <Route
                  path="/registro"
                  element={
                    <RutaPrivada soloAdmin={true}>
                      <Registro />
                    </RutaPrivada>
                  }
                />

                {/* Redirecciones para rutas públicas */}
                <Route path="/inicio" element={<Navigate to="/perfil" replace />} />
                <Route path="/acceso" element={<Navigate to="/perfil" replace />} />
                <Route path="*" element={<Navigate to="/perfil" replace />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
