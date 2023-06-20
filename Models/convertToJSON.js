const fs = require("fs");
const path = require("path");

const { parse } = require("csv-parse");

const planetsCollection = require("../db").collection("exoPlanets");

const loadPlanets = () => {
  let count = 0;
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "uploads", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (count <= 30) {
          const filteredPlanetsField = {
            kepid: data.kepid,
            kepoi_name: data.kepoi_name,
            keplerName: data.keplerName,
            koi_disposition: data.koi_disposition,
            koi_pdisposition: data.koi_pdisposition,
            koi_score: data.koi_score,
          };
          count++;
          console.log(filteredPlanetsField);
          await planetsCollection.insertOne(filteredPlanetsField);
        }
      })
      .on("error", async (err) => {
        console.log("An error obtained");
        reject(err);
      })
      .on("end", async () => {
        console.log("All data is updated");
        resolve();
      });
  });
};

module.exports = {
  loadPlanets,
};
