import React, { useState } from 'react'
import HomeCard from '../../components/common/HomeCard';
import { FiBell } from 'react-icons/fi';
function Home() {
    const categoryData = [
  {
    category: "Health & Wellness",
    image: "https://via.placeholder.com/150?text=Profile",
    professions: [
      { name: "Nutritionist" },
      { name: "Dietitian" },
      { name: "Dermatologist" },
      { name: "Physiotherapist" },
      { name: "Mental health therapist" },
      { name: "Speech therapist" },
      { name: "Health coach" },
      { name: "Ayurveda specialist" },
      { name: "Homeopathy doctor" }
    ]
  },
  {
    category: "Tutoring & Education",
    image: "https://via.placeholder.com/150?text=Profile",
    professions: [
      { name: "School tutor (all subjects)" },
      { name: "College lecturer (engineering, science, arts, etc.)" },
      { name: "NEET/JEE/UPSC/SSC coach" },
      { name: "Spoken language teacher (English, Hindi, French, etc.)" },
      { name: "Dance instructor (classical, western, hip hop)" },
      { name: "Music teacher (vocal, guitar, piano, tabla)" },
      { name: "Art & craft teacher" },
      { name: "Calligraphy trainer" },
      { name: "Drawing/painting instructor" },
      { name: "Abacus & Vedic Math tutor" },
      { name: "Computer teacher (basic, coding, MS Office)" }
    ]
  },
  {
    category: "Design & Creative",
    image: "https://via.placeholder.com/150?text=Profile",
    professions: [
      { name: "Fashion designer" },
      { name: "Graphic designer" },
      { name: "Interior designer" },
      { name: "Architect" },
      { name: "UI/UX designer" },
      { name: "Logo designer" },
      { name: "Animation & motion graphics expert" },
      { name: "3D modeler" },
      { name: "Embroidery specialist" },
      { name: "Tailor/stitching expert" }
    ]
  },
  {
    category: "Engineering & Technical",
    image: "https://via.placeholder.com/150?text=Profile",
    professions: [
      { name: "Civil engineer (freelance consultant)" },
      { name: "Design engineer (CAD, SolidWorks, AutoCAD)" },
      { name: "Mechanical engineer (repairs, freelance design)" },
      { name: "Electrical engineer (solar panel installer, wiring)" },
      { name: "Structural engineer" },
      { name: "HVAC technician" },
      { name: "CCTV installer" },
      { name: "Drone technician" }
    ]
  },
  {
    category: "IT & Digital Services",
    image: "https://via.placeholder.com/150?text=Profile",
    professions: [
      { name: "Web developer (freelancer)" },
      { name: "Mobile app developer" },
      { name: "Software tester" },
      { name: "SEO expert" },
      { name: "Digital marketing consultant" },
      { name: "Social media manager" },
      { name: "Video editor" },
      { name: "Data analyst" },
      { name: "Cybersecurity consultant" },
      { name: "WordPress expert" }
    ]
  },
  {
    category: "Home & Maintenance",
    image: "https://via.placeholder.com/150?text=Profile",
    professions: [
      { name: "Electrician" },
      { name: "Plumber" },
      { name: "Carpenter" },
      { name: "Painter" },
      { name: "POP ceiling worker" },
      { name: "House cleaning service" },
      { name: "Appliance repair (AC, washing machine, fridge)" },
      { name: "Pest control technician" }
    ]
  },
  {
    category: "Beauty & Personal Care",
    image: "https://via.placeholder.com/150?text=Profile",
    professions: [
      { name: "Beautician" },
      { name: "Hair stylist" },
      { name: "Makeup artist" },
      { name: "Massage therapist" },
      { name: "Mehendi artist" },
      { name: "Nail technician" },
      { name: "Spa therapist" },
      { name: "Bridal stylist" }
    ]
  },
  {
    category: "Fitness & Sports",
    image: "https://via.placeholder.com/150?text=Profile",
    professions: [
      { name: "Personal trainer" },
      { name: "Zumba instructor" },
      { name: "Yoga/meditation coach" },
      { name: "Martial arts instructor" },
      { name: "Swimming coach" },
      { name: "Sports coach (cricket, badminton, etc.)" },
      { name: "Gym trainer" }
    ]
  },
  {
    category: "Event & Media",
    image: "https://via.placeholder.com/150?text=Profile",
    professions: [
      { name: "Event planner" },
      { name: "Decorator" },
      { name: "Photographer" },
      { name: "Videographer" },
      { name: "DJ / sound system" },
      { name: "Emcee / Anchor" },
      { name: "Makeup artist for events" },
      { name: "Wedding planner" }
    ]
  },
  {
    category: "Pet & Animal Care",
    image: "https://via.placeholder.com/150?text=Profile",
    professions: [
      { name: "Pet groomer" },
      { name: "Pet trainer" },
      { name: "Dog walker" },
      { name: "Pet sitter" },
      { name: "Pet boarding" },
      { name: "Veterinary assistant" }
    ]
  },
  {
    category: "Delivery-Based & Homemade",
    image: "https://via.placeholder.com/150?text=Profile",
    professions: [
      { name: "Tiffin service (homemade food)" },
      { name: "Tailor/seamstress" },
      { name: "Embroidery artist" },
      { name: "Homemade candle/pickle/soap seller" },
      { name: "Home bakery (cakes, desserts)" }
    ]
  },
  {
    category: "Repair & Auto",
    image: "https://via.placeholder.com/150?text=Profile",
    professions: [
      { name: "Mobile repair technician" },
      { name: "Laptop/computer repair" },
      { name: "Printer technician" },
      { name: "Electric scooter repair" },
      { name: "Bicycle repair" },
      { name: "Two-wheeler mechanic" },
      { name: "Car mechanic" },
      { name: "Car wash & detailing" }
    ]
  },
  {
    category: "Legal & Financial",
    image: "https://via.placeholder.com/150?text=Profile",
    professions: [
      { name: "Tax consultant" },
      { name: "CA (Chartered Accountant)" },
      { name: "Financial advisor" },
      { name: "Insurance agent" },
      { name: "Legal advisor" },
      { name: "Document writer" }
    ]
  },
  {
    category: "Other Specialists",
    image: "https://via.placeholder.com/150?text=Profile",
    professions: [
      { name: "Career counselor" },
      { name: "Freelance writer/content creator" },
      { name: "Translator" },
      { name: "Data entry specialist" },
      { name: "Resume builder" },
      { name: "Notary/public services" }
    ]
  }
];
const [hasNotification, setHasNotification] = useState(false); 
  return (
    <div  >
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
  {/* Logo */}
  <h1 className="text-2xl font-bold text-purple-700">Smart Serve</h1>

  {/* Search Bar */}
  <div className="flex items-center bg-purple-50 rounded-md px-3 py-2 mx-4 w-100">
    <span className="text-gray-500 text-sm">Search</span>
  </div>
  <div className="relative mx-2">
  <FiBell className="text-xl text-gray-700 cursor-pointer" />
        {hasNotification && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        )}
</div>

  {/* Profile */}
  <h6 className="text-sm text-gray-700">Profile</h6>
</div>


<div>


 

  {categoryData.map((data ,ind)=> (
    <HomeCard  key={ind} category={data.category} image={data.image} professions={data.professions}/>
  ))}


</div>

    </div>
  )
}

export default Home
