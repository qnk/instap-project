const MeasuresController = {
    all: (measures, date) => { return measures.find(temperature => temperature.date === date) }
}

module.exports = MeasuresController;