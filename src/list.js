import React, { Component, PropTypes } from 'react'
import Card from './card'
// import '../styles/list.less'
// import '../node_modules/bootstrap/less/bootstrap.less'

export default class List extends Component {

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
        const { data, cardsPerPage } = this.props;

        if (this.props.data) {
            totalPage = Math.ceil(data.length / (cardsPerPage || 12)) - 1;
        }
        this.setState({page: totalPage});
    }

    handleForward () {
        var currPage = this.state.page || 0,
            totalPage = 0;
        const { data, cardsPerPage } = this.props;

        if (this.props.data) {
            totalPage = Math.ceil(data.length / (cardsPerPage || 12)) - 1;
        }
        this.setState({page: Math.min(currPage + 1, totalPage)});
    }

    render () {
        var page = this.state.page || 0,
            totalPage = 0,
            divStyle,
            tmp;

        if (this.props.data) {
            const {
              data,
              cardsPerPage,
              startName,
              idName,
              imageName,
              getTitle,
              getDescription,
              onCardClicked,
              onCardDeleted
            } = this.props

            totalPage = Math.ceil(data.length / (cardsPerPage || 12));

            if (this.props.data.length <= 0) {
                return this.props.renderNoCards();
            }

            if (totalPage <= page) {
                page = totalPage - 1;
            }

            return (
                <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        {data.sort((a, b) => {
                            return b[startName] - a[startName];
                        }).slice(page * 8, (page + 1) * 8).map((data, i) => {
                            return (
                                <Card
                                  key={i}
                                  card_id={data[idName]}
                                  preview={data[imageName]}
                                  title={getTitle(data)}
                                  description={getDescription(data)}
                                  onCardClicked={onCardClicked}
                                  onCardDeleted={onCardDeleted} />
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
