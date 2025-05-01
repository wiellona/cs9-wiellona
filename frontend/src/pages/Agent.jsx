import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import AgentCard from "../components/AgentCard";
import { agents } from "../data";

export default function AgentSection() {
  const [selectedRole, setSelectedRole] = useState("All");

  const roles = useMemo(() => {
    const uniq = Array.from(new Set(agents.map((a) => a.role)));
    return ["All", ...uniq];
  }, []);

  const filteredAgents = useMemo(() => {
    if (selectedRole === "All") return agents;
    return agents.filter((a) => a.role === selectedRole);
  }, [selectedRole]);

  return (
    <section id="agents" className="pt-24 pb-12 px-8">
      <h2 className="text-4xl font-bold text-center mb-8 text-valorant-red">
        AGENTS
      </h2>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`
              px-4 py-2 rounded-full font-semibold
              ${
                selectedRole === role
                  ? "bg-valorant-red text-white shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }
              transition-all
            `}
          >
            {role}
          </button>
        ))}
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        loop={true}
        className="px-4"
      >
        {filteredAgents.map((agent) => (
          <SwiperSlide key={agent.id} className="flex justify-center">
            <AgentCard agent={agent} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
