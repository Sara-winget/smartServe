import axios from 'axios';

import categoryData from './proffesion';


const uploadProfessionData = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/proffesion/upload', categoryData);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};



function Proffesiondetail() {
  return (
    <div>
      <h2>Upload Profession Categories</h2>
      <button onClick={uploadProfessionData}>
        Upload Profession Data
      </button>
    </div>
  )
}

export default Proffesiondetail
