import React, { Component, PropTypes } from 'react'
import Card from './card'
// import '../styles/calendar-list.less'
// import '../node_modules/bootstrap/less/bootstrap.less'

export default class CalendarList extends Component {

    constructor (props) {
        super(props)
        this.state = {
            page: 0
        };
        this.handleStepForward = this.handleStepForward.bind(this)
        this.handleStepBackward = this.handleStepBackward.bind(this)
        this.handleForward = this.handleForward.bind(this)
        this.handleBackward = this.handleBackward.bind(this)
    }

    getSharingUrl (code) {
        var tmp;
        tmp = [window.share_event];
        tmp = tmp.concat(['share', 'event', code]);
        return tmp.join('/');
    }

    selectText () {
        try {
            chrome.runtime.sendMessage({
                type: 'copy',
                text: $('#share_link').text()
            });
            console.log('Copy was ' + successful ? 'successful' : 'unsuccessful');
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    }

    updateShareUrl (code) {
        var url = this.getSharingUrl(code);
        $('#share_link').text(url);
    }

    updateShareStatus (st) {
        if (st) {
            $('#block-share-request').hide();
            $('#block-share').show();
        } else {
            $('#block-share-request').show();
            $('#block-share').hide();
        }
    }

    handleStepBackward () {
        this.setState({page: 0});
    }

    handleBackward () {
        var currPage = this.state.page || 0,
            prevPage = Math.max(0, currPage - 1);

        this.setState({page: prevPage});
    }

    handleStepForward () {
        var totalPage = 0
        const { data, cardPerPage } = this.props;

        if (this.props.data) {
            totalPage = Math.ceil(data.length / (cardPerPage || 12)) - 1;
        }
        this.setState({page: totalPage});
    }

    handleForward () {
        var currPage = this.state.page || 0,
            totalPage = 0;
        const { data, cardPerPage } = this.props;

        if (this.props.data) {
            totalPage = Math.ceil(data.length / (cardPerPage || 12)) - 1;
        }
        this.setState({page: Math.min(currPage + 1, totalPage)});
    }

    handleClick (props) {
        this.props.Timer.setTime(props.time);
        $('#playerModal').modal('show');
        $('#playerModal').data('event_id', props.event_id);
        this.updateShareUrl(props.sharing_code);
        this.updateShareStatus(props.is_shared);
    }

    handleDelete (props) {
        $('#deleteFormModal').modal({
            show: true,
            backdrop: 'static'
        });
        $('#delete-event-name').text('Motion Detection');
        $('#delete-event-time').text(this.getDateString(props.time));
        $('#deleteFormModal').data('event_id', props.event_id);
    }

    getDateString (t) {
        var obj = new Date(t),
            year = obj.getFullYear(),
            month = padZero(obj.getMonth() + 1),
            date = padZero(obj.getDate()),
            hour = padZero(obj.getHours()),
            minute = padZero(obj.getMinutes());

        function padZero(num) {
            if (num < 10) {
                return '0' + num;
            }
            return num;
        }
        return [year, month, date].join('/') + ' ' + [hour, minute].join(':');
    }

    renderNoneRecords () {
        var divStyle = {
                'padding': '100px'
            };

        return (
            <div className="text-center" style={divStyle}>
                <h2>There is no event recording in your search period.</h2>
            </div>
        );
    }

    render () {
        var page = this.state.page || 0,
            totalPage = 0,
            divStyle,
            tmp;

        if (this.props.data) {
            const { data, cardPerPage } = this.props

            totalPage = Math.ceil(data.length / (cardPerPage || 12));

            if (this.props.data.length <= 0) {
                return this.renderNoneRecords();
            }

            if (totalPage <= page) {
                page = totalPage - 1;
            }

            return (
                <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                    {data.sort((a, b) => {
                        return b.start_time - a.start_time;
                    }).slice(page * 8, (page + 1) * 8).map((data, i) => {
                        var time = data.start_time * 1000,
                            videoUrl = data.url,
                            sharing_code = data.sharing_code,
                            preview = data.screenshot,
                            is_shared = data.is_sharing,
                            event_id = data.event_id;

                        if (sharing_code) {
                            sharing_code = sharing_code.replace(/\+/g, '-').replace(/\//g, '_');
                        }
                        return (
                            <Card
                              key={i}
                              video={videoUrl}
                              sharing_code={sharing_code}
                              event_id={event_id}
                              preview={preview}
                              title={'Your title here'}
                              description={this.getDateString(time)}
                              is_shared={is_shared}
                              onClick={this.handleClick}
                              onDelete={this.handleDelete} />
                        );
                    })}
                    </div>
                    <div className="row text-center" id="pagination">
                        <span
                          className='pagination-icon'
                          onClick={this.handleStepBackward}>
                            &lt;&lt;
                        </span>
                        <span
                          className='pagination-icon'
                          onClick={this.handleBackward}>
                            &lt;
                        </span>
                        <span>Page : {page + 1} / {totalPage}</span>
                        <span
                          className='pagination-icon'
                          onClick={this.handleForward}>
                            &gt;
                        </span>
                        <span
                          className='pagination-icon'
                          onClick={this.handleStepForward}>
                            &gt;&gt;
                        </span>
                    </div>
                </div>
                </div>
            );
        } else {
          return (
              <div className="container">
              <div className="row">
                  <div id="img-loading-wrapper">
                  <div id="img-loading-listener">
                  <img
                    src="images/ajax-loader-large.gif"
                    style={{'margin-top': '-150px !important'}} />
                  </div>
                  </div>
              </div>
              </div>
          );
        }
    }
}
