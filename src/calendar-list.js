import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import List from './list'

export default class CalendarList extends Component {

    constructor (props) {
        let now = new Date(),
            year = now.getFullYear(),
            month = now.getMonth(),
            date = now.getDate()

        super(props)
        this.state = {
            start_time: (new Date(year, month, date)).valueOf(),
            end_time: (new Date(year, month, date + 1)).valueOf() - 1,
            list: []
        }
    }

    componentDidMount () {
        const { start_time, end_time } = this.state,
              min_time = this.props.data.reduce(function (prev, curr) {
                  return Math.min(prev, curr.start_time * 1000);
              }, Date.now());

        $('#start-date').daterangepicker({
            locale: {
                format: 'MMM DD, YYYY HH:mm'
            },
            timePicker24Hour: true,
            autoApply: true,
            startDate: new Date(start_time),
            endDate: new Date(end_time),
            maxDate: new Date(end_time),
            minDate: new Date(min_time)
        })

        this.setState({
            list: this.props.data.filter((d) => {
                var t = d.start_time * 1000;
                return t >= start_time && end_time >= t;
            })
        })

        $('#start-date').on('apply.daterangepicker', () => {
            let range = $('#start-date').val().split(/\s*\-\s*/)
            const start_time = (new Date(range[0])).valueOf();
            const end_time = (new Date(range[1])).valueOf() + 59 * 1000 + 999
            this.setState({
                start_time: start_time,
                end_time: end_time,
                list: this.props.data.filter(function (d) {
                    var t = d.start_time * 1000;
                    return t >= start_time && end_time >= t;
                })
            })
            return
        })
    }

    componentDidUpdate () {
        /*const { start_time, end_time } = this.state
        this.setState({
            list: this.props.data.filter(function (d) {
                var t = d.start_time * 1000;
                return t >= start_time && end_time >= t;
            })
        })*/
    }

    updateHandler (event_id, updates) {
        return this.setState({
            list: this.state.list.map(function (d) {
                let k
                if (d.event_id == event_id) {
                    for (k in updates) {
                        d[k] = updates[k]
                    }
                    console.log(d)
                }
                return d
            })
        })
    }

    deleteHandler (props) {
        this.props.onDeleteCard(props, () => {
            this.setState({
                list: this.state.list.filter(function (d) {
                    return d.event_id != props.event_id
                })
            })
            return
        })
    }

    render () {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                    </div>
                    <div className="form-group has-feedback col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            id="start-date" />
                        <span className="glyphicon glyphicon-calendar form-control-feedback" />
                    </div>
                </div>
                <div id="content-list">
                    <List
                        data={this.state.list}
                        onDeleteCard={this.deleteHandler}
                        cardsPerPage={this.props.cardsPerPage}
                        Timer={this.props.Timer} />
                </div>
            </div>
        );
    }

}

