import React, { useState } from 'react';

function InicioSesion() {
  const [rut, setRut] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [errorRut, setErrorRut] = useState('');

  const togglePassword = () => setMostrarPassword((prev) => !prev);

  const limpiarRut = (rut) => rut.replace(/[^0-9kK]/g, '').toUpperCase();

  const formatearRut = (rut) => {
    const limpio = limpiarRut(rut);
    if (limpio.length < 2) return limpio;

    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1);

    let rutFormateado = '';
    let contador = 0;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      rutFormateado = cuerpo[i] + rutFormateado;
      contador++;
      if (contador % 3 === 0 && i !== 0) {
        rutFormateado = '.' + rutFormateado;
      }
    }

    return `${rutFormateado}-${dv}`;
  };

  const validarRut = (rut) => /^[0-9]{1,2}\.?[0-9]{3}\.?[0-9]{3}-[0-9kK]$/.test(rut);

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

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 space-y-6">
      <h2 className="text-3xl font-bold text-center text-blue-900">Iniciar Sesión</h2>
      <form className="space-y-5">
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
              placeholder="Ingresa tu contraseña"
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-700 hover:text-blue-900 focus:outline-none"
            >
              {mostrarPassword ? (
                <i className="fas fa-eye-slash" />
              ) : (
                <i className="fas fa-eye" />
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
