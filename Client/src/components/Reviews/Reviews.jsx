import React from 'react'
import './Reviews.css'

const clients = [
  {
    name: "John Doe",
    image: "/images/me2.png",
    text: "GlobeSnap is the perfect place to preserve and relive our travel memories. The experience of capturing and organizing our journeys was smooth and enjoyable. Highly recommended!",
    location: "New York, USA",
  },
  {
    name: "Jane Smith",
    image: "/images/me.png",
    text: "GlobeSnap helped us turn our travel moments into lasting memories. It's a beautiful way to document and revisit our adventures anytime.",
    location: "London, UK",
  },
  {
    name: "Georgia Miller",
    image: "/images/me3.png",
    text: "GlobeSnap helped us turn our travel moments into lasting memories. It's a beautiful way to document and revisit our adventures anytime.",
    location: "Sydney, Australia",
  },
];

const Reviews = () => {
  return (
    <div className="review-section">
        <h2 className="review-title">What our Clients Say</h2>
        <div className="review-grid">
          {clients.map((client, index) => (
            <div key={index} className="review-card">
              <img src={client.image} alt="" className="client-image" />
              <h3 className="client-name">{client.name}</h3>
              <p className="client-location">{client.location}</p>
              <p className="client-text">{client.text}</p>
            </div>
          ))}
        </div>
    </div>
  );
};


export default Reviews
