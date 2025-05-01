export default function MapCard({ map }) {
  return (
    <div className="relative w-[456px] h-[100px] overflow-hidden rounded-md shadow-md group">
      <img
        src={map.image}
        alt={map.name}
        className="w-full h-full object-cover transition duration-300 group-hover:brightness-50"
      />

      {/* Overlay teks */}
      <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300 text-white">
        <h3 className="text-2xl font-bold">{map.name}</h3>
        <p className="text-sm">{map.location}</p>
      </div>
    </div>
  );
}
