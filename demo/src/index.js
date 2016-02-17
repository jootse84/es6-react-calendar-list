import React, { Component, PropTypes } from 'react'
import CalendarList from '../../lib/calendar-list.js'

import { render } from 'react-dom'

const data = [{
    event_id: "000e64c79307434382ba711c25616564"
    event_type: 1
    is_sharing: false
    screenshot: "https://vsaas-beta.s3.amazonaws.com/_EVENT/18ae8ec551e7e547c67ff7105bf1219a/78f493f1014e6ecab09d7c4d27d2ba2a.jpg"
    sharing_code: "Sc2u/htORMeJpJ9FDTz8AVyR1GGevwnpLS7Zzq4ZTJM"
    start_time: 1454599291
    url: "https://vsaas-beta.s3.amazonaws.com/_EVENT/18ae8ec551e7e547c67ff7105bf1219a/78f493f1014e6ecab09d7c4d27d2ba2a.mp4"
}, {
    event_id: "0020224bcde94a718f5ee94e06838f1b"
    event_type: 1
    is_sharing: false
    screenshot: "https://vsaas-beta.s3.amazonaws.com/_EVENT/18ae8ec551e7e547c67ff7105bf1219a/8d8fc9a5aa37f81e8d8edf53aa59ec54.jpg"
    sharing_code: "4kPoQbHDlW2m1gUV1pISazpBpwCEtSIHxVfxJ1pvq/I"
    start_time: 1454585764
    url: "https://vsaas-beta.s3.amazonaws.com/_EVENT/18ae8ec551e7e547c67ff7105bf1219a/8d8fc9a5aa37f81e8d8edf53aa59ec54.mp4"
}, {
    event_id: "002279616b43406396a20469f21e58cd"
    event_type: 1
    is_sharing: false
    screenshot: "https://vsaas-beta.s3.amazonaws.com/_EVENT/18ae8ec551e7e547c67ff7105bf1219a/4a40ffa17a97e2481bd4fee91a816ec5.jpg"
    sharing_code: "PwTZdRsJUL6O5lKVtQX538t7Bfj/YpOvlQ3wdKPo1BY"
    start_time: 1454646394
    url: "https://vsaas-beta.s3.amazonaws.com/_EVENT/18ae8ec551e7e547c67ff7105bf1219a/4a40ffa17a97e2481bd4fee91a816ec5.mp4"
}]

const printMyList = (list) => {
    console.log(list.join(', '))
}
render(
    <CalendarList
      data={data}
      listUpdated={printMyList} />,
    document.getElementById('root')
)
