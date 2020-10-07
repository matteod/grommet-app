import React, {Component} from 'react';
import {LineChart} from "grommet-controls/chartjs";
import axios from "axios";
import Moment from "moment";
import Numeral from "numeral";
import {BounceLoader, ClipLoader} from "react-spinners";
import {Box} from "grommet";

class Mychart extends Component {

    constructor() {
        super();
        /*this.state = {
            isLoaded: false,
            labels: [],
            datasets: [
                {
                    lineTension: 0.3,
                    backgroundColor: 'rgba(11,21,21,0.4)',
                    borderColor: 'brand',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.7,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'brand',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'brand',
                    pointHoverBorderColor: 'brand',
                    pointHoverBorderWidth: 2,
                    pointRadius: 5,
                    pointHitRadius: 10,
                    label: 'Andamento prezzo',
                    fill: false,
                    showLines: false,
                    data: []
                }
            ]
        };*/
        this.state = {
            Data: {},
            loading: true
        };
        this.stepSize = 30;
    }

    saveStateToLocalStorage = () => {
        localStorage.setItem('chartState', JSON.stringify(this.state));
    };

    restoreStateFromLocalStorage = () => {
        const state = JSON.parse(localStorage.getItem('chartState'));
        this.setState(state);
    };

    // This is called when an instance of a component is being created and inserted into the DOM.
    async componentDidMount () {
        if (!navigator.onLine) {
            this.restoreStateFromLocalStorage();
        }
        let apiUrl = process.env.REACT_APP_API_URL;
        axios.get(apiUrl + 'graph_data')
            .then(response => {
                var tmpLabels = [];
                var tmpDataSetsData = [];
                Object.keys(response.data).forEach(function(k){
                    tmpLabels.push(Moment(response.data[k]['date']).format("DD-MM-YYYY"));
                    tmpDataSetsData.push(parseFloat(Numeral(response.data[k]['value']).format('0[.]')));
                });
                this.setState({
                    Data: {
                        labels: tmpLabels,
                        datasets: [
                            {   lineTension: 0.4,
                                backgroundColor: 'rgba(11,21,21,0.4)',
                                borderColor: 'brand',
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.7,
                                borderJoinStyle: 'miter',
                                pointBorderColor: 'brand',
                                pointBackgroundColor: '#fff',
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: 'brand',
                                pointHoverBorderColor: 'brand',
                                pointHoverBorderWidth: 2,
                                pointRadius: 5,
                                pointHitRadius: 10,
                                label: 'Andamento prezzo',
                                fill: false,
                                showLines: false,
                                data: tmpDataSetsData
                            }
                        ]
                    },
                    loading: false
                }, this.saveStateToLocalStorage );
                //this.setState({ labels: tmpLabels });
                //this.setState({ datasets: { ...this.state.datasets[0], data: sampledata} });
                /*this.setState({
                    isLoaded: true
                })*/
            })
            // Catch any error here
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        if (this.state.loading)
            return (
                <Box className="sweet-loading"
                     align="center"
                     pad={{ horizontal: "medium", vertical: "medium" }}
                     margin={{ horizontal: "medium", top: "medium" }}
                >
                    <BounceLoader
                        size={150}
                        color={"rgba(206,44,61,0.75)"}
                        loading={this.state.loading}
                    />
                </Box>
            )
        return (
            <LineChart id="my-chart"
                       data={this.state.Data}
                       stepSize={this.stepSize}
                       options={{
                           responsive: true,
                           maintainAspectRatio: false,
                           layout: {
                               padding: {
                                   top: 5,
                                   left: 15,
                                   right: 15,
                                   bottom: 15
                               }
                           },
                           legend: {
                               display: false
                           },
                           scales: {
                               xAxes: [{
                                   ticks: {display: true},
                                   gridLines: {
                                       display: true,
                                   }
                               }],
                               yAxes: [{
                                   gridLines: {
                                       display: true
                                   },
                                   ticks: {
                                       precision : 0,
                                       stepSize: this.stepSize,
                                       maxTicksLimit: this.getTicksLimit(Math.min.apply(this, this.state.Data.datasets[0].data), Math.max.apply(this, this.state.Data.datasets[0].data), this.stepSize),
                                       min: this.getMin(Math.min.apply(this, this.state.Data.datasets[0].data), Math.max.apply(this, this.state.Data.datasets[0].data), this.stepSize),
                                       max: this.getMax(Math.min.apply(this, this.state.Data.datasets[0].data), Math.max.apply(this, this.state.Data.datasets[0].data), this.stepSize)

                                   }

                               }]
                           }
                       }}
            />

        )

    }
    getMax(min, max, stepSize) {
        let range = max - min;
        let stepNumber =  (range - range % stepSize) / stepSize;
        let margin = range % stepSize;
        return max + stepSize/2;
    }

    getMin(min, max, stepSize) {
        let range = max - min;
        let stepNumber =  (range - range % stepSize) / stepSize;
        let margin = range % stepSize;
        return min - margin - stepSize;
    }

    getTicksLimit(min, max, stepSize) {
        let range = max - min;
        let stepNumber =  (range - range % stepSize) / stepSize;
        return stepNumber + 3;
    }
}

export default Mychart;