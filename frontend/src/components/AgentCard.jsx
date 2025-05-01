export default function AgentCard({ agent }) {
  return (
    <div className="bg-valorant-light rounded-2xl shadow-lg p-4 hover:scale-105 transition-all">
      <img
        src={agent.image}
        alt={agent.name}
        className="rounded-xl w-full h-48 object-cover mb-4"
      />
      <h2 className="text-2xl font-bold text-valorant-red">{agent.name}</h2>
      <p className="text-xl font-semibold">{agent.role}</p>
      <p className="text-sm mt-2">{agent.description}</p>
    </div>
  );
}
