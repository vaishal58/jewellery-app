import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(500).send({
        message: "name",
      });
    }
    const ecategory = await categoryModel.findOne({ name });
    if (ecategory) {
      return res.status(200).send({
        message: "category existing",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in category",
    });
  }
};
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "category updated",
      category,
    });
  } catch (error) {
    console.log(eeror);
    res.status(500).send({
      success: false,
      error,
      message: "error while updating category",
    });
  }
};

export const allcategory=async (req,res)=>{
    try{
      const category=await categoryModel.find();
      res.status(200).send({
        success: true,
        
        message: "success",
        category
      });
    }
    catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "error while getting category",
      });
    }
}
export const singlecategorycontroller=async(req,res)=>{
  try{  
  const category=await  categoryModel.findOne({slug:req.params.slug})
  res.status(200).send({
    success: true,
    
    message: "success",
    category
  });
  }

  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while getting category",
    });
  }

}
export const deletecategory=async (req,res)=>{
   try{
     const {id}=req.params
     await categoryModel.findByIdAndDelete(id)
     res.status(200).send({
      success: true,
      
      message: "success",
      
    });
   }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while getting category",
    });
  }
}
