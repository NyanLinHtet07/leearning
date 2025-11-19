export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <h1 className="text-3xl font-bold">Welcome to Learnify</h1>
        <p>Empower your learning journey.</p>
        <a href="/auth/login" className="text-blue-600 underline">Login</a>
        <a href="/auth/register" className="text-blue-600 underline">Register</a>
        <a href="/teacher" className="text-blue-600 underline">Dashboard</a>
        <a href="/student" className="text-blue-600 underline">Student</a>
      </main>
    </div>
  );
}
