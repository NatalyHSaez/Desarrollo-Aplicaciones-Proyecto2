import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, db } from '../firebase';

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const snapshot = await get(ref(db, `usuarios/${user.uid}`));
          if (snapshot.exists()) {
            setUsuario(snapshot.val());
          }
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      }
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  const formatearFecha = (fecha) => {
    if (!fecha) return '';
    const [anio, mes, dia] = fecha.split('-');
    return `${dia}/${mes}/${anio}`;
  };

  if (cargando) {
    return <p className="text-center text-gray-600 mt-10">Cargando perfil...</p>;
  }

  if (!usuario) {
    return <p className="text-center text-red-500 mt-10">No se encontraron datos del usuario.</p>;
  }

  return (
    <div className="w-full h-full p-6 bg-gray-100 flex items-center justify-center mt-20">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-5xl w-full mt-20">
        <h2 className="text-2xl font-bold text-center text-blue-800">Perfil del Usuario</h2>

        <div className="flex justify-center ">
          {usuario.qrCode ? (
            <img
              src={usuario.qrCode}
              alt="Código QR"
              className="w-60 h-60"
              style={{ imageRendering: 'pixelated' }}
            />
          ) : (
            <p className="text-gray-500">QR no disponible</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Campo label="RUT" valor={usuario.rut} />
          <Campo label="Nombres" valor={usuario.nombres} />
          <Campo label="Apellido Paterno" valor={usuario.apellidoPaterno} />
          <Campo label="Apellido Materno" valor={usuario.apellidoMaterno} />
          <Campo label="Fecha de Nacimiento" valor={formatearFecha(usuario.fechaNacimiento)} />
          <Campo label="Edad" valor={usuario.edad} />
          <Campo label="Género" valor={usuario.genero} />
          <Campo label="Correo Electrónico" valor={usuario.email} />
          <Campo label="Teléfono" valor={usuario.telefono} />
          <Campo label="Cargo" valor={usuario.cargo} />
          <Campo label="Servicio" valor={usuario.servicio} />
          <Campo label="Fecha de Ingreso" valor={formatearFecha(usuario.fechaIngreso)} />
          <Campo label="Tipo de Contrato" valor={usuario.tipoContrato} />
          <Campo label="Jornada" valor={usuario.jornada} />
          <div>
            <p className="text-sm text-gray-500">Contraseña</p>
            <div className="flex items-center gap-2">
              <p className="text-base font-medium text-gray-800">
                {mostrarPassword ? usuario.clave : '********'}
              </p>
              <button
                onClick={() => setMostrarPassword(!mostrarPassword)}
                className="text-blue-900 hover:text-blue-700 transition"
              >
                {mostrarPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}

function Campo({ label, valor }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-800">{valor}</p>
    </div>
  );
}

export default Perfil;

