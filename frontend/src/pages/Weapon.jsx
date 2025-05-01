import WeaponCard from "../components/WeaponCard";
import { weapons } from "../data";

export default function WeaponSection() {
  return (
    <section id="weapons" className="pt-12 pb-12 bg-valorant-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-valorant-red">
          WEAPONS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {weapons.map((weapon) => (
            <WeaponCard key={weapon.id} weapon={weapon} />
          ))}
        </div>
      </div>
    </section>
  );
}
