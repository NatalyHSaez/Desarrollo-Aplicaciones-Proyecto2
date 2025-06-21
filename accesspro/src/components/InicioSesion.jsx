import React, { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';

function InicioSesion({ onLoginSuccess }) {
  const [rut, setRut] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [errorRut, setErrorRut] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);

  const togglePassword = () => setMostrarPassword((prev) => !prev);

  const limpiarRut = (rut) => {
    const limpio = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    return limpio.slice(0, 9);
  };

  const formatearRut = (rut) => {
    const rutLimpio = rut.replace(/\./g, '').replace('-', '');
    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1).toUpperCase();

    let rutFormateado = '';
    let contador = 0;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      rutFormateado = cuerpo.charAt(i) + rutFormateado;
      contador++;
      if (contador % 3 === 0 && i !== 0) {
        rutFormateado = '.' + rutFormateado;
      }
    }

    return `${rutFormateado}-${dv}`;
  };

  const validarRut = (rut) =>
    /^[0-9]{1,2}\.?[0-9]{3}\.?[0-9]{3}-[0-9kK]$/.test(rut);

  const handleRutChange = (e) => {
    const input = e.target.value;
    const limpio = limpiarRut(input);
    const formateado = formatearRut(limpio);
    setRut(formateado);

    if (formateado === '' || validarRut(formateado)) {
      setErrorRut('');
    } else {
      setErrorRut('RUT inválido');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarRut(rut)) {
      setErrorRut('RUT inválido');
      return;
    }

    setCargando(true);

    try {
      const functions = getFunctions();
      const verificarUsuario = httpsCallable(functions, 'verificarUsuario');

      const { data } = await verificarUsuario({
        rut,
        clave: password,
      });

      if (data?.success) {
        onLoginSuccess(data);
      } else {
        alert('Credenciales incorrectas.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert(error?.message || 'Error de autenticación');
    } finally {
      setCargando(false);
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
              placeholder="Ej: 12.345.678-9"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errorRut && (
            <p className="text-red-500 text-sm mt-1">{errorRut}</p>
          )}
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
          disabled={cargando}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          {cargando ? 'Validando...' : 'Entrar'}
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
