import React from 'react';

const usuarios = [
  {
    rut: '12.345.678-9',
    nombres: 'Juan Carlos',
    apellidoPat: 'Pérez',
    apellidoMat: 'González',
    cargo: 'Analista',
    servicio: 'TI',
    email: 'juan.perez@empresa.cl',
    telefono: '+56 9 1234 5678',
  },
  {
    rut: '98.765.432-1',
    nombres: 'María José',
    apellidoPat: 'Soto',
    apellidoMat: 'Riquelme',
    cargo: 'Supervisora',
    servicio: 'Recursos Humanos',
    email: 'maria.soto@empresa.cl',
    telefono: '+56 9 8765 4321',
  },
  // Puedes agregar más usuarios aquí
];

function ControlUsuario() {
  return (
    <div className="p-6 w-full h-full overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded shadow">
          <thead>
            <tr className="bg-blue-900 text-white text-left text-sm uppercase">
              <th className="px-4 py-2">RUT</th>
              <th className="px-4 py-2">Nombres</th>
              <th className="px-4 py-2">Apellido Pat.</th>
              <th className="px-4 py-2">Apellido Mat.</th>
              <th className="px-4 py-2">Cargo</th>
              <th className="px-4 py-2">Servicio</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index} className="border-t text-sm hover:bg-gray-100">
                <td className="px-4 py-2">{usuario.rut}</td>
                <td className="px-4 py-2">{usuario.nombres}</td>
                <td className="px-4 py-2">{usuario.apellidoPat}</td>
                <td className="px-4 py-2">{usuario.apellidoMat}</td>
                <td className="px-4 py-2">{usuario.cargo}</td>
                <td className="px-4 py-2">{usuario.servicio}</td>
                <td className="px-4 py-2">{usuario.email}</td>
                <td className="px-4 py-2">{usuario.telefono}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-green-700 justify-center text-white px-3 py-1 rounded hover:bg-green-500 transition"
                    onClick={() => alert(`Detalles de ${usuario.nombres}`)}
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ControlUsuario;
