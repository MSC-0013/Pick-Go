
export const cars = [
  {
    id: 1,
    name: "Tesla Model S Plaid",
    brand: "Tesla",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop",
    pricePerDay: 8500,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Autopilot", "Premium Audio", "GPS", "Climate Control", "Ludicrous Mode"],
    rating: 4.9,
    available: true,
    description: "The fastest production sedan ever made with cutting-edge technology",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "637 km",
      acceleration: "1.99s 0-100kmh"
    }
  },
  {
    id: 2,
    name: "Tesla Model 3 Performance",
    brand: "Tesla",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop",
    pricePerDay: 6500,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Autopilot", "Premium Audio", "GPS", "Climate Control", "Track Mode"],
    rating: 4.8,
    available: true,
    description: "High-performance electric sedan with excellent range and tech",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "567 km",
      acceleration: "3.1s 0-100kmh"
    }
  },
  {
    id: 3,
    name: "Tesla Model X Plaid",
    brand: "Tesla",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop",
    pricePerDay: 9500,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Falcon Wing Doors", "Autopilot", "Premium Audio", "GPS", "Bioweapon Defense Mode"],
    rating: 4.9,
    available: true,
    description: "Luxury electric SUV with iconic falcon wing doors",
    specifications: {
      seats: 7,
      luggage: 3,
      range: "560 km",
      acceleration: "2.5s 0-100kmh"
    }
  },
  {
    id: 4,
    name: "Tesla Model Y Long Range",
    brand: "Tesla",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&h=600&fit=crop",
    pricePerDay: 7000,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Autopilot", "Premium Audio", "GPS", "Glass Roof", "Dog Mode"],
    rating: 4.8,
    available: true,
    description: "Compact luxury SUV with impressive performance and space",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "525 km",
      acceleration: "3.7s 0-100kmh"
    }
  },
  {
    id: 5,
    name: "Lucid Air Dream Edition",
    brand: "Lucid",
    image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=600&fit=crop",
    pricePerDay: 12000,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["DreamDrive Pro", "Premium Audio", "Air Suspension", "Glass Canopy", "Massage Seats"],
    rating: 4.9,
    available: true,
    description: "Ultra-luxury electric sedan with record-breaking range",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "830 km",
      acceleration: "2.5s 0-100kmh"
    }
  },
  {
    id: 6,
    name: "Porsche Taycan Turbo S",
    brand: "Porsche",
    image: "https://images.unsplash.com/photo-1605979399627-5d0c5ae93bdd?w=800&h=600&fit=crop",
    pricePerDay: 11000,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Sport Chrono", "Premium Audio", "Air Suspension", "Sport Plus Mode", "Launch Control"],
    rating: 4.8,
    available: true,
    description: "High-performance electric sports sedan with racing DNA",
    specifications: {
      seats: 4,
      luggage: 2,
      range: "412 km",
      acceleration: "2.8s 0-100kmh"
    }
  },
  {
    id: 7,
    name: "BMW iX xDrive50",
    brand: "BMW",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    pricePerDay: 8000,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["iDrive 8", "Premium Audio", "Air Suspension", "Panoramic Roof", "Gesture Control"],
    rating: 4.7,
    available: true,
    description: "Luxury electric SUV with advanced BMW technology",
    specifications: {
      seats: 5,
      luggage: 3,
      range: "630 km",
      acceleration: "4.6s 0-100kmh"
    }
  },
  {
    id: 8,
    name: "BMW i4 M50",
    brand: "BMW",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    pricePerDay: 7500,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["iDrive 8", "M Sport Package", "Sport Mode", "Wireless Charging", "Harman Kardon"],
    rating: 4.6,
    available: true,
    description: "Electric gran coupe with M Performance DNA",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "510 km",
      acceleration: "3.7s 0-100kmh"
    }
  },
  {
    id: 9,
    name: "Mercedes EQS 580",
    brand: "Mercedes",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
    pricePerDay: 10000,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["MBUX Hyperscreen", "Premium Audio", "Air Suspension", "Massage Seats", "Executive Rear"],
    rating: 4.8,
    available: true,
    description: "Ultra-luxury electric flagship with innovative technology",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "770 km",
      acceleration: "4.3s 0-100kmh"
    }
  },
  {
    id: 10,
    name: "Audi e-tron GT RS",
    brand: "Audi",
    image: "https://images.unsplash.com/photo-1606220588913-b3adef44e5c5?w=800&h=600&fit=crop",
    pricePerDay: 9000,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Virtual Cockpit Plus", "Bang & Olufsen", "Air Suspension", "Matrix LED", "Sport Differential"],
    rating: 4.7,
    available: true,
    description: "Electric grand tourer with stunning design and performance",
    specifications: {
      seats: 4,
      luggage: 2,
      range: "472 km",
      acceleration: "3.3s 0-100kmh"
    }
  },
  // Adding more affordable options starting from ₹2000
  {
    id: 11,
    name: "Tata Nexon EV Max",
    brand: "Tata",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop",
    pricePerDay: 2000,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Connected Car Tech", "Fast Charging", "Digital Cluster", "Climate Control"],
    rating: 4.2,
    available: true,
    description: "India's popular electric SUV with impressive range",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "437 km",
      acceleration: "9.9s 0-100kmh"
    }
  },
  {
    id: 12,
    name: "MG ZS EV",
    brand: "MG",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=600&fit=crop",
    pricePerDay: 2500,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["i-SMART Technology", "Panoramic Sunroof", "Fast Charging", "Connected Features"],
    rating: 4.3,
    available: true,
    description: "Feature-rich electric SUV with global appeal",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "461 km",
      acceleration: "8.5s 0-100kmh"
    }
  },
  {
    id: 13,
    name: "Hyundai Kona Electric",
    brand: "Hyundai",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    pricePerDay: 3000,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["BlueLink Technology", "Wireless Charging", "Ventilated Seats", "BOSE Audio"],
    rating: 4.4,
    available: true,
    description: "Premium electric SUV with excellent build quality",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "452 km",
      acceleration: "9.7s 0-100kmh"
    }
  },
  {
    id: 14,
    name: "Mahindra eXUV300",
    brand: "Mahindra",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    pricePerDay: 2200,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["AdrenoX Connect", "Fast Charging", "Dual Zone AC", "Wireless Charging"],
    rating: 4.1,
    available: true,
    description: "Compact electric SUV with robust Indian engineering",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "375 km",
      acceleration: "9.5s 0-100kmh"
    }
  },
  {
    id: 15,
    name: "Volvo XC40 Recharge",
    brand: "Volvo",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
    pricePerDay: 5500,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Pilot Assist", "Harman Kardon", "Safety Features", "Google Built-in", "Air Purifier"],
    rating: 4.5,
    available: true,
    description: "Compact luxury electric SUV with Scandinavian design",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "418 km",
      acceleration: "4.9s 0-100kmh"
    }
  },
  {
    id: 16,
    name: "Polestar 2 Long Range",
    brand: "Polestar",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop",
    pricePerDay: 6000,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Google Built-in", "Premium Audio", "Performance Pack", "Pilot Assist", "Heat Pump"],
    rating: 4.6,
    available: true,
    description: "Performance-focused electric fastback with minimalist design",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "540 km",
      acceleration: "4.7s 0-100kmh"
    }
  },
  {
    id: 17,
    name: "Jaguar I-PACE HSE",
    brand: "Jaguar",
    image: "https://images.unsplash.com/photo-1606220588913-b3adef44e5c5?w=800&h=600&fit=crop",
    pricePerDay: 7800,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["All-Wheel Drive", "Meridian Audio", "Air Suspension", "Touch Pro Duo", "Adaptive Dynamics"],
    rating: 4.6,
    available: true,
    description: "Luxury electric SUV with British elegance and performance",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "470 km",
      acceleration: "4.8s 0-100kmh"
    }
  },
  {
    id: 18,
    name: "Genesis GV60 Performance",
    brand: "Genesis",
    image: "https://images.unsplash.com/photo-1605979399627-5d0c5ae93bdd?w=800&h=600&fit=crop",
    pricePerDay: 8200,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Face Recognition", "Bang & Olufsen", "Air Suspension", "Biometric Entry", "Face Connect"],
    rating: 4.7,
    available: true,
    description: "Luxury electric SUV with cutting-edge biometric technology",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "451 km",
      acceleration: "4.0s 0-100kmh"
    }
  },
  {
    id: 19,
    name: "Kia EV6 GT",
    brand: "Kia",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    pricePerDay: 6800,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Ultra-Fast Charging", "V2L", "Digital Cockpit", "Remote Parking", "GT Mode"],
    rating: 4.6,
    available: true,
    description: "High-performance electric crossover with futuristic design",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "424 km",
      acceleration: "3.5s 0-100kmh"
    }
  },
  {
    id: 20,
    name: "Nissan Ariya e-4ORCE",
    brand: "Nissan",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
    pricePerDay: 5000,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["ProPILOT 2.0", "BOSE Audio", "e-4ORCE AWD", "Zero Gravity Seats", "Intelligent Key"],
    rating: 4.4,
    available: true,
    description: "Advanced electric SUV with intelligent all-wheel drive",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "500 km",
      acceleration: "5.1s 0-100kmh"
    }
  },
  // Continue adding more cars...
  {
    id: 21,
    name: "BYD Atto 3",
    brand: "BYD",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop",
    pricePerDay: 2800,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Blade Battery", "Rotating Screen", "Wireless Charging", "Panoramic Sunroof"],
    rating: 4.3,
    available: true,
    description: "Innovative electric SUV with unique rotating display",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "521 km",
      acceleration: "7.3s 0-100kmh"
    }
  },
  {
    id: 22,
    name: "Ford Mustang Mach-E GT",
    brand: "Ford",
    image: "https://images.unsplash.com/photo-1606220588913-b3adef44e5c5?w=800&h=600&fit=crop",
    pricePerDay: 7200,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["SYNC 4A", "B&O Sound", "All-Wheel Drive", "Track Mode", "MagneRide Suspension"],
    rating: 4.5,
    available: true,
    description: "Electric SUV inspired by Mustang heritage with performance focus",
    specifications: {
      seats: 5,
      luggage: 3,
      range: "490 km",
      acceleration: "3.5s 0-100kmh"
    }
  },
  {
    id: 23,
    name: "Rivian R1S",
    brand: "Rivian",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=600&fit=crop",
    pricePerDay: 9800,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Tank Turn", "Camp Mode", "Air Suspension", "Quad Motor AWD", "Off-Road+"],
    rating: 4.7,
    available: true,
    description: "Electric adventure SUV built for outdoor enthusiasts",
    specifications: {
      seats: 7,
      luggage: 4,
      range: "516 km",
      acceleration: "3.0s 0-100kmh"
    }
  },
  {
    id: 24,
    name: "Cadillac Lyriq Luxury",
    brand: "Cadillac",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    pricePerDay: 6500,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Super Cruise", "AKG Audio", "LED Matrix", "Wireless Charging", "33-inch Display"],
    rating: 4.5,
    available: true,
    description: "Luxury electric SUV with hands-free driving capability",
    specifications: {
      seats: 5,
      luggage: 3,
      range: "502 km",
      acceleration: "5.2s 0-100kmh"
    }
  },
  {
    id: 25,
    name: "Mercedes EQB 350",
    brand: "Mercedes",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop",
    pricePerDay: 5200,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["MBUX", "Burmester Audio", "7-Seat Option", "Pre-Entry Climate", "ENERGIZING"],
    rating: 4.4,
    available: true,
    description: "Family-focused electric SUV with optional third row",
    specifications: {
      seats: 7,
      luggage: 2,
      range: "423 km",
      acceleration: "6.0s 0-100kmh"
    }
  },
  {
    id: 26,
    name: "Lexus RZ 450e F SPORT",
    brand: "Lexus",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    pricePerDay: 7000,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Lexus Safety+ 3.0", "Mark Levinson", "Direct4 AWD", "Panoramic Roof", "Tazuna Cockpit"],
    rating: 4.5,
    available: true,
    description: "Luxury electric SUV with refined Japanese craftsmanship",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "440 km",
      acceleration: "5.0s 0-100kmh"
    }
  },
  {
    id: 27,
    name: "Fisker Ocean Extreme",
    brand: "Fisker",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
    pricePerDay: 6200,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["California Mode", "SolarSky Roof", "Revolve Screen", "Earth Mode", "Ocean Drive Mode"],
    rating: 4.4,
    available: true,
    description: "Sustainable electric SUV with innovative eco-friendly features",
    specifications: {
      seats: 5,
      luggage: 3,
      range: "630 km",
      acceleration: "3.9s 0-100kmh"
    }
  },
  {
    id: 28,
    name: "VinFast VF8 City Edition",
    brand: "VinFast",
    image: "https://images.unsplash.com/photo-1605979399627-5d0c5ae93bdd?w=800&h=600&fit=crop",
    pricePerDay: 4500,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["VinFast Connect", "Premium Audio", "Smart Services", "Voice Control"],
    rating: 4.2,
    available: true,
    description: "Vietnamese electric SUV with competitive features",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "420 km",
      acceleration: "5.9s 0-100kmh"
    }
  },
  {
    id: 29,
    name: "Lotus Eletre R",
    brand: "Lotus",
    image: "https://images.unsplash.com/photo-1606220588913-b3adef44e5c5?w=800&h=600&fit=crop",
    pricePerDay: 12500,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Track Mode", "KEF Audio", "Air Suspension", "LiDAR", "Carbon Fiber Package"],
    rating: 4.8,
    available: true,
    description: "High-performance electric SUV with Lotus racing DNA",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "450 km",
      acceleration: "2.95s 0-100kmh"
    }
  },
  {
    id: 30,
    name: "Peugeot e-2008 GT",
    brand: "Peugeot",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop",
    pricePerDay: 3500,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["3D i-Cockpit", "Wireless Charging", "LED Matrix", "Focal Audio"],
    rating: 4.3,
    available: true,
    description: "Stylish French electric SUV with distinctive design",
    specifications: {
      seats: 5,
      luggage: 2,
      range: "340 km",
      acceleration: "8.5s 0-100kmh"
    }
  },
  // Adding more budget-friendly options
  {
    id: 31,
    name: "Citroen eC3",
    brand: "Citroen",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    pricePerDay: 2000,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Digital Cluster", "Smartphone Integration", "Fast Charging", "Eco Mode"],
    rating: 4.0,
    available: true,
    description: "Affordable electric hatchback perfect for city driving",
    specifications: {
      seats: 5,
      luggage: 1,
      range: "320 km",
      acceleration: "12.0s 0-100kmh"
    }
  },
  {
    id: 32,
    name: "OLA S1 Pro (Scooter)",
    brand: "OLA",
    image: "https://images.unsplash.com/photo-1558618047-3c8c4d91e4b4?w=800&h=600&fit=crop",
    pricePerDay: 800,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["MoveOS", "Fast Charging", "Multiple Ride Modes", "Navigation"],
    rating: 4.1,
    available: true,
    description: "Smart electric scooter for urban mobility",
    specifications: {
      seats: 2,
      luggage: 1,
      range: "181 km",
      acceleration: "8.5s 0-60kmh"
    }
  },
  {
    id: 33,
    name: "Ather 450X (Scooter)",
    brand: "Ather",
    image: "https://images.unsplash.com/photo-1558618038-f5852b6a8193?w=800&h=600&fit=crop",
    pricePerDay: 900,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Smart Dashboard", "Navigation", "Fast Charging", "Theft Protection"],
    rating: 4.3,
    available: true,
    description: "Premium electric scooter with smart features",
    specifications: {
      seats: 2,
      luggage: 1,
      range: "146 km",
      acceleration: "6.5s 0-60kmh"
    }
  },
  {
    id: 34,
    name: "TVS iQube Electric",
    brand: "TVS",
    image: "https://images.unsplash.com/photo-1558618047-3c8c4d91e4b4?w=800&h=600&fit=crop",
    pricePerDay: 750,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Smart Connectivity", "Navigation", "Fast Charging", "Reverse Mode"],
    rating: 4.2,
    available: true,
    description: "Feature-rich electric scooter from TVS",
    specifications: {
      seats: 2,
      luggage: 1,
      range: "140 km",
      acceleration: "8.8s 0-60kmh"
    }
  },
  {
    id: 35,
    name: "Bajaj Chetak Electric",
    brand: "Bajaj",
    image: "https://images.unsplash.com/photo-1558618038-f5852b6a8193?w=800&h=600&fit=crop",
    pricePerDay: 700,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Digital Display", "Mobile Connectivity", "LED Lighting", "Regenerative Braking"],
    rating: 4.0,
    available: true,
    description: "Classic design electric scooter with modern technology",
    specifications: {
      seats: 2,
      luggage: 1,
      range: "108 km",
      acceleration: "11.0s 0-60kmh"
    }
  }
];
