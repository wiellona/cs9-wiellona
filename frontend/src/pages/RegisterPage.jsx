import AuthForm from "../components/AuthForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RegisterPage() {
  return (
    <div>
      <Navbar />
      <AuthForm type="register" />
      <Footer />
    </div>
  );
}
