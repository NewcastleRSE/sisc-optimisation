import {CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as Highcharts from 'highcharts';
import {MatExpansionPanel} from '@angular/material/expansion';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {HelpTextInfoDialogComponent} from "../help-text-info-dialog/help-text-info-dialog.component";
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-genetic-algorithm-results',
  templateUrl: './genetic-algorithm-results.component.html',
  styleUrls: ['./genetic-algorithm-results.component.css']
})
export class GeneticAlgorithmResultsComponent implements OnInit {
  @Input() queryChoices: any;

  // for testing replace line above with:
  // queryChoices = {sensorNumber: 30, objectives: ['Workers', 'Total Residents', 'Residents under 16', 'Residents over 65'], theta: 100};

  @Output() outputAreasToPlot = new EventEmitter();
  @Output() geneticResultsReady = new EventEmitter();
  @Output() errorHandler = new EventEmitter();
  @Output() toggleNetwork = new EventEmitter();

  savedNetworks: any;

  defaultColour = 'rgb(47,126,216, 0.5)';
  highlightIndividualPointColour = 'rgb(67, 118, 94)';
  selectedGroupColour = 'rgb(98,0,234, 0.8)';
  newPointColour = 'rgb(255,215,0)';
  colors = Highcharts.getOptions().colors;

  chartOptions: Highcharts.Options;

  showGraph = false;

  updateChart = false;

  dataLoaded = false;

  // keep track of the selected point so don't need to iterate over all of them to reset colour
  selectedPointId: number;
  selectedGroupPointsIds: any[] = [];


  // filter networks by a lower threshold for an objective
  filterObjective: string;
  filterThreshold: number;

  lowestCoverage: number;

  message: any;

  Highcharts: typeof Highcharts = Highcharts;
  // @ts-ignore

  outputAreaCoverageLegend = [
    {title: '0-0.2', colour: '#FFFFEB'},
    {title: '0.2-0.4', colour: '#c2d2b0'},
    {title: '0.4-0.6', colour: '#D8F0B6'},
    {title: '0.6-0.8', colour: '#8AC48A'},
    {title: '0.8-1', colour: '#43765E'}
  ];

  successfullyLoadedJson = true;

  objectivesWithIndexes: any[] = [];

  showingNetworkOnMap = false;
  networkToggleState = false;

  // use view child to access expansion panel open and close methods
  @ViewChild('expansionPanel') expansionPanel: MatExpansionPanel;

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
    // only include for testing
    // this.createGraph();

    // set defaults for filtering
    this.filterObjective = 'No';
    this.filterThreshold = 0.3;



  }

  reset() {
    this.filterObjective = 'No';
    this.filterThreshold = 0.3;
    this.objectivesWithIndexes = [];
    this.selectedGroupPointsIds = [];
    this.selectedPointId = undefined;
    this.showingNetworkOnMap = false;
this.networkToggleState = false;
    // if (Highcharts.charts[0]) {
    //   while (Highcharts.charts[0].series.length) {
    //     Highcharts.charts[0].series[0].remove(false);
    //   }
    // }

  }


  // function triggered my parent map component when user submits query
  createGraph(choices: any) {
    this.successfullyLoadedJson = true;
    this.queryChoices = choices;

    this.reset();

    // try to load json, any problems, do not proceed
    this.getData().then((successful) => {
      if (successful) {
        this.updateChartOptions();
        this.openExpansionPanel();
        // let parent know to display
        this.geneticResultsReady.emit(true);
      }

    });




  }

  // help dialog
  openInfo(topic: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '450px';
    dialogConfig.data = {
      topic
    };

    const dialogRef = this.matDialog.open(HelpTextInfoDialogComponent, dialogConfig);
  }

  sendError(error: unknown) {
    this.errorHandler.emit('Cannot plot networks due to error: ' + error);
  }

  async getData() {
    // generate filename from query choices
    try {
     const filename = this.generateFilenameFromQuery();
      await import('../../assets/networks/' + filename).then(data => {
        // read in data and create categories needed for chart
this.savedNetworks = data;
        // assign each chosen objective an index as per the returned network json
        const objectivesFromAlgorithm = data.objectives;
        this.queryChoices.objectives.forEach((chosenObj: any) => {
          const indexFromJSON = this.caseInsensitiveFindIndex(objectivesFromAlgorithm, chosenObj);
          this.objectivesWithIndexes.push({text: chosenObj, objectiveIndex: indexFromJSON});
        });
      });
      return true;
    }
    catch (error) {
      this.successfullyLoadedJson = false;
      console.log('Cannot plot networks due to error: ' + error);
      this.sendError(error);
      return false;
    }





  }

  generateFilenameFromQuery() {
    // convert LA shorthand to longhand
    let la;
    if (this.queryChoices.localAuthority === 'ncl') {
      la = 'Newcastle';
    } else {
      la = 'Gateshead';
    }

    return la + '/theta_' + this.queryChoices.theta + '_nsensors_' +
      this.queryChoices.sensorNumber + '.json';

  }

  caseInsensitiveFindIndex(arr: any[], q: string) {
    // convert to format used in json to allow comparison
    if (q === 'Total Residents') {
      q = 'pop_total';
    } else if (q === 'Residents under 16') {
      q = 'pop_children';
    } else if (q === 'Residents over 65') {
      q = 'pop_elderly';
    } else {
      q = 'workplace';
    }
    return arr.findIndex((item: any) =>  q === item );
  }


  updateChartOptions() {
    const objectiveList: any[] = [];
    this.objectivesWithIndexes.forEach((obj) => {
      objectiveList.push(obj.text);
    });

    const seriesList = this.createSeriesForChartOptions();
    if (seriesList.length > 0) {
      this.chartOptions = {
        chart: {
          type: 'scatter',
          animation: false
        },

        tooltip: {
          enabled: false
        },

        // colors: this.colors,

        title: {
          text: ''
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: objectiveList
        },
        yAxis: {
          title: {
            text: 'Coverage'
          }
        },
        plotOptions: {
          scatter: {
            showInLegend: false,
            jitter: {
              x: 0.24,
              y: 0
            },
            marker: {
              radius: 2,
              symbol: 'circle'
            }
          },
          series: {
            cursor: 'pointer',
            states: {
              inactive: {
                opacity: 1
              }
            },
            allowPointSelect: true,
            events: {
              click: e => {
                // prevent default highlighting on click
                e.preventDefault();
                // @ts-ignore
                this.highlightPointsInOtherSeries(e.point.network);
              },
              mouseOver: e => {
                // default behaviour is to highlight current point but we want to also hghlight points from
                // other series
                // e.preventDefault();
                // this.highlightPointsInOtherSeries(e.point.network);

              }
            }
          }
        },
        series: seriesList as Highcharts.SeriesXrangeOptions[]
      };

      this.updateChart = true;

      this.showGraph = true;

    }
  }

  // todo add error handling throughout these methods

  // get list of OA codes for a particular network
  getNetwork(networkIndex: any) {
    return this.convertOAIndicesListToOACodeList(this.getOAIndicesForNetwork(networkIndex), networkIndex);
  }

  // each row in sensors table represents a list of the OA indices for each network. Currently has decimal place (.0) so
  // remove that before returning so can use as index
  getOAIndicesForNetwork(networkIndex: number) {
    const floatingPointList = this.savedNetworks.sensors[networkIndex];
    const integerList: number[] = [];
    floatingPointList.forEach((num: number) => {
      integerList.push(Math.floor(num));
    });
    return integerList;
  }

  // for each OA indices look up full OA code from oa11cd list and coverage
  convertOAIndicesListToOACodeList(oaIndices: any[], networkIndex: number) {
    const oaCodes: { oa11cd: any; oaIndex: any; }[] = [];
    oaIndices.forEach((i: string | number) => {
      // const coverage = this.savedNetworks.oa_coverage[networkIndex][i];
      oaCodes.push({oa11cd: this.savedNetworks.oa11cd[i], oaIndex: i});
    });

    return oaCodes;
  }

  createOACoverageForNetwork(networkIndex: number) {
    const oaCoverage = [];

    // for each output area, get the coverage for the selected network and attach the OA code
    const coverages = this.savedNetworks.oa_coverage[networkIndex];

    // coverage list index corresponds to output area list
    for (let i = 0; i < coverages.length; i++) {
      oaCoverage.push({code: this.savedNetworks.oa11cd[i], coverage: coverages[i] });
    }

    return oaCoverage;
  }



createSeriesForChartOptions() {
    const seriesList = [];
  // keep track of lowest coverage and use this to be minimum for filtering
  let lowestCoverage = 1;


  // there is a series per objective. Each series uses the x coordinate as the objective index (this is what the jitter acts upon)
  for (let i = 0; i < this.objectivesWithIndexes.length; i++) {
    // get data list of y coordinates (i.e. coverage of each network)
    // for each entry (row) in network.coverage, get the nth element (column) to get coverage where n is the objective index.

    const yList: any[] = [];

    this.savedNetworks.obj_coverage.forEach((row: { [x: string]: number; }) => {
      yList.push(row[this.objectivesWithIndexes[i].objectiveIndex]);
      if (row[this.objectivesWithIndexes[i].objectiveIndex] < lowestCoverage) {
        lowestCoverage = row[this.objectivesWithIndexes[i].objectiveIndex];
      }
    });

    const data = [];

    // keep track of the coverage index (i.e. network) so know which points match up between series
    for (let j = 0; j < yList.length; j++) {

      data.push({x: i, y: yList[j], network: j});

    }

    // // remove any entries where y is below the user's chosen lower acceptable coverage
    // // iterate backwards so can remove item from array as iterating over it
    // for (let index = data.length - 1; index >= 0; index--) {
    //   if (data[index].y < this.queryChoices.acceptableCoverage) {
    //     // coverage is too low
    //     console.log(data[index].y);
    //     data.splice(data.indexOf(data[index]), 1);
    //
    //   }
    // }

    seriesList.push({
      type: 'scatter',
      name: this.objectivesWithIndexes[i].text,
      data,
      color: this.defaultColour
    });

    // keep track of which objective is displayed in what order
    this.objectivesWithIndexes[i].xAxisPosition = i;
  }

  // set filtering to start at lowest coverage
  this.filterThreshold = Math.floor(lowestCoverage);
  this.lowestCoverage = lowestCoverage;

  return seriesList;
}


  highlightPointsInOtherSeries(networkId: string | number) {
    let resetColour = this.defaultColour;
    if (this.selectedGroupPointsIds.indexOf(networkId as number) !== -1) {
      // point is in group so should be purple
      resetColour = this.selectedGroupColour;
    }
    // for each series
    for (let i = 0; i <  this.Highcharts.charts[0].series.length; i++) {
      // clear currently selected points or change to purple if in highlighted group
      if (this.selectedPointId  !== undefined) {
        this.Highcharts.charts[0].series[i].data[this.selectedPointId as number].update({
          marker: {
            fillColor: resetColour,
            radius: 2,
            symbol: 'circle'
          }
        }, false);
      }
      // highlight new selection
      this.Highcharts.charts[0].series[i].data[networkId as number].setState('select');
      this.Highcharts.charts[0].series[i].data[networkId as number].update({
        marker: {
          fillColor: this.highlightIndividualPointColour,
          lineColor: this.highlightIndividualPointColour,
          radius: 6,
          symbol: 'triangle'
        }
      }, false);
    }
    this.Highcharts.charts[0].redraw();
    // update current selected point
    this.selectedPointId = networkId as number;
  }  

  getSeriesIndexOfSeries(objective: string) {
    let position = 0;
    for (let i = 0; i < this.objectivesWithIndexes.length; i++) {
      if (this.objectivesWithIndexes[i].text === objective) {
       position = this.objectivesWithIndexes[i].xAxisPosition;
       break;
      }
    }
    return position;
  }



  // select a lower number for a particular series and highlight all above this number across all series
  selectGroupPoints() {
 const start = performance.now()
    // reset all points
    this.clearGroup();


    if (this.filterObjective !== 'No') {


      // get x axis position of the series belonging to the selected objective
      const seriesSelected = this.getSeriesIndexOfSeries(this.filterObjective);

      // get IDS of all placements above the lower point in selected scenario and change colour of points
      // across all series. Leave highlight on selected point as it is.
      const selectedSeriesIDS: any[] = [];
      this.Highcharts.charts[0].series[seriesSelected].data.forEach((point) => {
        // @ts-ignore
        if (point.network !== this.selectedPointId && point.y >= this.filterThreshold) {
          // @ts-ignore
          selectedSeriesIDS.push(point.network);
          for (let i = 0; i < this.Highcharts.charts[0].series.length; i++) {
            // @ts-ignore
            this.Highcharts.charts[0].series[i].data[point.network].update({
              marker: {
                fillColor: this.selectedGroupColour
              }
            }, false );

          }

        }
      });

      this.Highcharts.charts[0].redraw();
      this.selectedGroupPointsIds = selectedSeriesIDS;
    }

  }

  clearGroup() {
    // reset all points, leaving any selected point red
    this.selectedGroupPointsIds.forEach((id) => {

      // leave selected point
      if (id !== this.selectedPointId) {
        // for each of the  series
        for (let i = 0; i < this.Highcharts.charts[0].series.length; i++) {
          this.Highcharts.charts[0].series[i].data[id].update({
            marker: {
              fillColor: this.defaultColour
            }
          }, false);
        }
      }

    });
  this.Highcharts.charts[0].redraw();
    this.selectedGroupPointsIds = [];
  }

  getTestData(x: any) {
    let data = [],
      off = 0.2 + 0.2 * Math.random(),
      i;
    for (i = 0; i < 50; i++) {
      data.push({x, y: off + (Math.random() - 0.5) * (Math.random() - 0.5), id: i});
    }

    return data;
  }

  roundDown(num: number) {
    return Math.floor(num);
  }

  viewNetworkOnMap() {
        try {
          // @ts-ignore
          const outputAreas = this.getNetwork(this.selectedPointId);
          const coverage = this.createOACoverageForNetwork(this.selectedPointId);
          this.showingNetworkOnMap = true;
          this.networkToggleState = true;
          // send output areas and coverage values to map component to plot
          this.outputAreasToPlot.emit({
            theta: this.queryChoices.theta,
            outputAreas,
            coverage,
            localAuthority: this.queryChoices.localAuthority
          });

        } catch {
// todo
      console.log('problem generating network to view')
    }

  }

  toggleNetworkFromMap($event: { checked: any; }) {
    // emit message to parent map component to show or hide network sensors and coverage
    console.log('toggle network');

    if (this.networkToggleState) {
      this.toggleNetwork.emit('hide');
    } else {
      this.toggleNetwork.emit('show');
    }
    this.networkToggleState = $event.checked;
  }


  closeExpansionPanel() {
    this.expansionPanel.close();
  }

  openExpansionPanel() {
    this.expansionPanel.open();
  }

  addPointToChart(coverages: { [x: string]: any; }, numberSensors: number) {


    // triggered when user creates a new network
    // for each series assign correct value from coverages
    for (let i = 0; i < this.Highcharts.charts[0].series.length; i++) {
      // remove any previous custom networks
      // standard is 200 so anything over that is custom
      if (this.Highcharts.charts[0].series[i].data.length > 200) {
        console.log('remove previous network')
        const finalIndex = this.Highcharts.charts[0].series[i].data.length - 1;
        this.Highcharts.charts[0].series[i].data[finalIndex].remove();
      }


      console.log('add point to series')
      console.log(this.Highcharts.charts[0].series[i])
      // @ts-ignore
      let q = this.Highcharts.charts[0].series[i].name;
      // get which objective series represents
      if (q === 'Total Residents') {
        q = 'pop_total';
      } else if (q === 'Residents under 16') {
        q = 'pop_children';
      } else if (q === 'Residents over 65') {
        q = 'pop_elderly';
      } else {
        q = 'workplace';
      }

      // get new coverage value
      const coverage = coverages[q];
      console.log('new coverage ' + coverage + q)
      // add point and redraw so we can change the colour
      console.log(this.Highcharts.charts[0].series[i].data.length)
      this.Highcharts.charts[0].series[i].addPoint([i, coverage], true);
      // get index of new point

      const newIndex = this.Highcharts.charts[0].series[i].data.length - 1;
      console.log('new index')
      console.log(newIndex)
      this.Highcharts.charts[0].series[i].data[newIndex].update({
        marker: {
          fillColor: this.newPointColour,
          radius: 4,
          symbol: 'diamond'
        }
      }, false);
    }
    // name: this.objectivesWithIndexes[i].text,

    // redraw chart
    this.Highcharts.charts[0].redraw();

    // todo add message to
  }

  removePointFromChart(index: any) {

  }

}
