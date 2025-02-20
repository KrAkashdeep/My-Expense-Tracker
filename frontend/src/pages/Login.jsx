function Login() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Brand & Quote */}
      <div className="lg:w-1/2 bg-blue-600 p-8 flex flex-col justify-between">
        <div className="text-white">
          <h1 className="text-4xl font-bold">Expense Tracker</h1>
          <p className="mt-4 text-xl">Take control of your finances</p>
        </div>
        <p className="text-white text-xl italic">
          `A penny saved is a penny earned`
        </p>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
