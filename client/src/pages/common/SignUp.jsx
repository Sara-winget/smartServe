import React, { useState } from 'react';

const categoryData = {
  "Health & Wellness": [
    "Nutritionist", "Dietitian", "Dermatologist", "Physiotherapist",
    "Mental health therapist", "Speech therapist", "Health coach",
    "Ayurveda specialist", "Homeopathy doctor"
  ],
  "Tutoring & Education": [
    "School tutor (all subjects)", "College lecturer (engineering, science, arts, etc.)",
    "NEET/JEE/UPSC/SSC coach", "Spoken language teacher (English, Hindi, French, etc.)",
    "Dance instructor (classical, western, hip hop)", "Music teacher (vocal, guitar, piano, tabla)",
    "Art & craft teacher", "Calligraphy trainer", "Drawing/painting instructor",
    "Abacus & Vedic Math tutor", "Computer teacher (basic, coding, MS Office)"
  ],
  "Design & Creative": [
    "Fashion designer", "Graphic designer", "Interior designer", "Architect", "UI/UX designer",
    "Logo designer", "Animation & motion graphics expert", "3D modeler", "Embroidery specialist",
    "Tailor/stitching expert"
  ],
  "Engineering & Technical": [
    "Civil engineer (freelance consultant)", "Design engineer (CAD, SolidWorks, AutoCAD)",
    "Mechanical engineer (repairs, freelance design)", "Electrical engineer (solar panel installer, wiring)",
    "Structural engineer", "HVAC technician", "CCTV installer", "Drone technician"
  ],
  "IT & Digital Services": [
    "Web developer (freelancer)", "Mobile app developer", "Software tester", "SEO expert",
    "Digital marketing consultant", "Social media manager", "Video editor", "Data analyst",
    "Cybersecurity consultant", "WordPress expert"
  ],
  "Home & Maintenance": [
    "Electrician", "Plumber", "Carpenter", "Painter", "POP ceiling worker",
    "House cleaning service", "Appliance repair (AC, washing machine, fridge)", "Pest control technician"
  ],
  "Beauty & Personal Care": [
    "Beautician", "Hair stylist", "Makeup artist", "Massage therapist", "Mehendi artist",
    "Nail technician", "Spa therapist", "Bridal stylist"
  ],
  "Fitness & Sports": [
    "Personal trainer", "Zumba instructor", "Yoga/meditation coach", "Martial arts instructor",
    "Swimming coach", "Sports coach (cricket, badminton, etc.)", "Gym trainer"
  ],
  "Event & Media": [
    "Event planner", "Decorator", "Photographer", "Videographer", "DJ / sound system",
    "Emcee / Anchor", "Makeup artist for events", "Wedding planner"
  ],
  "Pet & Animal Care": [
    "Pet groomer", "Pet trainer", "Dog walker", "Pet sitter", "Pet boarding", "Veterinary assistant"
  ],
  "Delivery-Based & Homemade": [
    "Tiffin service (homemade food)", "Tailor/seamstress", "Embroidery artist",
    "Homemade candle/pickle/soap seller", "Home bakery (cakes, desserts)"
  ],
  "Repair & Auto": [
    "Mobile repair technician", "Laptop/computer repair", "Printer technician",
    "Electric scooter repair", "Bicycle repair", "Two-wheeler mechanic", "Car mechanic",
    "Car wash & detailing"
  ],
  "Legal & Financial": [
    "Tax consultant", "CA (Chartered Accountant)", "Financial advisor",
    "Insurance agent", "Legal advisor", "Document writer"
  ],
  "Other Specialists": [
    "Career counselor", "Freelance writer/content creator", "Translator",
    "Data entry specialist", "Resume builder", "Notary/public services"
  ]
};

const SignUp = () => {
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    gender: '',
    category: '',
    profession: '',
    about: '',
    profilePic: null,
    identityProof: null,
    resume: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role) {
      alert('Please choose a role');
      return;
    }

    if (role === 'provider') {
      const required = ['name', 'email', 'phone', 'password', 'gender', 'category', 'profession', 'about', 'profilePic', 'identityProof'];
      const missing = required.find(field => !formData[field]);
      if (missing) {
        alert(`Please fill all required provider fields (${missing})`);
        return;
      }
    }

    console.log('Submitted:', { role, ...formData });
    // Send to backend with FormData if needed
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl"
          required
        >
          <option value="">-- Select Role --</option>
          <option value="user">User</option>
          <option value="provider">Service Provider</option>
        </select>

        {/* Common fields */}
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" required />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" required />

        {/* Provider-only fields */}
        {role === 'provider' && (
          <>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" required>
              <option value="">-- Select Gender --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>

            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" required>
              <option value="">-- Select Category --</option>
              {Object.keys(categoryData).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {formData.category && (
              <select name="profession" value={formData.profession} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" required>
                <option value="">-- Select Profession --</option>
                {categoryData[formData.category].map((prof) => (
                  <option key={prof} value={prof}>{prof}</option>
                ))}
              </select>
            )}

            <textarea
              name="about"
              placeholder="Write about your service..."
              rows={3}
              value={formData.about}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
              required
            ></textarea>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Profile Picture</label>
              <input type="file" name="profilePic" accept="image/*" onChange={handleChange} className="w-full" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Identity Proof (PDF or Image)</label>
              <input type="file" name="identityProof" accept="image/*,application/pdf" onChange={handleChange} className="w-full" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Resume (Optional)</label>
              <input type="file" name="resume" accept="application/pdf" onChange={handleChange} className="w-full" />
            </div>
          </>
        )}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
