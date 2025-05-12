import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden bg-gray-800 text-white p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">AccessPro</h2>
      <button onClick={() => setOpen(!open)}>☰</button>
      {open && (
        <div className="absolute top-16 left-0 w-full bg-gray-700 p-4">
          <nav className="flex flex-col gap-2">
            <Link to="/" onClick={() => setOpen(false)}>Inicio</Link>
            <Link to="/register" onClick={() => setOpen(false)}>Registro</Link>
            <Link to="/history" onClick={() => setOpen(false)}>Historial</Link>
            <Link to="/settings" onClick={() => setOpen(false)}>Configuración</Link>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Navbar;
