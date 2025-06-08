import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Perfil() {
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const usuario = {
    rut: '21.301.164-2',
    nombres: 'Nataly Mackarena ',
    apellidoPaterno: 'Huaiquinao',
    apellidoMaterno: 'Sáez',
    fechaNacimiento: '2003-05-21',
    edad: 22,
    genero: 'Femenino',
    email: 'nataly.huaiquinao@example.com',
    telefono: '+56 9 1234 5678',
    cargo: 'Administrador',
    servicio: 'Tecnología',
    fechaIngreso: '2020-03-01',
    tipoContrato: 'Indefinido',
    jornada: 'Completa',
    password: '21301164', // Simulado
  };

  const formatearFecha = (fecha) => {
    const [anio, mes, dia] = fecha.split('-');
    return `${dia}/${mes}/${anio}`;
  };

  return (
    <div className="w-full h-full p-6 bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-5xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Perfil del Usuario</h2>

        <div className="flex justify-center mb-6">
          <QRCodeCanvas value={usuario.rut} size={200} />
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
                {mostrarPassword ? usuario.password : '********'}
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
        
      {/* Botón editar */}
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
