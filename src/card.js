import React, { Component, PropTypes } from 'react'
import '../styles/label-list.less'

export default class Card extends Component {

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

    drawImage () {
        var canvas = React.findDOMNode(this.refs.canvas),
            ctx;
        if (canvas === null) {
            return;
        }
        ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 300;
        ctx.beginPath();
        ctx.arc(200, 150, 140, 0, 2 * Math.PI);
        ctx.fillStyle = '#aeaeae';
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(200, 150, 125, 0, 2 * Math.PI);
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#fff';
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(150, 80);
        ctx.lineTo(280, 150);
        ctx.lineTo(150, 220);

        ctx.closePath();
        ctx.fillStyle = '#fff';
        ctx.fill();
    }
    
    componentDidMount () {
        this.drawImage();
    }

    handleClick () {
        this.props.onClick(this.props);
    }

    handleDelete () {
        this.props.onDelete(this.props);
    }

    render () {
        var preview = this.props.preview,
            content = '',
            tString = getDateString(this.props.time),
            idImage = "img-" + this.props.time;

        if (preview) {
            content = (
                <img
                  id={idImage}
                  src={preview}
                  onClick={this.handleClick}
                  className="img-responsive" />
            );
        } else {
            content = (
                <canvas className="img-responsive" ref="canvas" />
            );
        }
        return (
            <div key={this.props.key}
                className="col-xs-12 col-sm-6 col-md-3">
                <div className="row">
                    <div
                        className="event-wrapper">
                        <div>
                            <div className="canvas"
                                onClick={this.handleClick}>
                                {content}
                            </div>
                            <div><b>Motion Detection</b></div>
                            <div>{tString}</div>
                            <div
                                className="btn-event-delete"
                                onClick={this.handleDelete}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
