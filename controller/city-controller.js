const City = require("../models/city-model");

  const CityData = [
        {
          "_id": "city_phnompenh",
          "country": "Cambodia",
          "name": "Phnom Penh",
          "state": "Phnom Penh"
        },
        {
          "_id": "city_siemreap",
          "country": "Cambodia",
          "name": "Siem Reap",
          "state": "Siem Reap"
        },
        {
          "_id": "city_battambang",
          "country": "Cambodia",
          "name": "Battambang",
          "state": "Battambang"
        },
        {
          "_id": "city_sihanoukville",
          "country": "Cambodia",
          "name": "Sihanoukville",
          "state": "Sihanoukville"
        },
        {
          "_id": "city_kampongcham",
          "country": "Cambodia",
          "name": "Kampong Cham",
          "state": "Kampong Cham"
        },
        {
          "_id": "city_takhmau",
          "country": "Cambodia",
          "name": "Ta Khmau",
          "state": "Kandal"
        },
        {
          "_id": "city_pursat",
          "country": "Cambodia",
          "name": "Pursat",
          "state": "Pursat"
        },
        {
          "_id": "city_kampongspeu",
          "country": "Cambodia",
          "name": "Kampong Speu",
          "state": "Kampong Speu"
        },
        {
          "_id": "city_takeo",
          "country": "Cambodia",
          "name": "Takeo",
          "state": "Takeo"
        },
        {
          "_id": "city_kohkong",
          "country": "Cambodia",
          "name": "Koh Kong",
          "state": "Koh Kong"
        },
        {
          "_id": "city_kampongthom",
          "country": "Cambodia",
          "name": "Kampong Thom",
          "state": "Kampong Thom"
        },
        {
          "_id": "city_preyveng",
          "country": "Cambodia",
          "name": "Prey Veng",
          "state": "Prey Veng"
        },
        {
          "_id": "city_stungtreng",
          "country": "Cambodia",
          "name": "Stung Treng",
          "state": "Stung Treng"
        },
        {
          "_id": "city_kampongchhnang",
          "country": "Cambodia",
          "name": "Kampong Chhnang",
          "state": "Kampong Chhnang"
        },
        {
          "_id": "city_kratie",
          "country": "Cambodia",
          "name": "Kratié",
          "state": "Kratié"
        },
        {
          "_id": "city_kampot",
          "country": "Cambodia",
          "name": "Kampot",
          "state": "Kampot"
        },
        {
          "_id": "city_preahvihear",
          "country": "Cambodia",
          "name": "Preah Vihear",
          "state": "Preah Vihear"
        },
        {
          "_id": "city_tboungkhmum",
          "country": "Cambodia",
          "name": "Tboung Khmum",
          "state": "Tboung Khmum"
        },
        {
          "_id": "city_pailin",
          "country": "Cambodia",
          "name": "Pailin",
          "state": "Pailin"
        },
        {
          "_id": "city_preahsihanouk",
          "country": "Cambodia",
          "name": "Preah Sihanouk",
          "state": "Preah Sihanouk"
        }
      
];

const CityInsert = async (req, res) => {
  try {
    // Insert cities
    await Promise.all(CityData.map(async (city) => {
      const existingCity = await City.findOne({ _id: city._id });
      if (!existingCity) {
        await City.create(city);
      }
    }));
    res.status(201).json({ message: "Data inserted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error inserting data", error: error.message });
  }
}

const Cityget = async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cities", error: error.message });
  }
}

module.exports = { CityInsert, Cityget };
