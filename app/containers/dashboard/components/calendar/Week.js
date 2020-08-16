import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import Day from './Day';
import s from './Calendar.module.scss';

class Week extends Component {
  render() {
    const days = [];
    let date = this.props.previousCurrentNextView;

    const { selectedMonthEvents, selected, currentMonthView } = this.props;

    for (let i = 0; i < 7; i++) {
      let dayHasEvents = false;
      let title = '';
      let info = '';
      let itemStyle = '';
      let link = '';

      for (let j = 0; j < selectedMonthEvents.length; j++) {
        if (selectedMonthEvents[j].date.isSame(date, 'day')) {
          dayHasEvents = true;
          title = selectedMonthEvents[j].title
            ? selectedMonthEvents[j].title
            : '';
          info = selectedMonthEvents[j].info ? selectedMonthEvents[j].info : '';
          itemStyle = selectedMonthEvents[j].itemStyle
            ? selectedMonthEvents[j].itemStyle
            : '';
          link = selectedMonthEvents[j].link ? selectedMonthEvents[j].link : '';
        }
      }

      const day = {
        name: date.format('dd').substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === currentMonthView.month(),
        isToday: date.isSame(new Date(), 'day'),
        date,
        hasEvents: dayHasEvents,
        title,
        info,
        itemStyle,
        link,
      };

      days.push(<Day key={uuid()} day={day} selected={selected} />);
      date = date.clone();
      date.add(1, 'd');
    }
    return <div className={`${s.calendarRow} ${s.week}`}>{days}</div>;
  }
}

export default Week;
