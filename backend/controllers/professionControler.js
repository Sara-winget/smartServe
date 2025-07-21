// controllers/professionController.js
import ProfessionCategory from '../models/professionCategory.js';
import Profession from '../models/profession.js';
import User from '../models/user.js';
import ErrorHandler from '../utils/errorhandler.js';
export const uploadProfessionData = async (req, res) => {
  
    const categoryData = req.body;

    for (const [categoryName, professions] of Object.entries(categoryData)) {
      
      let category = await ProfessionCategory.findOne({ name: categoryName });

      if (!category) {
        category = await ProfessionCategory.create({ name: categoryName });
      }
      
      for (const profName of professions) {
        
        const exists = await Profession.findOne({ name: profName, category: category._id });
        if (!exists) {
          await Profession.create({ name: profName, category: category._id });
        }
      }
    }

    res.status(201).json({ message: 'Profession data uploaded successfully!' });
  
};

export const getProfessionData = async (req,res)=>{

    const categories = await ProfessionCategory.find();
    const data=[];
    for(const category of categories){
      const professions= await Profession.find({category:category._id})
      data.push({
        category:category.name,
        professions:professions.map((p)=>({name:p.name}))
      })
    }
    res.status(200).json(data)
  
}

export const getProfessions = async (req, res,next)=>{

  
  const {professionName}= req.params;
  
  const getProfessionals = await Profession.findOne({name: { $regex: `^${professionName}$`, $options: 'i' }})
  if(!getProfessionals){
  return next(new ErrorHandler('professionName not found',404))
  }

  const providers =await User.find({role:'provider', profession:getProfessionals._id}).select('-password -refreshToken -__v');
  
  res.status(200).json(providers)
  }
