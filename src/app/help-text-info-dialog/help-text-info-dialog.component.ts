import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-data-layer-info-dialog',
  templateUrl: './help-text-info-dialog.component.html',
  styleUrls: ['./help-text-info-dialog.component.css']
})
export class HelpTextInfoDialogComponent implements OnInit {
text;

  constructor(private dialogRef: MatDialogRef<HelpTextInfoDialogComponent>,
                @Inject(MAT_DIALOG_DATA) data: any) {
    switch (data.topic) {
      // data layers
      case 'dis': {
        this.text = '<h3>Disability</h3><p>Density of people reporting a disability that limits their daily activities a little or a lot.</p>' +
          '<p>Density is calculated as the percentage of people in the output area (pOA) out of all reporting from the whole Local Authority (pLA), per km<span class="sup">2</span></p>';
        break;
      }
      case 'imd': {
       this.text = '<h3>Index of Multiple Deprivation</h3><p>Index of Multiple Deprivation is a measure of relative levels of deprivation across households grouped into Lower-layer Super Output Areas. It ' +
         'is not available at an Output Area level of granularity. Areas are grouped into bands from 1 (most deprived) to 10 (least deprived).</p>';
       break;
      }
      case 'space': {
        this.text = "<h3><a target='_blank' href='https://www.mdpi.com/2071-1050/13/6/3394'>Space Syntax</a></h3><p>Space syntax is used here as a way of modelling patterns of movement through a city informed by its spatial layout and cognitive behaviour of humans in the space. The street network is abstracted as a justified graph, where streets are represented as nodes, and the topographic relationships between them analysed" +
          "<p><a target='_blank' href='https://www.spacesyntax.online/term/to-movement/'>'To movement'</a> refers to the likelihood of people moving to a location from all others. This is used as a proxy for areas where people can potentially congregate. </p>" +
          "<p><a target='_blank' href='https://www.spacesyntax.online/term/through-movement/'>'Through movement'</a> refers to the likelihood of people passing through a location. It represents people using the shortest routes from all locations in the area to all other locations. This is used as a proxy for traffic and congestion - since the most commonly used routes are the ones that are most likely to be congested.</p>";
        break;
      }
      case 'uo': {
        this.text = "<h3>Urban Observatory sensors</h3><p><a href='https://urbanobservatory.ac.uk'/a>Newcastle Urban Observatory</a> gathers data sensors around the city including air quality and makes it available" +
          " in real time. Included on this map are their Nitrogen Dioxide and " +
          "PM10 and PM25 particle sensors.</p>";
        break;
      }
      case 'oa': {
        this.text = "<h3>Output Areas</h3><p><a href='https://www.ons.gov.uk/methodology/geography/ukgeographies/censusgeography'/a>Output Areas </a>are geographical groupings of households. They have a minimum of 40 households and 100 people and a recommended size of 125 households." +
          "Output Areas were first introduced into England after the 2001 census with some modification after the 2011 census.</p><p> They were created to, as much as possible, contain similar households" +
          "in terms of rural or urban areas, property tenure and property type. They also tend to follow significant features such as motorways. " +
          "They are useful here as they are the smallest grouping data is widely available for.";
        break;
      }
      case 'age': {
        this.text = "<h3>Ages, residence and workplace</h3><p>This data is taken from the 2011 census and is available <a href='https://www.nomisweb.co.uk/census/2011'>here</a>. Population refers to locations respondents reported living and workplace refers to the address of their reported workplace. </p>" +
          "<p>Density is calculated as the percentage of people in the output area out of all reporting from the whole Local Authority, per km<span class=\"sup\">2</span></p>";
        break;
      }
      case 'schools': {
        this.text = "<h3>Schools</h3><p>Schools locations have been taken from <a href='https://www.compare-school-performance.service.gov.uk/download-data'>government published data. For clarity, primary, first and middle schools are grouped, and high, secondary and post 16 schools and colleges are also grouped. </a></p>";
        break;
      }
      case 'eth': {
        this.text = "<h3>Ethnicity</h3><p>This data is taken from the 2011 census and is available <a href='https://www.nomisweb.co.uk/census/2011'>here</a>. On this site it is possible to view subcategories within those listed here.</p>" +
          "<p>Density is calculated as the percentage of people belonging to a particular ethnic group in the output area out of all people reporting that ethnicity from the whole Local Authority, per km<span class=\"sup\">2</span></p>";
        break;
      }
      // genetic objective config info
      case 'objectiveChoice': {
        this.text = "<p>Select one or more objectives to consider in the sensor network generation. An objective is a population group or " +
          "risk that you would like the sensor network to monitor. For example, you might want to prioritise over 65 year olds and people’s " +
          "place of residence when deciding where to place sensors.</p>";
        break;
      }
      case 'thetaChoice': {
        this.text = "<p>Determine the distance in metres that the citizen/satisfaction coverage of  a sensor is considered to decay. " +
          "Anything within this distance is considered to be ‘covered’ by a sensor within the algorithm. When the network is generated, " +
          "the objectives you have prioritised are evaluated using the distance you have specified here. Note that  this is different " +
          "from the area a single sensor (spatial coverage) can measure air quality and instead is related to perceived coverage by citizens. </p>";
        break;
      }
      case 'optimisationQuery': {
        this.text = "<p>The tool uses a genetic algorithm to generate a range of possible sensor networks. You can select criteria for the " +
          "network generation here. </p>";
        break;
      }
      case 'networkResults': {
        this.text = "<p> Running the algorithm results in 200 possible networks, each with better or worse coverage for " +
          "the objectives you have selected. Each network is plotted once for each of your objectives here. If you " +
          "click on a point on the scatter graph (a network), you can view how it fares for each objective. Coverage " +
          "is the proportion of population considered covered by the network of sensors. You can choose a minimum acceptable coverage for " +
          "one of the objectives to highlight networks that meet this requirement.</p>";
        break;
      }
      default: {
        this.text =  'No data information is currently available.';
        break;
      }
    }

  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
