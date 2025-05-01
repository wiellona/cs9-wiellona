import MapCard from "../components/MapCard";
import { maps } from "../data";

export default function MapSection() {
  return (
    <section className="py-16 px-8 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10 text-valorant-red">
        MAPS
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {maps.map((map) => (
          <MapCard key={map.id} map={map} />
        ))}
      </div>
    </section>
  );
}
