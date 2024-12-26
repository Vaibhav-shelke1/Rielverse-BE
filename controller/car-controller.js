const { Brand, Model, Engine,EngineDoor } = require("../models/carbrand-model");

const brandsData = [
  { _id: "brand_hyundai", name: "Hyundai" },
  { _id: "brand_mahindra", name: "Mahindra" },
  { _id: "brand_toyota", name: "Toyota" },
  { _id: "brand_chevrolet", name: "Chevrolet" },
  { _id: "brand_ford", name: "Ford" }
  // Add more brand data as needed
];
const modelsData = [
  { _id: "creta", brand_id: "brand_hyundai", name: "Creta" },
  { _id: "verna", brand_id: "brand_hyundai", name: "Verna" },
  { _id: "thar", brand_id: "brand_mahindra", name: "Thar" },
  // Add more model data as needed
];
const engineData = [
  { _id: "engine1", name: "creta" },
  { _id: "engine2", name: "creta" },
  { _id: "engine3", name: "creta" },
  { _id: "engine4", name: "verna" },
  { _id: "engine5", name: "verna" },
  { _id: "engine6", name: "verna" },
  { _id: "engine7", name: "thar" },
  { _id: "engine8", name: "thar" },
  { _id: "engine9", name: "thar" },
];
const engineDoorData = [
    { _id: "1", door: "1",name: "creta" },
    { _id: "2", door: "2",name: "creta"},
    { _id: "3", door: "3",name: "creta"},
    { _id: "4", door: "4",name: "verna"},
    { _id: "5", door: "5",name: "verna"},
    { _id: "6", door: "6",name: "verna"},
    { _id: "7", door: "7",name: "thar"},
    { _id: "8", door: "8",name: "thar"},
    { _id: "9", door: "9",name: "thar"},
  ];
const carBrandInsert = async (req, res) => {
  try {
    // Insert brands
    await Promise.all(brandsData.map(async (brand) => {
      const existingBrand = await Brand.findOne({ _id: brand._id });
      if (!existingBrand) {
        await Brand.create(brand);
      }
    }));

    // Insert models
    await Promise.all(modelsData.map(async (model) => {
      const existingModel = await Model.findOne({ _id: model._id });
      if (!existingModel) {
        await Model.create(model);
      }
    }));

    // Insert engines
    await Promise.all(engineData.map(async (engine) => {
      const existingEngine = await Engine.findOne({ _id: engine._id });
      if (!existingEngine) {
        await Engine.create(engine);
      }
    }));
     // Insert engines
     await Promise.all(engineDoorData.map(async (engine) => {
        const existingEngine = await EngineDoor.findOne({ _id: engine._id });
        if (!existingEngine) {
            await EngineDoor.create(engine);
        }
    }));
    res.status(201).json({ message: "Data inserted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error inserting data", error: error.message });
  }
}
const carBrand = async (req, res) => {
    try {
         // Set CORS headers
         res.setHeader('Access-Control-Allow-Origin', '*');
         res.setHeader('Access-Control-Allow-Methods', 'GET');
         res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
 
        const brands = await Brand.find();
        res.status(200).json(brands);
      } catch (error) {
        res.status(500).json({ message: "Error fetching brands", error: error.message });
      }
}
const carBrandWiseModel = async (req, res) => {
    const { id } = req.params;
    try {
         // Set CORS headers
         res.setHeader('Access-Control-Allow-Origin', '*');
         res.setHeader('Access-Control-Allow-Methods', 'GET');
         res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
 
        const models = await Model.find({ brand_id: id });
        res.status(200).json(models);
    } catch (error) {
        res.status(500).json({ message: "Error fetching models by brand ID", error: error.message });
    }
}
const carModelWiseEngine = async (req, res) => {
    const { name } = req.params;
    try {
         // Set CORS headers
         res.setHeader('Access-Control-Allow-Origin', '*');
         res.setHeader('Access-Control-Allow-Methods', 'GET');
         res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
 
        const models = await Engine.find({ name: name });
        res.status(200).json(models);
    } catch (error) {
        res.status(500).json({ message: "Error fetching models by brand ID", error: error.message });
    }
}
const carModelWiseDoor = async (req, res) => {
    const { name } = req.params;
    try {
         // Set CORS headers
         res.setHeader('Access-Control-Allow-Origin', '*');
         res.setHeader('Access-Control-Allow-Methods', 'GET');
         res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
 
        const models = await EngineDoor.find({ name: name });
        res.status(200).json(models);
    } catch (error) {
        res.status(500).json({ message: "Error fetching models by brand ID", error: error.message });
    }
}


module.exports = { carBrandInsert,carBrand,carBrandWiseModel,carModelWiseEngine,carModelWiseDoor};