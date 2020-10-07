import React, {Component} from 'react';
import {Accordion, AccordionPanel, Box, DataTable} from 'grommet';
import Numeral from "numeral";
import Moment from 'moment';
import axios from "axios";

class ExampleDatatable2 extends Component {

    constructor() {
        super();
        this.state = {
            resizeable: false,
            sortable: true,
            replace: false,
            data: [],
            columns: [
                {
                    "header": "Data",
                    "property": "date",
                    "primary": true,
                    "search": true,
                    "align": "center",
                    render: datum => Moment(datum.date).format("DD-MM-YYYY")
                },
                {
                    "header": "Valore €/Ton",
                    "align": "center",
                    "property": "value",
                    render: datum => Numeral(datum.value).format('0[.]')
                },
                {
                    "header": "Orario",
                    "align": "center",
                    "sortable": true,
                    "property": "time"
                },

            ],
        };
    }

    saveStateToLocalStorage = () => {
        localStorage.setItem('tableState', JSON.stringify(this.state));
    };

    restoreStateFromLocalStorage = () => {
        const state = JSON.parse(localStorage.getItem('tableState'));
        this.setState(state);
    };

    async componentDidMount () {

        if (!navigator.onLine) {
            this.restoreStateFromLocalStorage();
        }
        let apiUrl = process.env.REACT_APP_API_URL;
        axios.get(apiUrl + 'graph_data')
            .then(response => {
                this.setState({data: response.data }, this.saveStateToLocalStorage)
                //console.log(data);
            })
            // Catch any error here
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        const {
            data, sortable, replace, resizeable, columns,
        } = this.state;
        return (
            <Accordion flex align='center' justify='center' size="medium">
                <AccordionPanel label="CMI Cash Milano - Storico Prezzi" width="medium" align="center">
                    <Box
                        align="center"
                        width="medium"
                        animation="slideDown"

                    >
                        <DataTable
                            columns={columns}
                            data={data}
                            resizeable={resizeable}
                            replace={replace}
                            pad="small"
                            margin="small"
                            background={{
                                //header: "dark-3",
                                header:
                                    {
                                        color: 'dark-1',
                                        opacity: 'medium',
                                    },
                                extend: 'backdrop-filter: blur(8px);',

                                body: ["light-1", "light-3"]
                            }}
                            onClickRow={event => alert(JSON.stringify(event.datum, null, 2))}
                            sortable={sortable}
                            pin
                            size="medium"
                        />
                    </Box>
                </AccordionPanel>
            </Accordion>
        );
    }

}

export default ExampleDatatable2;