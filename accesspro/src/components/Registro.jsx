import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiPhone, FiCalendar, FiUserCheck } from 'react-icons/fi';

const formatRUT = (rut) => {
  let clean = rut.replace(/[^0-9kK]/g, '').toUpperCase().slice(0, 9);
  if (clean.length <= 1) return clean;
  let body = clean.slice(0, -1);
  let dv = clean.slice(-1);
  let formatted = '';
  for (let i = body.length - 1, j = 1; i >= 0; i--, j++) {
    formatted = body[i] + formatted;
    if (j % 3 === 0 && i !== 0) {
      formatted = '.' + formatted;
    }
  }
  return `${formatted}-${dv}`;
};

const Registro = () => {
  const [rut, setRut] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [genero, setGenero] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('+56 9');
  const [cargo, setCargo] = useState('');
  const [servicio, setServicio] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  const handleRutChange = (e) => {
    const value = e.target.value;
    const cleaned = value.replace(/[^0-9kK]/gi, '').toUpperCase().slice(0, 9);
    setRut(cleaned);
  };

  const handleTelefonoChange = (e) => {
    const value = e.target.value;
    const fixedPrefix = '+56 9';
    let input = value.replace(/\D/g, '');
    if (input.startsWith('56')) input = input.slice(2);
    if (input.startsWith('9')) input = input.slice(1);
    input = input.slice(0, 8);
    setTelefono(`${fixedPrefix}${input}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Datos enviados');
  };

  return (
    <div className="max-w-4xl mx-auto mt-20">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Registro de Usuario</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* RUT */}
          <div>
            <label className="block text-gray-700 mb-1">RUT</label>
            <div className="flex items-center border rounded px-2">
              <FiUser className="text-gray-400 mr-2" />
              <input
                type="text"
                value={formatRUT(rut)}
                onChange={handleRutChange}
                placeholder="12.345.678-9"
                className="w-full p-2 outline-none"
              />
            </div>
          </div>

          {/* Género */}
          <div>
            <label className="block text-gray-700 mb-1">Género</label>
            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Seleccione</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          {/* Nombres */}
          <div>
            <label className="block text-gray-700 mb-1">Nombres</label>
            <div className="flex items-center border rounded px-2">
              <FiUserCheck className="text-gray-400 mr-2" />
              <input
                type="text"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                className="w-full p-2 outline-none"
              />
            </div>
          </div>

          {/* Apellido Materno */}
          <div>
            <label className="block text-gray-700 mb-1">Apellido Materno</label>
            <input
              type="text"
              value={apellidoMaterno}
              onChange={(e) => setApellidoMaterno(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Apellido Paterno */}
          <div>
            <label className="block text-gray-700 mb-1">Apellido Paterno</label>
            <input
              type="text"
              value={apellidoPaterno}
              onChange={(e) => setApellidoPaterno(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Fecha de Nacimiento */}
          <div>
            <label className="block text-gray-700 mb-1">Fecha de Nacimiento</label>
            <div className="flex items-center border rounded px-2">
              <FiCalendar className="text-gray-400 mr-2" />
              <input
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className="w-full p-2 outline-none"
              />
            </div>
          </div>

          {/* Cargo */}
          <div>
            <label className="block text-gray-700 mb-1">Cargo</label>
            <select
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Seleccione</option>
              <option value="Admin">Admin</option>
              <option value="Usuario">Usuario</option>
            </select>
          </div>

          {/* Servicio */}
          <div>
            <label className="block text-gray-700 mb-1">Servicio</label>
            <select
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Seleccione</option>
              <option value="TI">TI</option>
              <option value="RRHH">RRHH</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <div className="flex items-center border rounded px-2">
              <FiMail className="text-gray-400 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 outline-none"
              />
            </div>
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-gray-700 mb-1">Teléfono</label>
            <div className="flex items-center border rounded px-2">
              <FiPhone className="text-gray-400 mr-2" />
              <input
                type="text"
                value={telefono}
                onChange={handleTelefonoChange}
                className="w-full p-2 outline-none"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-gray-700 mb-1">Contraseña</label>
            <div className="flex items-center border rounded px-2">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 outline-none"
              />
            </div>
          </div>

          {/* Repetir Contraseña */}
          <div>
            <label className="block text-gray-700 mb-1">Repetir Contraseña</label>
            <input
              type="password"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Botón */}
          <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Guardar Datos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registro;
