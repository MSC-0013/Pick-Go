
export const cars = [
  {
    id: 1,
    name: "Tesla Model S",
    brand: "Tesla",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop",
    pricePerDay: 150,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Autopilot", "Premium Audio", "GPS", "Climate Control"],
    rating: 4.9,
    available: true,
    description: "Premium electric sedan with cutting-edge technology",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "405 miles",
      acceleration: "3.1s 0-60mph"
    }
  },
  {
    id: 2,
    name: "Tesla Model 3",
    brand: "Tesla",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop",
    pricePerDay: 120,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Autopilot", "Premium Audio", "GPS", "Climate Control"],
    rating: 4.8,
    available: true,
    description: "Most popular electric sedan with excellent range",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "358 miles",
      acceleration: "5.3s 0-60mph"
    }
  },
  {
    id: 3,
    name: "Tesla Model X",
    brand: "Tesla",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop",
    pricePerDay: 180,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Falcon Wing Doors", "Autopilot", "Premium Audio", "GPS"],
    rating: 4.9,
    available: true,
    description: "Luxury electric SUV with falcon wing doors",
    specifications: {
      seats: 7,
      luggage: 3,
      range: "348 miles",
      acceleration: "3.8s 0-60mph"
    }
  },
  {
    id: 4,
    name: "Tesla Model Y",
    brand: "Tesla",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&h=600&fit=crop",
    pricePerDay: 140,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Autopilot", "Premium Audio", "GPS", "Glass Roof"],
    rating: 4.8,
    available: true,
    description: "Compact luxury SUV with impressive performance",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "326 miles",
      acceleration: "4.8s 0-60mph"
    }
  },
  {
    id: 5,
    name: "Lucid Air Dream",
    brand: "Lucid",
    image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=600&fit=crop",
    pricePerDay: 200,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["DreamDrive", "Premium Audio", "Air Suspension", "Glass Canopy"],
    rating: 4.9,
    available: true,
    description: "Ultra-luxury electric sedan with record-breaking range",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "516 miles",
      acceleration: "2.5s 0-60mph"
    }
  },
  {
    id: 6,
    name: "Porsche Taycan",
    brand: "Porsche",
    image: "https://images.unsplash.com/photo-1605979399627-5d0c5ae93bdd?w=800&h=600&fit=crop",
    pricePerDay: 170,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Sport Chrono", "Premium Audio", "Air Suspension", "Sport Mode"],
    rating: 4.8,
    available: true,
    description: "High-performance electric sports sedan",
    specifications: {
      seats: 4,
      luggage: 2,
      range: "287 miles",
      acceleration: "2.6s 0-60mph"
    }
  },
  {
    id: 7,
    name: "BMW iX",
    brand: "BMW",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    pricePerDay: 160,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["iDrive 8", "Premium Audio", "Air Suspension", "Panoramic Roof"],
    rating: 4.7,
    available: true,
    description: "Luxury electric SUV with advanced technology",
    specifications: {
      seats: 5,
      luggage: 3,
      range: "324 miles",
      acceleration: "4.6s 0-60mph"
    }
  },
  {
    id: 8,
    name: "BMW i4",
    brand: "BMW",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    pricePerDay: 130,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["iDrive 8", "Premium Audio", "Sport Mode", "Wireless Charging"],
    rating: 4.6,
    available: true,
    description: "Electric gran coupe with sporty performance",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "270 miles",
      acceleration: "5.7s 0-60mph"
    }
  },
  {
    id: 9,
    name: "Mercedes EQS",
    brand: "Mercedes",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
    pricePerDay: 190,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["MBUX Hyperscreen", "Premium Audio", "Air Suspension", "Massage Seats"],
    rating: 4.8,
    available: true,
    description: "Ultra-luxury electric flagship sedan",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "453 miles",
      acceleration: "4.1s 0-60mph"
    }
  },
  {
    id: 10,
    name: "Audi e-tron GT",
    brand: "Audi",
    image: "https://images.unsplash.com/photo-1606220588913-b3adef44e5c5?w=800&h=600&fit=crop",
    pricePerDay: 175,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Virtual Cockpit", "Premium Audio", "Air Suspension", "Matrix LED"],
    rating: 4.7,
    available: true,
    description: "Electric grand tourer with stunning design",
    specifications: {
      seats: 4,
      luggage: 2,
      range: "238 miles",
      acceleration: "3.9s 0-60mph"
    }
  },
  {
    id: 11,
    name: "Ford Mustang Mach-E",
    brand: "Ford",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop",
    pricePerDay: 110,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["SYNC 4A", "Premium Audio", "All-Wheel Drive", "Sport Mode"],
    rating: 4.5,
    available: true,
    description: "Electric SUV inspired by Mustang heritage",
    specifications: {
      seats: 5,
      luggage: 3,
      range: "314 miles",
      acceleration: "4.8s 0-60mph"
    }
  },
  {
    id: 12,
    name: "Rivian R1T",
    brand: "Rivian",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=600&fit=crop",
    pricePerDay: 150,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Tank Turn", "Camp Mode", "Air Suspension", "Off-Road Mode"],
    rating: 4.6,
    available: true,
    description: "Electric pickup truck built for adventure",
    specifications: {
      seats: 5,
      luggage: 4,
      range: "314 miles",
      acceleration: "3.0s 0-60mph"
    }
  },
  {
    id: 13,
    name: "Genesis GV60",
    brand: "Genesis",
    image: "https://images.unsplash.com/photo-1605979399627-5d0c5ae93bdd?w=800&h=600&fit=crop",
    pricePerDay: 140,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Face Recognition", "Premium Audio", "Air Suspension", "Biometric"],
    rating: 4.6,
    available: true,
    description: "Luxury electric SUV with biometric entry",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "248 miles",
      acceleration: "4.0s 0-60mph"
    }
  },
  {
    id: 14,
    name: "Cadillac Lyriq",
    brand: "Cadillac",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    pricePerDay: 135,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Super Cruise", "Premium Audio", "LED Matrix", "Wireless Charging"],
    rating: 4.5,
    available: true,
    description: "Luxury electric SUV with hands-free driving",
    specifications: {
      seats: 5,
      luggage: 3,
      range: "312 miles",
      acceleration: "5.2s 0-60mph"
    }
  },
  {
    id: 15,
    name: "Volvo XC40 Recharge",
    brand: "Volvo",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    pricePerDay: 100,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Pilot Assist", "Premium Audio", "Safety Features", "Google Built-in"],
    rating: 4.4,
    available: true,
    description: "Compact luxury electric SUV with safety focus",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "223 miles",
      acceleration: "4.7s 0-60mph"
    }
  },
  {
    id: 16,
    name: "Polestar 2",
    brand: "Polestar",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop",
    pricePerDay: 115,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Google Built-in", "Premium Audio", "Performance Pack", "Pilot Assist"],
    rating: 4.5,
    available: true,
    description: "Performance-focused electric fastback",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "270 miles",
      acceleration: "4.5s 0-60mph"
    }
  },
  {
    id: 17,
    name: "Jaguar I-PACE",
    brand: "Jaguar",
    image: "https://images.unsplash.com/photo-1606220588913-b3adef44e5c5?w=800&h=600&fit=crop",
    pricePerDay: 145,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["All-Wheel Drive", "Premium Audio", "Air Suspension", "Touch Pro Duo"],
    rating: 4.6,
    available: true,
    description: "Luxury electric SUV with sporty character",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "234 miles",
      acceleration: "4.5s 0-60mph"
    }
  },
  {
    id: 18,
    name: "Hyundai IONIQ 5",
    brand: "Hyundai",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
    pricePerDay: 95,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Ultra-Fast Charging", "V2L", "Digital Mirrors", "Relaxation Seats"],
    rating: 4.7,
    available: true,
    description: "Innovative electric crossover with ultra-fast charging",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "303 miles",
      acceleration: "5.2s 0-60mph"
    }
  },
  {
    id: 19,
    name: "Kia EV6",
    brand: "Kia",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    pricePerDay: 100,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Ultra-Fast Charging", "V2L", "Digital Cockpit", "Remote Parking"],
    rating: 4.6,
    available: true,
    description: "Sporty electric crossover with cutting-edge tech",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "310 miles",
      acceleration: "5.1s 0-60mph"
    }
  },
  {
    id: 20,
    name: "Nissan Ariya",
    brand: "Nissan",
    image: "https://images.unsplash.com/photo-1605979399627-5d0c5ae93bdd?w=800&h=600&fit=crop",
    pricePerDay: 105,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["ProPILOT Assist", "Premium Audio", "e-4ORCE", "Zero Gravity Seats"],
    rating: 4.4,
    available: true,
    description: "Electric SUV with advanced driver assistance",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "300 miles",
      acceleration: "5.1s 0-60mph"
    }
  },
  {
    id: 21,
    name: "Chevrolet Bolt EUV",
    brand: "Chevrolet",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    pricePerDay: 85,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Super Cruise", "Infotainment", "Safety Features", "One-Pedal Driving"],
    rating: 4.3,
    available: true,
    description: "Affordable electric SUV with advanced features",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "247 miles",
      acceleration: "6.5s 0-60mph"
    }
  },
  {
    id: 22,
    name: "Volkswagen ID.4",
    brand: "Volkswagen",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop",
    pricePerDay: 90,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["IQ.DRIVE", "Premium Audio", "App Connect", "Keyless Access"],
    rating: 4.4,
    available: true,
    description: "Practical electric SUV with German engineering",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "275 miles",
      acceleration: "5.4s 0-60mph"
    }
  },
  {
    id: 23,
    name: "Fisker Ocean",
    brand: "Fisker",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=600&fit=crop",
    pricePerDay: 125,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["California Mode", "SolarSky Roof", "Revolve Screen", "Earth Mode"],
    rating: 4.5,
    available: true,
    description: "Sustainable electric SUV with innovative features",
    specifications: {
      seats: 5,
      luggage: 3,
      range: "360 miles",
      acceleration: "6.1s 0-60mph"
    }
  },
  {
    id: 24,
    name: "Mercedes EQE",
    brand: "Mercedes",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
    pricePerDay: 165,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["MBUX", "Premium Audio", "Air Body Control", "Digital Light"],
    rating: 4.7,
    available: true,
    description: "Executive electric sedan with luxury comfort",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "350 miles",
      acceleration: "6.2s 0-60mph"
    }
  },
  {
    id: 25,
    name: "BMW iX3",
    brand: "BMW",
    image: "https://images.unsplash.com/photo-1606220588913-b3adef44e5c5?w=800&h=600&fit=crop",
    pricePerDay: 120,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["iDrive 7", "Premium Audio", "Driving Assistant", "Wireless Charging"],
    rating: 4.5,
    available: true,
    description: "Electric SUV with BMW's signature driving dynamics",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "285 miles",
      acceleration: "6.8s 0-60mph"
    }
  },
  {
    id: 26,
    name: "Genesis Electrified G80",
    brand: "Genesis",
    image: "https://images.unsplash.com/photo-1605979399627-5d0c5ae93bdd?w=800&h=600&fit=crop",
    pricePerDay: 155,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Highway Driving Assist", "Premium Audio", "Air Suspension", "Biometric"],
    rating: 4.6,
    available: true,
    description: "Luxury electric sedan with sophisticated technology",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "282 miles",
      acceleration: "4.9s 0-60mph"
    }
  },
  {
    id: 27,
    name: "Audi Q4 e-tron",
    brand: "Audi",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    pricePerDay: 125,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Virtual Cockpit", "Premium Audio", "Matrix LED", "MMI Navigation"],
    rating: 4.5,
    available: true,
    description: "Compact luxury electric SUV with premium features",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "265 miles",
      acceleration: "5.8s 0-60mph"
    }
  },
  {
    id: 28,
    name: "Tesla Cybertruck",
    brand: "Tesla",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=600&fit=crop",
    pricePerDay: 200,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Bulletproof Body", "Autopilot", "Air Suspension", "Tow Mode"],
    rating: 4.8,
    available: false,
    description: "Revolutionary electric pickup with unique design",
    specifications: {
      seats: 6,
      luggage: 4,
      range: "500 miles",
      acceleration: "2.8s 0-60mph"
    }
  },
  {
    id: 29,
    name: "Mercedes EQB",
    brand: "Mercedes",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop",
    pricePerDay: 110,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["MBUX", "Premium Audio", "7-Seat Option", "Pre-Entry Climate"],
    rating: 4.4,
    available: true,
    description: "Family-focused electric SUV with 7-seat option",
    specifications: {
      seats: 7,
      luggage: 2,
      range: "260 miles",
      acceleration: "8.0s 0-60mph"
    }
  },
  {
    id: 30,
    name: "Lexus RZ 450e",
    brand: "Lexus",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    pricePerDay: 140,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Lexus Safety+", "Premium Audio", "Direct4", "Panoramic Roof"],
    rating: 4.5,
    available: true,
    description: "Luxury electric SUV with refined Japanese craftsmanship",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "308 miles",
      acceleration: "5.0s 0-60mph"
    }
  }
];
