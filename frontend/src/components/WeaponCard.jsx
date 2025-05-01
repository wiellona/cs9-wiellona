export default function WeaponCard({ weapon }) {
  return (
    <div className="bg-valorant-dark border border-valorant-red rounded-lg p-4 hover:bg-valorant-gray transition">
      <img
        src={weapon.image}
        alt={weapon.name}
        className="w-full h-36 object-contain mb-3"
      />
      <h2 className="text-lg font-semibold text-white">{weapon.name}</h2>
      <p className="text-sm text-valorant-text">Type: {weapon.type}</p>
      <p className="text-sm text-valorant-text">{weapon.description}</p>
    </div>
  );
}
