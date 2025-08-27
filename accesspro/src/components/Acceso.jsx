import React, { useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { ref, get, child, push, set } from 'firebase/database';
import { db } from '../firebase';

export default function Acceso() {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState('');
  const [registrado, setRegistrado] = useState(false);
  const [escaneando, setEscaneando] = useState(false);
  const qrCodeRegionId = 'reader';
  const scanner = useRef(null);

  const iniciarEscaneo = () => {
    if (escaneando) return;
    setEscaneando(true);

    scanner.current = new Html5Qrcode(qrCodeRegionId);
    scanner.current.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: 250 },
      async (decodedText) => {
        try {
          await scanner.current.stop();
          document.getElementById(qrCodeRegionId).innerHTML = '';
          setEscaneando(false);
          verificarUsuario(decodedText);
        } catch (err) {
          console.error('Error al detener el escáner:', err);
        }
      },
      (error) => {
        console.warn('Error escaneando:', error);
      }
    );
  };

  const verificarUsuario = async (qrLeido) => {
    setError('');
    setRegistrado(false);
    setUsuario(null);

    try {
      const snapshot = await get(child(ref(db), 'usuarios'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const usuarioEncontrado = Object.values(data).find(
          (u) => u.qrCode === qrLeido
        );

        if (usuarioEncontrado) {
          setUsuario(usuarioEncontrado);
          registrarMarca(usuarioEncontrado);
        } else {
          setError('QR no coincide con ningún usuario.');
        }
      }
    } catch (err) {
      console.error(err);
      setError('Error consultando la base de datos.');
    }
  };

  const registrarMarca = async (usuario) => {
    const now = new Date();
    const marca = {
      uid: usuario.uid || '',
      nombre: `${usuario.nombres} ${usuario.apellidoPaterno}`,
      fecha: now.toLocaleDateString(),
      hora: now.toLocaleTimeString(),
      tipo: 'Entrada',
    };

    try {
      const nuevaRef = push(ref(db, 'registros'));
      await set(nuevaRef, marca);
      setRegistrado(true);
    } catch (err) {
      console.error('Error registrando marca:', err);
      setError('No se pudo registrar la marca.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-6">Acceso por QR</h1>

      <button
        onClick={iniciarEscaneo}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 mb-4"
      >
        Registrar Marca
      </button>

      <div
        id={qrCodeRegionId}
        className="w-full max-w-md h-64 border border-gray-300 rounded shadow-md bg-white flex items-center justify-center"
      >
        {!escaneando && <p className="text-gray-500">Escáner inactivo</p>}
      </div>

      {usuario && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded w-full max-w-md text-center">
          <p className="font-bold text-green-700">Usuario registrado:</p>
          <p>{usuario.nombres} {usuario.apellidoPaterno}</p>
          <p className="text-sm text-gray-600">Marca registrada con éxito.</p>
        </div>
      )}

      {registrado && (
        <div className="mt-4 text-green-600 font-medium">✓ Registro exitoso</div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded w-full max-w-md text-center">
          <p className="text-red-700 font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
