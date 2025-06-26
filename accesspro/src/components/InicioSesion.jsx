import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, db } from '../firebase';

function InicioSesion({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Verificar datos usuario en la BD
      const snapshot = await get(ref(db, `usuarios/${user.uid}`));
      if (snapshot.exists()) {
        // Usuario válido y datos encontrados
        onLoginSuccess();
      } else {
        setError('No se encontraron datos del usuario en la base de datos.');
      }
    } catch (err) {
      console.error('Error al verificar usuario:', err);
      setError('Correo o contraseña incorrectos.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="email">Correo Electrónico</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3">
            <FaUser className="text-gray-400" />
            <input
              id="email"
              type="email"
              placeholder="usuario@ejemplo.com"
              className="flex-1 py-2 px-3 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1" htmlFor="password">Contraseña</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3">
            <FaLock className="text-gray-400" />
            <input
              id="password"
              type="password"
              placeholder="********"
              className="flex-1 py-2 px-3 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Ingresando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
}

export default InicioSesion;
