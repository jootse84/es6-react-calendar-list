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
              { startName } = this.props,
              min_time = this.props.data.reduce((prev, curr) => {
                  return Math.min(prev, curr[startName] * 1000);
              }, Date.now())

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
                var t = d[startName] * 1000;
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
                    var t = d[startName] * 1000;
                    return t >= start_time && end_time >= t;
                })
            })
            return
        })
    }

    updateHandler (id, updates) {
        const { idName } = this.props
        return this.setState({
            list: this.state.list.map((d) => {
                let k
                if (d[idName] == id) {
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
        const { idName } = this.props
        this.props.onCardDeleted(props, () => {
            this.setState({
                list: this.state.list.filter(function (d) {
                    return d[idName] != props[idName]
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
                        idName={this.props.idName}
                        imageName={this.props.imageName}
                        startName={this.props.startName}
                        getTitle={this.props.getTitle}
                        getDescription={this.props.getDescription}
                        renderNoCards={this.props.renderNoCards}
                        onCardDeleted={this.deleteHandler}
                        onCardClicked={this.props.onCardClicked}
                        cardsPerPage={this.props.cardsPerPage} />
                </div>
            </div>
        );
    }

}

