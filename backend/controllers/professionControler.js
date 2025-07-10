// controllers/professionController.js
import ProfessionCategory from '../models/professionCategory.js';
import Profession from '../models/profession.js';

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
