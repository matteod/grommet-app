import React, {Component} from 'react';
import { Chart } from  'grommet';
import { Box } from 'grommet';
import { Text } from 'grommet';
import { Stack } from 'grommet';
import { Grommet } from 'grommet';
import { grommet } from 'grommet';
import { calcs } from "grommet";

class ExampleChart extends Component {
    state = { values: [], yAxis: [], xAxis: [] };

    componentDidMount() {
        // generate data as a server might
        const date = new Date(2020, 2, 24);
        let value = 5540;
        const averages = [];
        while (averages.length < 31) {
            averages.unshift({ date: date.toISOString(), value });
            date.setTime(date.getTime() - 1000 * 3600 * 24);

            //const factor = date.getDate() % 5;
            const factor = Math.floor((Math.random() * 1) + 0.5);
            value = factor === 0 ? value + 4.34 : value - 4.45;
        }

        // convert for displaying
        const values = [];
        averages.forEach(avg => {
            values.push({ value: [new Date(avg.date).getTime(), avg.value] });
        });

        const { axis, bounds } = calcs(values, { coarseness: 1, steps: [3, 4] });
        const xAxis = axis[0].map(x =>
            new Date(x).toLocaleDateString("it-IT", {
                month: "long",
                day: "numeric"
            })
        );
        const yAxis = axis[1];
        this.setState({ bounds, values, yAxis, xAxis });
    }

    render() {
        const { bounds, values, yAxis, xAxis } = this.state;
        const chartProps = {
            size: { width: "large", height: "medium" },
            bounds,
            values,
            overflow: true
        };
        return (
            <Grommet theme={grommet}>
                <Box gap="medium" flex="grow" margin="small" round pad="medium" background="white" width="xlarge" height="medium">
                    <Box
                        direction="row"
                        justify="between"
                        width="medium"
                        margin={{ vertical: "small" }}
                    >
                        {xAxis.map(x => (
                            <Text key={x}>{x}</Text>
                        ))}
                    </Box>
                    <Stack guidingChild="last">
                        <Box fill justify="between">
                            {yAxis.map((y, index) => {
                                const first = index === 0;
                                const last = index === yAxis.length - 1 && !first;
                                let align;
                                if (first) {
                                    align = "start";
                                } else if (last) {
                                    align = "end";
                                } else {
                                    align = "center";
                                }
                                return (
                                    <Box key={y} direction="row" align={align}>
                                        <Box pad={{ horizontal: "small" }}>
                                            <Text>{y}</Text>
                                        </Box>
                                        <Box border="top" flex />
                                    </Box>
                                );
                            })}
                        </Box>
                        <Chart
                            {...chartProps}
                            type="area"
                            color={{ color: "accent-1", opacity: "medium" }}
                            thickness="hair"
                        />
                        <Chart
                            {...chartProps}
                            type="line"
                            round
                            color={{ color: "accent-3", opacity: "strong" }}
                            thickness="hair"
                        />
                    </Stack>
                </Box>
            </Grommet>
        );
    }
}

export default ExampleChart;