import React, { Component, PropTypes } from 'react'
import CalendarList from '../../lib/calendar-list.js'
import '../../styles/card.less'
import '../../styles/calendar-list.less'
import '../../node_modules/bootstrap/less/bootstrap.less'
import { render } from 'react-dom'

let now = new Date(),
    year = now.getFullYear(),
    month = now.getMonth(),
    date = now.getDate(),
    data = [{
        id: "000e64c79307434382ba711c25616564",
        screenshot: "images/travel3.jpg",
        start_time: (new Date(year, month, date).valueOf() / 1000) + 1
    }, {
        id: "0020224bcde94a718f5ee94e06838f1b",
        screenshot: "images/travel2.jpg",
        start_time: 1454585764
    }, {
        id: "002279616b43406396a20469f21e58cd",
        screenshot: "images/travel4.png",
        start_time: 1454646394
    }]

data = data.concat(data, data, data, data, data, data, data, data);

const printMyList = (list) => {
    console.log(list.join(', '))
}

const onCardDeleted = function (props, callback) {
    console.log('deleting card ' + props.card_id);
    callback();
}

const onCardClicked = function (card) {
    console.log('card clicked ' + card.card_id);
}

const getTitle = function (card) {
    return 'Your title here';
}

const getDescription = function (card) {
    var t = card.start_time * 1000,
        obj = new Date(t),
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

const renderNoCards = function () {
    return (
        <div
          className="text-center"
          style={{'padding': '100px'}}>
            <h2>
                There is no card in your search period.
            </h2>
        </div>
    );
}

render(
    <CalendarList
      idName="id"
      startName="start_time"
      imageName="screenshot"
      data={data}
      getTitle={getTitle}
      getDescription={getDescription}
      onCardDeleted={onCardDeleted}
      onCardClicked={onCardClicked}
      renderNoCards={renderNoCards}
      listUpdated={printMyList} />,
    document.getElementById('root')
)
