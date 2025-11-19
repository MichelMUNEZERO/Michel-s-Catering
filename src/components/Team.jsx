import React from "react";

const Team = () => {
  const teamMembers = [
    {
      name: "waiters",
      role: "Service Staff",
      image:
        "/src/Photo/Photo's Team/WhatsApp Image 2025-11-18 at 11.18.28_f9dc515c.jpg",
    },
    {
      name: "Mind Master",
      role: "Owner",
      image:
        "/src/Photo/Photo's Team/WhatsApp Image 2025-11-18 at 11.18.42_82541c8f.jpg",
    },
    {
      name: "Chef",
      role: "Head Chef",
      image:
        "/src/Photo/Photo's Team/WhatsApp Image 2025-11-18 at 11.18.42_885f654a.jpg",
    },
    {
      name: "Cleaning Staff",
      role: "Janitorial Team",
      image:
        "/src/Photo/Photo's Team/WhatsApp Image 2025-11-18 at 11.18.43_9960b09c.jpg",
    },
  ];

  return (
    <section className="team-section" id="team">
      <div className="section-title">
        <h2>Meet Our Team</h2>
        <p>The talented people behind Kamuta Ltd's exceptional services</p>
      </div>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <div className="team-image">
              <img src={member.image} alt={member.name} />
            </div>
            <div className="team-info">
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
