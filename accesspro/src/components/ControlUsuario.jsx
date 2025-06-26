import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase'; // Asegúrate que tu archivo firebase.js exporte correctamente `db`

function ControlUsuario() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const usuariosRef = ref(db, 'usuarios'); // Asegúrate que los datos estén en esa ruta en tu BD
    const unsubscribe = onValue(usuariosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usuariosArray = Object.entries(data).map(([id, usuario]) => ({
          id,
          ...usuario,
        }));
        setUsuarios(usuariosArray);
      } else {
        setUsuarios([]);
      }
    });

    // Limpieza del listener
    return () => unsubscribe();
  }, []);

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
              <tr key={usuario.id || index} className="border-t text-sm hover:bg-gray-100">
                <td className="px-4 py-2">{usuario.rut}</td>
                <td className="px-4 py-2">{usuario.nombres}</td>
                <td className="px-4 py-2">{usuario.apellidoPaterno}</td>
                <td className="px-4 py-2">{usuario.apellidoMaterno}</td>
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
            {usuarios.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ControlUsuario;
