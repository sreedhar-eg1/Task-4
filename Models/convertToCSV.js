const ExelJS = require("exceljs");

const planetsCollection = require("../db").collection("exoPlanets");

const convertToCSV = async () => {
  try {
    const exoPlanets = await planetsCollection
      .find(
        {},
        {
          projection: {
            _id: 0,
          },
        }
      )
      .toArray();
    // console.log(exoPlanets);
    const workbook = new ExelJS.Workbook();
    const worksheet = workbook.addWorksheet("Planets");
    worksheet.columns = [
      { header: "kepid", key: "kepid", width: 15 },
      { header: "kepoi_name", key: "kepoi_name", width: 20 },
      { header: "keplerName", key: "keplerName", width: 25 },
      { header: "koi_disposition", key: "koi_disposition", width: 30 },
      { header: "koi_pdisposition:", key: "koi_pdisposition:", width: 30 },
      { header: "koi_score:", key: "koi_score:", width: 20 },
    ];
    
    exoPlanets.forEach((planet) => {
        worksheet.addRow(planet)
    })

    worksheet.getRow(0).eachCell((cell) => {
        cell.font = {
            bold: true
        }
    })

    await workbook.csv.writeFile('planetsCSV.csv')
    await workbook.xlsx.writeFile('planetsXLSX.xlsx')
    console.log('Success');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  convertToCSV,
};
