const Product = require("../models/product");

const getAllProducts = async(req,res)=>{
    const {company} = req.query;
    const querryObject = {};

    if(company){
        querryObject.company = company;
    }
    const myData = await Product.find(querryObject);
    res.status(200).json({ myData });
};

const getAllProductsTesting = async(req,res)=>{
    const {company, name, sort} = req.query;
    const querryObject = {};

    if(company){
        querryObject.company = company;
    }

    if(name){
        querryObject.name= { $regex: name, $options: "i"};
    }

    let apiData= Product.find(querryObject);

    if(sort){
        let sortfix = sort.replace(",", " ");
        apiData = apiData.sort(sortfix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;

    let skip = (page -1 ) * limit;

    apiData = apiData.skip(skip).limit(limit);

    const myData = await apiData;
    res.status(200).json({ myData });
};

module.exports = {
    getAllProducts,
    getAllProductsTesting,
  };