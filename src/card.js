import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
// import '../styles/card.less'

export default class Card extends Component {

    drawImage () {
        var canvas = ReactDOM.findDOMNode(this.refs.canvas),
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
        this.props.onCardClicked(this.props);
    }

    handleDelete () {
        this.props.onCardDeleted(this.props);
    }

    render () {
        var preview = this.props.preview,
            content = '',
            idImage = "img-" + this.props.time;

        if (preview) {
            content = (
                <img
                  id={idImage}
                  src={preview}
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
                            <div
                              className="canvas"
                              onClick={this.handleClick.bind(this)}>
                                {content}
                            </div>
                            <div onClick={this.handleClick.bind(this)}>
                                <b>{this.props.title}</b>
                            </div>
                            <div onClick={this.handleClick.bind(this)}>
                                {this.props.description}
                            </div>
                            <div
                              className="btn-delete"
                              onClick={this.handleDelete.bind(this)}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
