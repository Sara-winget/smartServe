import React from 'react';

function Profile({ provider }) {
  return (
    <div className="border p-4 rounded shadow mb-3 bg-white">
      <h1 className="text-lg font-bold text-purple-800">{provider.name}</h1>
      <img src={provider.image || 'https://via.placeholder.com/100'} alt={provider.name} className="w-24 h-24 object-cover rounded-full" />
      <p className="text-gray-600">{provider.profession}</p>
      <p className="text-gray-500">{provider.location}</p>
      <p className="text-yellow-600">⭐ {provider.rating}</p>
    </div>
  );
}

export default Profile;
