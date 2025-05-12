import { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isHomeClicked, setIsHomeClicked] = useState(false);

  const handleHomeClick = () => {
    setIsHomeClicked(!isHomeClicked); // Cambiar el estado al hacer clic en "Inicio"
  };

  return (
    <div className="hidden md:block bg-gray-800 text-white w-64 p-4">
      <h2 className="text-2xl font-bold mb-6">AccessPro</h2>
      <nav className="flex flex-col gap-4">
        {/* Botón de inicio, que al hacer clic muestra u oculta las opciones */}
        <button
          onClick={handleHomeClick}
          className="text-left hover:text-blue-400"
        >
          Inicio
        </button>

        {/* Mostrar las opciones de Registro e Iniciar sesión si isHomeClicked es true */}
        {isHomeClicked && (
          <>
            <Link to="/register" className="hover:text-blue-400">
              Registro
            </Link>
            <Link to="/login" className="hover:text-blue-400">
              Iniciar sesión
            </Link>
          </>
        )}

        <Link to="/history" className="hover:text-blue-400">
          Historial
        </Link>
        <Link to="/settings" className="hover:text-blue-400">
          Configuración
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
