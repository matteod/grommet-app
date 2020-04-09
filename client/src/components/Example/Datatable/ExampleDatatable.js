import React, {Component} from 'react';
import {PagingTable} from "grommet-controls";
import {Box} from "grommet";
import {Add, Subtract} from "grommet-icons";
import axios from 'axios'


const getColumn = (columns, header) => (
    columns.reduce((_, column) => (
        column.columns ? getColumn(column.columns, header) : column.Header === 'header'

    ), null)
);

const getAllColumns = (columns) => {
    let allColumns = [];
    columns.forEach((column) => {
        if (column.columns) {
            allColumns = [...allColumns, ...getAllColumns(column.columns)];
        } else {
            allColumns.push(column);
        }
    });
    return allColumns;
};

const updateColumnShow = (allColumns, visible) => (
    allColumns.map(column => (
        column.columns ? { ...column, columns: updateColumnShow(column.columns, visible) } :
            { ...column, show: visible.indexOf(column.Header) !== -1 }
    ))
);

class ExampleDatatable extends Component {
    constructor() {
        super();
        this.state = {
            grouping: false,
            filterable: true,
            sortable: true,
            paging: false,
            data: [],
            columns: [
                {
                    Header: 'Date',
                    decorations: {
                        header: {
                            align: 'start',
                        },
                    },
                    accessor: 'date',
                },

                {
                    Header: 'Value',
                    accessor: 'value',
                    decorations: {
                        cell: {
                            align: 'end',
                        },
                    },
                }, {
                    Header: 'Time',
                    accessor: 'time',
                    decorations: {
                        cell: {
                            align: 'end',
                        },
                    },
                }


            ],
        };
    }


    componentWillMount () {
        axios.get('/graph_data')
            .then(response => {
                this.setState({data: response.data })
                //console.log(data);
            })
            // Catch any error here
            .catch(error => {
                console.log(error)
            })
    }

    onChangeFields({ value }) {
        const { columns } = this.state;
        this.setState({ columns: updateColumnShow(columns, value) });
    }

    render() {
        const {
            data, grouping, sortable, filterable, paging, columns,
        } = this.state;
        const allColumns = getAllColumns(columns);
        const visibleColumns = allColumns.filter(column => !(column.show === false));
        return (
            <Box gap='small' fill='horizontal'>
                <Box direction='row' justify='between'>
                    {/*<CheckBox checked={grouping} label='Group rows' onChange={() => this.setState({ grouping: !grouping })} />
                    <CheckBox checked={sortable} label='Sortable' onChange={() => this.setState({ sortable: !sortable })} />
                    <CheckBox checked={filterable} label='Filter' onChange={() => this.setState({ filterable: !filterable })} />
                    <CheckBox checked={paging} label='Paging' onChange={() => this.setState({ paging: !paging })} />*/}
                    {/*<Box basis='small'>
                        <Select
                            options={allColumns.map(column => column.Header)}
                            multiple={true}
                            selected={
                                visibleColumns.map(c =>
                                    allColumns.findIndex(column => column.Header === c.Header))
                            }
                            value={visibleColumns.map(column => column.Header)}
                            onChange={this.onChangeFields.bind(this)}
                        />
                    </Box>*/}
                </Box>
                <PagingTable
                    key={grouping}
                    pivotBy={grouping ? ['item'] : undefined}
                    defaultPageSize={20}
                    filterable={filterable}
                    sortable={sortable}
                    showPagination={paging}
                    pageSizeOptions={[2, 4, 6]}
                    decorations={{
                        table: { elevation: 'large', border: 'all' },
                        headerGroup: {
                            background: 'brand', border: 'horizontal', size: 'large', align: 'center',
                        },
                        header: { border: 'all', align: 'center' },
                        filter: { background: 'light-2', border: 'all' },
                        filterInput: { size: 'small', placeholder: 'Filter...' },
                        body: { animation: { type: 'fadeIn', duration: 2000, size: 'large' } },
                        rowOdd: {
                            background: { color: 'light-1', opacity: 'medium' },
                        },
                        footer: { background: 'accent-2' },
                        pagination: { pad: { vertical: 'medium' } },
                        expander: { CloseIcon: <Subtract color='brand' />, OpenIcon: <Add color='brand' /> },
                    }}
                    SubComponent={row => (
                        <Box
                            margin="medium"
                            direction='row'
                            pad='small'
                            gap='small'
                            round='medium'
                            border={{ color: 'brand', size: 'small' }}
                            background='light-1'
                        >
                            <Box>
                                <div><strong>Date: </strong>{row.original.date}</div>
                                <div><strong>Value: </strong>{row.original.value}</div>
                                <div><strong>Time: </strong>{row.original.time}</div>
                            </Box>
                        </Box>
                    )}
                    columns={columns}
                    data={data}
                />
            </Box>
        );
    }
}

export default ExampleDatatable;