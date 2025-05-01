import "../App.css";
import Navbar from "../components/Navbar";
import AgentSection from "../pages/Agent";
import WeaponSection from "../pages/Weapon";
import MapSection from "../pages/Map";
import HeroSection from "../components/Home";
import Footer from "../components/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <main>
        <section id="home">
          <HeroSection />
        </section>
        <section id="agents">
          <AgentSection />
        </section>

        <section id="weapons">
          <WeaponSection />
        </section>

        <section id="maps">
          <MapSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
