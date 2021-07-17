function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });

  
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var metadata = data.metadata;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    
    
    var samples = data.samples.filter(samples => samples.id == sample);
    console.log("samples");
    console.log(samples);

    var otu_ids = samples[0].otu_ids;//.map(i => "UTC-" + i); //;
    var otu_labels = samples[0].otu_labels;
    var sample_values = samples[0].sample_values;

    var otu_ids10 = samples[0].otu_ids.slice(0,10).map(i => "UTC-" + i);
    var otu_labels10 = samples[0].otu_labels.slice(0,10);
    var sample_values10 = samples[0].sample_values.slice(0,10);
 
    var wfreq = result.wfreq;

    console.log("samples");
    console.log(samples);

    //var otu_ids = samples[0].otu_ids; //;
    //var otu_labels = samples[0].otu_labels;
    //var sample_values = samples[0].sample_values;

    //var otu_ids = otu_ids//.sort((a,b) => a-b).reverse().map(i => i);
    
    //var sample_values = sample_values.sort((a,b) => a-b).reverse().map(i => i)
    //var otu_labels = sortArrays([sample_values, otu_labels]);
    //var otu_ids = sortArrays([sample_values, otu_ids]);
    
    //var otu_labelsBubble = sortArrays([otu_ids, otu_labels]);
    //var sample_valuesBubble = sortArrays([otu_ids, sample_values]);
    
  

    //var otu_labels = otu_labels.sort((a,b) => a.index - b.index).map((otu_labels, index, array) => otu_labels.index);
    //var otu_ids = otu_ids.sort((a,b) => a.index - b.index).map((otu_ids, index, array) => otu_ids.index);
    //var sample_values = sample_values.sort((a,b) => a.index - b.index).map((sample_values, index, array) => sample_values.index);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    //  var otu_ids10 = otu_ids10;//.sort((a,b) => a-b).reverse().map(i => i)
    
    //  var otu_labels10 = otu_labelsBar[1];
    //  var sample_values10 = sample_valuesBar[1];

    console.log("otu_ids");
    console.log(otu_ids);
    console.log("otu_labels");
    console.log(otu_labels);
    console.log("sample_values");
    console.log(sample_values);

    console.log("otu_ids10");
    console.log(otu_ids10);
    console.log("otu_labels10");
    console.log(otu_labels10);
    console.log("sample_values10");
    console.log(sample_values10);


    var yticks = {
      x: sample_values10,
      y: otu_ids10,
      hovertext: otu_labels10,
      type: "bar",
      orientation: "h",
      sort: sample_values10.reverse(),
      sort: otu_labels10.reverse(),
      sort: otu_ids10.reverse()
    }

    var yticksbubble = {
      x: otu_ids,
      y: sample_values,
      hovertext : otu_labels,
      type: "scatter",
      color: otu_ids,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values
      }
    }

    var yticksguage =   {
      domain: { x: [0, 1], y: [0, 1] },
      value: wfreq,
      title: { text: "Bellybutton Washing Frequency",
                font: {
                  size: 20
    }
    },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, 10] },
        bar: { color: "darkblue" },
        steps: [
          { range: [0, 2], color: "red" },
          { range: [2, 4], color: "orange" },
          { range: [4, 6], color: "yellow" },
          { range: [6, 8], color: "lightgreen" },
          { range: [8, 10], color: "green" }
        ]
      }
    }

    // 8. Create the trace for the bar chart. 
    var barData = [yticks];
    var gaugeData = [yticksguage];
    var bubbleData = [yticksbubble];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: { title: "Count"},
      yaxis: { title: "Bacteria Cultures" }
    };

    var bubbleLayout = {
      title: "Bacteria Cultures per Sample",
      xaxis: { title: "Count"},
      yaxis: { title: "Bacteria Cultures" }
    };

    var gaugeLayout = { width: 570, height: 550, margin: { t: 0, b: 0 } };

    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar2", barData, barLayout);
    Plotly.newPlot("gauge2", gaugeData, gaugeLayout); 
    Plotly.newPlot("bubble2", bubbleData, bubbleLayout);

    console.log("result12");
    console.log(result);

    if (result.id != 940) {
      jump.scrollIntoView({ behavior: 'smooth'});
    }

  });
};


function sortArrays(arrays, comparator = (a, b) => (a < b) ? -1 : (a > b) ? 1 : 0) {
  let arrayKeys = Object.keys(arrays);
  let sortableArray = Object.values(arrays)[0];
  let indexes = Object.keys(sortableArray);
  let sortedIndexes = indexes.sort((a, b) => comparator(sortableArray[a], sortableArray[b]));

  let sortByIndexes = (array, sortedIndexes) => sortedIndexes.map(sortedIndex => array[sortedIndex]);

  if (Array.isArray(arrays)) {
    return arrayKeys.map(arrayIndex => sortByIndexes(arrays[arrayIndex], sortedIndexes));
  } else {
    let sortedArrays = {};
    arrayKeys.forEach((arrayKey) => {
      sortedArrays[arrayKey] = sortByIndexes(arrays[arrayKey], sortedIndexes);
    });
    return sortedArrays;
  }
}