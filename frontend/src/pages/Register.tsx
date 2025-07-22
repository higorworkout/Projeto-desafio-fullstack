import axios, { AxiosError } from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";

interface ErrorResponse {
  message: string;
}


const Register = () => {
    const [ user, setUser ] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/users/signup', user);
            const { token } = response.data;
            localStorage.setItem('token', token);
            navigate('/dashboard');
        
        } catch (err) {
            const axiosError = err as AxiosError;
             const errorResponse = axiosError.response?.data as ErrorResponse | undefined;
            
            const message = errorResponse?.message || 'Erro ao fazer login';
            setError(message);
            console.error('Login error:', message);
        }

    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
        >
             <h2 className="text-2xl font-bold mb-6 text-center">Criar uma conta</h2>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <TextInput
                label="Nome"
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
                error={error.includes('email') ? error : undefined}
            />

            <TextInput
                label="E-mail"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
                error={error.includes('email') ? error : undefined}
            />
            <TextInput
                label="Senha"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
                error={error.includes('senha') ? error : undefined}
            />
            <Button variant="secondary" onClick={() => alert('Clicou!')}>
                Criar conta   
            </Button>
            <hr className="flex-grow border-gray-300 m-5" />
            <p className="text-center text-sm text-gray-600">
                <Link to="/login" className="text-blue-600 hover:underline ml-1">
                    Já tem uma conta?
                </Link>
            </p>
         </form>
    </div>
  )
}

export default Register;
