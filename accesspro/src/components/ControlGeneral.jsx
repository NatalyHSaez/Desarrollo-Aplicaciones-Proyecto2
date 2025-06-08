import React from 'react';

function ControlGeneral() {
  return (
    <div className="w-full h-full p-6">
      {/* Primera fila: 4 tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card title="Personal Total" />
        <Card title="Aforo Actual" />
        <Card title="Personal Asistente" />
        <Card title="Hora Punta" />
      </div>

      {/* Segunda fila: 2 tarjetas grandes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card title="Resumen de Accesos" height="h-48" />
        <Card title="Resumen de Asistencia" height="h-48" />
      </div>

      {/* Tercera fila: tarjeta ancha */}
      <div>
        <Card title="Control de Aforo" height="h-40" />
      </div>
    </div>
  );
}

// Componente reutilizable de tarjeta
function Card({ title, height = "h-32" }) {
  return (
    <div className={`bg-gray-200 rounded shadow p-4 ${height}`}>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {/* Aquí se puede insertar contenido adicional como gráficas, estadísticas, etc. */}
    </div>
  );
}

export default ControlGeneral;
