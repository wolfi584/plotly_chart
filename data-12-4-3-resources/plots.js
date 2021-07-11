function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
})}

init();

function optionChanged(newSample) {
  console.log(newSample);
}

function optionChanged(newSample) {
  buildMetadata(newSample);
  //buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");


    PANEL.html("")
    PANEL.append().text("Id: ");
    PANEL.append().text(result.id);
    PANEL.append("BR")
    PANEL.append().text("Ethnicity: ")
    PANEL.append().text(result.ethnicity);
    PANEL.append("BR")
    PANEL.append().text("Gender: ")
    PANEL.append().text(result.gender);
    PANEL.append("BR")
    PANEL.append().text("Age: ")
    PANEL.append().text(result.age);
    PANEL.append("BR")
    PANEL.append().text("Location: ")
    PANEL.append().text(result.location);
    PANEL.append("BR")
    PANEL.append().text("Bbtype: ")
    PANEL.append().text(result.bbtype);
    PANEL.append("BR")
    PANEL.append().text("Wfreq: ")
    PANEL.append().text(result.wfreq);

    console.log(resultArray[0]);
  });
}