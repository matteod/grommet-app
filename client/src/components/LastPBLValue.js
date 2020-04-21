import React from "react";
import { Box, Text, Heading } from "grommet";
//import { StatusBadge } from "../components";
//import {actualValue} from "../data";
import Numeral from "numeral";
import Moment from 'moment';
import axios from 'axios'

import {CaretUp} from 'grommet-icons';
import { CaretDown } from 'grommet-icons';
Numeral.register("locale", "it", {
    delimiters: {
        thousands: ".",
        decimal: ","
    },
    abbreviations: {
        thousand: "k",
        million: "m",
        billion: "b",
        trillion: "t"
    },
    currency: {
        symbol: "€/ton"
    }
});
// switch between locales
Numeral.locale('it');

class LastPBLValue extends React.Component {
    // Adds a class constructor that assigns the initial state values:

    constructor () {
        super();
        this.state = {
            pblPrice: '',
            pblLastDate: '',
            pblLastTime: '',
            pblTrend: '',
            pblIcon: '',
            Icon:''
        };
    }
    // This is called when an instance of a component is being created and inserted into the DOM.
    componentDidMount () {
        let apiUrl = process.env.REACT_APP_API_URL;
        axios.get(apiUrl + 'actualValue')
            .then(response => {
                var pblPrice = Numeral(response.data[0].price).format('00, $');
                this.setState({ pblPrice: pblPrice });
                this.setState({ pblLastDate: Moment(response.data[0].date).format("DD-MM-YYYY")} );
                this.setState({ pblLastTime: response.data[0].time} );
                this.setState( {pblTrend: response.data[0].trend} );
                if (response.data[0].trend === "status-error"){
                    this.setState( {pblIcon: CaretDown} );
                    this.setState( {Icon: <CaretDown color={this.state.pblTrend} size="large"/>} );
                }
                else if (response.data[0].trend === "status-ok") {
                    this.setState( {pblIcon: CaretUp} );
                    this.setState( {Icon: <CaretUp color={this.state.pblTrend} size="large" />} );
                }
            })
            // Catch any error here
            .catch(error => {
                console.log(error)
            })

    }
    render(){

        return (
            <Box round pad="medium" direction="column" background="white" align="center">
                <Heading level="2" margin="none" size="medium" >
                    PREZZO BASE LATTONERIA
                </Heading>
                <Heading level="1" margin="none" size="large" color={this.state.pblTrend} >
                    {this.state.Icon} {this.state.pblPrice}
                </Heading>
                <Text align="center" margin="small" size="16px" weight="normal">
                    Prezzo corrente al : {this.state.pblLastDate} - {this.state.pblLastTime}
                </Text>
            </Box>
        )
    }
}

export default LastPBLValue;

/*
export const LastPBLValue = ({ data, ...rest }) => (
  <Box round pad="medium" direction="column" background="white" {...rest}>
    <Heading level="2" margin="none" size="small">
      {data.name}
    </Heading>
    <Text size="90px" weight="bold">
      {numeral(data.value)} - {data.um}
    </Text>
    {<Box gap="medium" pad={{ vertical: "small" }}>
      {["On", "Suspended", "Off"].map(status => (
        <Box direction="row" align="center" key={status}>
          <StatusBadge size="xlarge" background={statusColors[status]} />
          <Box pad="xsmall">
            <Text size="small" color="dark-1" margin={{ left: "xsmall" }}>
              {status} ({data[status]})
            </Text>
          </Box>
        </Box>
      ))}
    </Box>}
  </Box>
);
*/