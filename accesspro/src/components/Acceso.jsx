import React, { useEffect, useRef, useState } from 'react';

function Acceso() {
  const videoRef = useRef(null);
  const [fechaHora, setFechaHora] = useState(new Date());

  useEffect(() => {
    // Activar cámara
    async function activarCamara() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error al acceder a la cámara:', err);
      }
    }
    activarCamara();

    // Actualizar fecha y hora cada segundo
    const intervalo = setInterval(() => {
      setFechaHora(new Date());
    }, 1000);

    // Limpiar intervalo al desmontar componente
    return () => clearInterval(intervalo);
  }, []);

  // Formatear fecha y hora desde el estado
  const fechaFormateada = `${fechaHora.getDate().toString().padStart(2, '0')}/${(fechaHora.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${fechaHora.getFullYear().toString().slice(2)}`;

  const horaActual = fechaHora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-900">Registro de Marca</h2>

      {/* Tipo */}
      <div className="mb-6 text-lg flex flex-col sm:flex-row items-start sm:items-center sm:gap-6">
        <label className="font-semibold text-xl text-gray-700">Tipo:</label>
        <div className="flex gap-6 mt-2 sm:mt-0">
          <label className="text-black text-lg flex items-center gap-2">
            <input type="radio" name="tipo" defaultChecked className="w-4 h-4 accent-black" />
            Entrada
          </label>
          <label className="text-black text-lg flex items-center gap-2">
            <input type="radio" name="tipo" className="w-4 h-4 accent-black" />
            Salida
          </label>
        </div>
      </div>

      {/* Fecha */}
      <div className="mb-4 text-xl text-gray-700">
        <span className="font-semibold mr-2">Fecha:</span>
        {fechaFormateada}
      </div>

      {/* Hora */}
      <div className="mb-8 text-xl text-gray-700">
        <span className="font-semibold mr-2">Hora:</span>
        {horaActual} Hrs
      </div>

      {/* Lector QR */}
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-4 text-blue-800">Lector QR</h3>
        <div className="w-60 h-60 mx-auto border-4 border-gray-500 rounded-xl overflow-hidden shadow-md">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default Acceso;
