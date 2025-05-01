import AuthForm from "../components/AuthForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div>
      <Navbar />
      <AuthForm type="login" />
      <Footer />
    </div>
  );
}
