import React, { useState } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../firebase';

function InicioSesion({ onLoginSuccess }) {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const togglePassword = () => setMostrarPassword((prev) => !prev);

  const handleRutChange = (e) => {
    setRut(e.target.value); // sin validaciones ni formato
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const usuariosRef = ref(db, 'usuarios');
      const snapshot = await get(usuariosRef);
      const data = snapshot.val();

      if (data) {
        // Buscar usuario con rut exacto (sin puntos ni guiones)
        const usuario = Object.values(data).find((u) => u.rut === rut);

        if (usuario) {
          if (usuario.clave === password) {
            onLoginSuccess(usuario);
          } else {
            alert('Contraseña incorrecta');
          }
        } else {
          alert('Usuario no encontrado');
        }
      } else {
        alert('No hay usuarios registrados en la base de datos');
      }
    } catch (error) {
      console.error('Error al verificar usuario:', error);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 space-y-6">
      <h2 className="text-3xl font-bold text-center text-blue-900">Iniciar Sesión</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">RUT</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <i className="fas fa-id-card" />
            </span>
            <input
              type="text"
              value={rut}
              onChange={handleRutChange}
              placeholder="Ej: 152222222"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <i className="fas fa-lock" />
            </span>
            <input
              type={mostrarPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-700 hover:text-blue-900 focus:outline-none"
            >
              {mostrarPassword ? (
                <i className="fas fa-eye" />
              ) : (
                <i className="fas fa-eye-slash" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Entrar
        </button>
      </form>

      <div className="text-center text-sm text-gray-500">
        ¿Olvidaste tu contraseña?{' '}
        <button
          type="button"
          onClick={() => alert('Funcionalidad de recuperación')}
          className="text-blue-700 hover:underline bg-transparent border-0 p-0 cursor-pointer"
        >
          Recupérala aquí
        </button>
      </div>
    </div>
  );
}

export default InicioSesion;
