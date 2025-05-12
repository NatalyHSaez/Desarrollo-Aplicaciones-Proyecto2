import { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [isHomeClicked, setIsHomeClicked] = useState(false);

  const handleHomeClick = () => {
    setIsHomeClicked(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {!isHomeClicked ? (
        <button
          onClick={handleHomeClick}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Inicio
        </button>
      ) : (
        <div className="space-y-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Registro
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Iniciar Sesión
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
