const Services = () => {
  const services = [
    {
      title: "Delivery Service",
      image: "/src/Photo/Service's photo/Delivery Services photo.jpg",
      description:
        "Fresh, delicious meals delivered right to your doorstep. Perfect for corporate events and private gatherings.",
    },
    {
      title: "Wedding Catering",
      image: "/src/Photo/Service's photo/Wedding Catering.jpg",
      description:
        "Make your special day unforgettable with our exquisite wedding catering services.",
    },
    {
      title: "Small Parties",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      description:
        "Perfect catering solutions for intimate gatherings and small celebrations.",
    },
    {
      title: "Corporate Events",
      image:
        "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      description:
        "Professional catering services for business meetings and corporate events.",
    },
    {
      title: "Meeting Catering",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      description:
        "Keep your team energized with our professional meeting catering services.",
    },
    {
      title: "Fine Dining",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      description:
        "Experience the art of fine dining with our premium catering services.",
    },
  ];

  return (
    <section className="services-section" id="services">
      <div className="section-title">
        <h2>Our Services</h2>
        <p>Discover our range of premium catering solutions</p>
      </div>
      <div className="cards">
        {services.map((service, index) => (
          <div className="Cards-contain" key={index}>
            <div className="card-image">
              <img src={service.image} alt={service.title} />
            </div>
            <div className="card-content">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
