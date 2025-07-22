import { useState } from "react";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface SignInData {
  email: string;
  password: string;
}

const Login = () => {
  const { login, error, isAuthenticated } = useAuth();
  const [user, setUser] = useState<SignInData>({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await login(user);
    } catch (err) {
      // erro tratado pelo context
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <TextInput
          label="E-mail"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
          error={error?.toLowerCase().includes('email') ? error : undefined}
        />

        <TextInput
          label="Senha"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
          error={error?.toLowerCase().includes('senha') ? error : undefined}
        />

        <Button variant="primary" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>

        <hr className="flex-grow border-gray-300 m-5" />

        <p className="text-center text-sm text-gray-600">
          Não tem uma conta?
          <Link to="/register" className="text-blue-600 hover:underline ml-1">
            Criar conta
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
