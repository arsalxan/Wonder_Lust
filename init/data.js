const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      filename: ""
    },
    price: 1500,
    location: "Malibu",
    country: "United States"
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
      filename: ""
    },
    price: 1200,
    location: "New York City",
    country: "United States"
  },
  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      filename: ""
    },
    price: 1000,
    location: "Aspen",
    country: "United States"
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      url: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1",
      filename: ""
    },
    price: 2500,
    location: "Florence",
    country: "Italy"
  },
  {
    title: "Secluded Treehouse Getaway",
    description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      filename: ""
    },
    price: 800,
    location: "Portland",
    country: "United States"
  },
  {
    title: "Beachfront Paradise",
    description: "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      filename: ""
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico"
  },
  {
    title: "Rustic Cabin by the Lake",
    description: "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      filename: ""
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States"
  },
  {
    title: "Luxury Penthouse with City Views",
    description: "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: {
      url: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
      filename: ""
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States"
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description: "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: {
      url: "https://images.unsplash.com/photo-1609943248056-1d27e29a0f5b",
      filename: ""
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland"
  },
  {
    title: "Safari Lodge in the Serengeti",
    description: "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: {
      url: "https://images.unsplash.com/photo-1595491224104-baa5b093f579",
      filename: ""
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania"
  },
  {
    title: "Charming Countryside Farmhouse",
    description: "Relax in this traditional farmhouse surrounded by rolling green fields and fresh country air. Ideal for a family retreat.",
    image: {
      url: "https://images.unsplash.com/photo-1505691723518-36a1c5ef9f98",
      filename: ""
    },
    price: 700,
    location: "Cotswolds",
    country: "United Kingdom"
  },
  {
    title: "Tropical Overwater Bungalow",
    description: "Sleep above crystal clear waters in this luxurious overwater bungalow. Perfect for a romantic honeymoon.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      filename: ""
    },
    price: 5000,
    location: "Bora Bora",
    country: "French Polynesia"
  },
  {
    title: "Igloo Under the Northern Lights",
    description: "Experience the magic of the Arctic sky in a cozy glass igloo. Watch the aurora borealis from your bed.",
    image: {
      url: "https://images.unsplash.com/photo-1519400197692-3a7d3c5a3eaa",
      filename: ""
    },
    price: 2200,
    location: "Rovaniemi",
    country: "Finland"
  },
  {
    title: "Minimalist Desert House",
    description: "Find peace and inspiration in this modern, minimalist home set in the vast desert landscape.",
    image: {
      url: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
      filename: ""
    },
    price: 1300,
    location: "Joshua Tree",
    country: "United States"
  },
  {
    title: "Fairytale Castle Stay",
    description: "Step into a fairytale in this centuries-old castle, complete with turrets, grand halls, and breathtaking views.",
    image: {
      url: "https://images.unsplash.com/photo-1590835529931-f234f47cd3a0",
      filename: ""
    },
    price: 6000,
    location: "Bavaria",
    country: "Germany"
  }
];

module.exports = sampleListings;
