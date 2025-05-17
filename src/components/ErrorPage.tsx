export function ErrorPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-red-600">
      <h1 className="text-3xl font-bold">🌵 Erro na comunicação vegetal!</h1>
      <p className="mt-4">As plantas se recusaram a falar entre si...</p>
      <a href="/" className="mt-6 text-blue-500 underline">
        Tentar novamente
      </a>
    </div>
  );
}
