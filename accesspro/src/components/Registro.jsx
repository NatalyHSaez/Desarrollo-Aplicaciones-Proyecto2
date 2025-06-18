import React, { useState } from 'react';
import {
  FiUser, FiMail, FiLock, FiPhone, FiCalendar, FiUserCheck
} from 'react-icons/fi';

import { auth, db, functions } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { httpsCallable } from 'firebase/functions';

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
  const [errores, setErrores] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false); // <-- estado para controlar si se intentó enviar

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const nuevosErrores = {};
    if (!rut) nuevosErrores.rut = 'El RUT es obligatorio';
    if (!nombres) nuevosErrores.nombres = 'Nombres es obligatorio';
    if (!apellidoPaterno) nuevosErrores.apellidoPaterno = 'Apellido paterno es obligatorio';
    if (!apellidoMaterno) nuevosErrores.apellidoMaterno = 'Apellido materno es obligatorio';
    if (!genero) nuevosErrores.genero = 'Debe seleccionar un género';
    if (!fechaNacimiento) nuevosErrores.fechaNacimiento = 'La fecha de nacimiento es obligatoria';
    if (!email) nuevosErrores.email = 'El email es obligatorio';
    if (!telefono || telefono.length < 12) nuevosErrores.telefono = 'Teléfono no válido';
    if (!cargo) nuevosErrores.cargo = 'Debe seleccionar un cargo';
    if (!servicio) nuevosErrores.servicio = 'Debe seleccionar un servicio';
    if (!password) nuevosErrores.password = 'Debe ingresar una contraseña';
    if (password !== repetirPassword) nuevosErrores.repetirPassword = 'Las contraseñas no coinciden';

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar en Realtime Database
      await set(ref(db, "usuarios/" + user.uid), {
        uid: user.uid,
        rut,
        nombres,
        apellidoPaterno,
        apellidoMaterno,
        genero,
        fechaNacimiento,
        email,
        telefono,
        cargo,
        servicio,
      });

      // Llamar función de Firebase para enviar correo
      //const sendEmail = httpsCallable(functions, 'sendRegistrationEmail');
      //await sendEmail({ email, rut, password });

      alert("Usuario registrado y correo enviado correctamente");

      // Limpiar formulario y estado de intento de submit
      setRut('');
      setNombres('');
      setApellidoPaterno('');
      setApellidoMaterno('');
      setGenero('');
      setFechaNacimiento('');
      setEmail('');
      setTelefono('+56 9');
      setCargo('');
      setServicio('');
      setPassword('');
      setRepetirPassword('');
      setErrores({});
      setSubmitAttempted(false);
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
      alert("Error: " + error.message);
    }
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
            {submitAttempted && errores.rut && (
              <p className="text-red-500 text-sm">{errores.rut}</p>
            )}
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
            {submitAttempted && errores.genero && (
              <p className="text-red-500 text-sm">{errores.genero}</p>
            )}
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
            {submitAttempted && errores.nombres && (
              <p className="text-red-500 text-sm">{errores.nombres}</p>
            )}
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
            {submitAttempted && errores.apellidoPaterno && (
              <p className="text-red-500 text-sm">{errores.apellidoPaterno}</p>
            )}
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
            {submitAttempted && errores.apellidoMaterno && (
              <p className="text-red-500 text-sm">{errores.apellidoMaterno}</p>
            )}
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
            {submitAttempted && errores.fechaNacimiento && (
              <p className="text-red-500 text-sm">{errores.fechaNacimiento}</p>
            )}
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
            {submitAttempted && errores.cargo && (
              <p className="text-red-500 text-sm">{errores.cargo}</p>
            )}
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
            {submitAttempted && errores.servicio && (
              <p className="text-red-500 text-sm">{errores.servicio}</p>
            )}
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
            {submitAttempted && errores.email && (
              <p className="text-red-500 text-sm">{errores.email}</p>
            )}
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
            {submitAttempted && errores.telefono && (
              <p className="text-red-500 text-sm">{errores.telefono}</p>
            )}
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
            {submitAttempted && errores.password && (
              <p className="text-red-500 text-sm">{errores.password}</p>
            )}
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
            {submitAttempted && errores.repetirPassword && (
              <p className="text-red-500 text-sm">{errores.repetirPassword}</p>
            )}
          </div>

          <div className="md:col-span-2 text-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
            >
              Registrar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Registro;
