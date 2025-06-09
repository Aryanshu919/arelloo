import Header from '../components/Header';
import Register from '../components/Register';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Register />
      </main>
    </div>
  );
};

export default RegisterPage;