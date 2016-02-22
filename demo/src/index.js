import React, { Component, PropTypes } from 'react'
import CalendarList from '../../lib/calendar-list.js'
import '../../styles/card.less'
import '../../styles/calendar-list.less'
import '../../node_modules/bootstrap/less/bootstrap.less'
import { render } from 'react-dom'

let now = new Date(),
    year = now.getFullYear(),
    month = now.getMonth(),
    date = now.getDate()

const data = [{
    event_id: "000e64c79307434382ba711c25616564",
    event_type: 1,
    is_sharing: false,
    screenshot: "images/travel3.jpg",
    sharing_code: "Sc2u/htORMeJpJ9FDTz8AVyR1GGevwnpLS7Zzq4ZTJM",
    start_time: (new Date(year, month, date).valueOf() / 1000) + 1
}, {
    event_id: "0020224bcde94a718f5ee94e06838f1b",
    event_type: 1,
    is_sharing: false,
    screenshot: "images/travel2.jpg",
    sharing_code: "4kPoQbHDlW2m1gUV1pISazpBpwCEtSIHxVfxJ1pvq/I",
    start_time: 1454585764
}, {
    event_id: "002279616b43406396a20469f21e58cd",
    event_type: 1,
    is_sharing: false,
    screenshot: "images/travel4.png",
    sharing_code: "PwTZdRsJUL6O5lKVtQX538t7Bfj/YpOvlQ3wdKPo1BY",
    start_time: 1454646394
}]

const printMyList = (list) => {
    console.log(list.join(', '))
}
render(
    <CalendarList
      data={data.concat(data, data, data, data, data, data, data, data)}
      listUpdated={printMyList} />,
    document.getElementById('root')
)
