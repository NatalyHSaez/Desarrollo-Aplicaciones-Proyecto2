function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-semibold mb-4">Iniciar sesión</h1>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
