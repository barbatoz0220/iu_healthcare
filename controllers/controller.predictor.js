const Disease = require("../models/Disease");
const Precaution = require("../models/Precaution");

module.exports = {
  async index(req, res) {
    res.render("./components/patientSearch");
  },

  async searchSymptoms(req, res) {
    // Taking in input symptoms
    const inputSymptoms = req.body.symptoms.split(",").map(value => {
      return value.trim();
    });
    var symptomCount = inputSymptoms.length;

    // Input symptom processing to get variable Condition
    var firstSymptom = inputSymptoms.shift();
    var condition = `('${firstSymptom}'`;
    for (symptom of inputSymptoms) {
      condition += `, '${symptom}'`;
    }
    condition += `)`;

    var diseaseResults = await Disease.getBySymptoms(condition, symptomCount);

    if (diseaseResults.errorr) {
      return res.render("./components/patientSearch", {
        errorMessage:
          "Error when looking for diseases with your input. Try again!",
      });
    } else {
      // Query for precautions that come with the result diseases
      var diseaseArray = Object.values(
        JSON.parse(JSON.stringify(diseaseResults))
      );
      for (disease of diseaseArray) {
        // Query and extract precautions info
        var precautionResults = await Precaution.getByDisease(disease);
        var precautions = extractPrecautions(precautionResults);
        // Update a disease to contain all info
        Object.assign(disease, precautions);
      }
      // Return
      return res.render("./components/patientSearch", {
        disease: diseaseArray,
      });
    }
  },
};

function extractPrecautions(precautions) {
  var precautionList = [];
  for (p of precautions) precautionList.push(p.precautionName);
  var precautionObject = {
    precautions: precautionList.join(", ").toString(),
  };
  return precautionObject;
}
