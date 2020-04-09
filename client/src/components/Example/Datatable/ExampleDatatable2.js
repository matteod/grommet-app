import React, {Component} from 'react';
import {DataTable} from 'grommet';
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
                    "header": "Date",
                    "property": "date",
                    "primary": true,
                    "search": true,
                    render: datum => Moment(datum.date).format("DD-MM-YYYY")
                },
                {
                    "header": "Value", "property": "value", render: datum => Numeral(datum.value).format('00, ')
                },
                {"header": "Time", "property": "time"},

            ],
        };
    }

    componentDidMount () {
        axios.get('http://localhost:4000/api/graph_data')
            .then(response => {
                this.setState({data: response.data })
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
            <DataTable
                columns={columns}
                data={data}
                resizeable={resizeable}
                replace={replace}
                pad="medium"
                background={{
                    header: "dark-4",
                    body: ["light-1", "light-3"]
                }}
                onClickRow={event => alert(JSON.stringify(event.datum, null, 2))}
                sortable={sortable}
            />
        );
    }

}

export default ExampleDatatable2;