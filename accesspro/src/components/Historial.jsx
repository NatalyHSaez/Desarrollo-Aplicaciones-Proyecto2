import React from 'react';

function Historial() {
  return (
    <div className="w-full h-full p-6">
      {/* Primera fila: 4 tarjetas con nuevos títulos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card title="Días Asistidos" />
        <Card title="Hora Punta" />
        <Card title="Cantidad de Entradas" />
        <Card title="Cantidad de Salidas" />
      </div>

      {/* Segunda fila: 2 tarjetas grandes (igual que antes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card title="Resumen de Accesos" height="h-48" />
        <Card title="Resumen de Asistencia" height="h-48" />
      </div>

      {/* No hay tercera fila en Historial (Control de Aforo eliminado) */}
    </div>
  );
}

// Componente reutilizable de tarjeta (igual que en ControlGeneral)
function Card({ title, height = "h-32" }) {
  return (
    <div className={`bg-gray-200 rounded shadow p-4 ${height}`}>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {/* Aquí se puede insertar contenido adicional como gráficas, estadísticas, etc. */}
    </div>
  );
}

export default Historial;
