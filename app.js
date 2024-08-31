// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // get the metadata field
    var metadata = data.metadata;
    // Filter the metadata for the object with the desired sample number
    var result = metadata.find(obj => obj.id == sample);
    // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    panel.html("");
    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => {
      // Append new tags for each key-value pair
      panel.append("p").text(`${key}: ${value}`);
  });
})}
// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Get the samples field
    var samples = data.samples;
    // Filter the samples for the object with the desired sample number
    var result = samples.find(obj => obj.id == sample);
    // Get the otu_ids, otu_labels, and sample_values
    var otuIds = result.otu_ids;
    var otuLabels = result.otu_labels;
    var sampleValues = result.sample_values;
    console.log("OTU IDs:", otuIds);
    console.log("OTU Labels:", otuLabels);
    console.log("Sample Values:", sampleValues);
    // Build a Bubble Chart
    var traceBubble = {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuIds,
        colorscale: 'Earth'
      }
    };
    var dataBubble = [traceBubble];
    var layoutBubble = {
      title: 'Bubble Chart',
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Sample Value' }
    };
    Plotly.newPlot('bubble-chart', dataBubble, layoutBubble);
    // Render the Bubble Chart
    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    var yticks = otuIds.map(id => `OTU ${id}`);
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    var traceBar = {
      x: sampleValues.slice(0, 10).reverse(),
      y: yticks.slice(0, 10).reverse(),
      text: otuLabels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h'
    };
    var dataBar = [traceBar];
    var layoutBar = {
      title: 'Top 10 OTUs',
      xaxis: { title: 'Sample Value' },
      yaxis: { title: 'OTU ID', tickvals: yticks, ticktext: yticks }
    };
    Plotly.newPlot('bar-chart', dataBar, layoutBar);
    // Render the Bar Chart
  })};
// Initialize the dashboard with the first sample
d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
  var firstSample = data.samples[0].id;
  buildCharts(firstSample);
});
// Function to handle the dropdown change
function optionChanged(newSample) {
  buildCharts(newSample);
}





// Initialize the dashboard with the first sample
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Populate the dropdown with sample names
    let dropdownMenu = d3.select("#selDataset");
    data.names.forEach((sample) => {
      dropdownMenu.append("option")
        .text(sample)
        .property("value", sample);
    });

    // Build charts and metadata with the first sample
    let firstSample = dropdownMenu.property("value");
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function to handle the dropdown change
function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
