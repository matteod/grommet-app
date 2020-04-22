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
    }

    // This is called when an instance of a component is being created and inserted into the DOM.
    async componentDidMount () {
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
                });
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
                                       autoSkip: true,
                                       stepSize: 200,
                                       min: 5400,
                                       max: 6600,
                                   }

                               }]
                           }
                       }}
            />

        )

    }
}

export default Mychart;