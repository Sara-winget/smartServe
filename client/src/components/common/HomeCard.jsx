import React from 'react';

function HomeCard({ category, image, professions }) {
  console.log(professions);

  return (
    <div className="flex bg-pink-50 shadow-md rounded-2xl p-4 m-4 hover:shadow-lg transition duration-300">
      <div className="w-1/3">
        <img
          src={image}
          alt={category}
          className="w-full h-32 object-cover rounded-xl"
        />
      </div>

      <div className="w-2/3 pl-4 flex flex-col justify-center">
        <h1 className="text-xl font-semibold text-pink-800 mb-2">{category}</h1>
        <div className="flex flex-wrap gap-2">
          {professions.map((data, ind) => (
            <span
              key={ind}
              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm shadow-sm hover:bg-purple-200 transition"
            >
              {data.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
