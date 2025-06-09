
import Header from '../components/Header';
import SignIn from '../components/SignIn';

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <SignIn />
      </main>
    </div>
  );
};

export default SignInPage;