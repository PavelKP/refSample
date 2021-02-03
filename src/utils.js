import moment from 'moment';
moment.locale('ru');

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const formatDuration = (duration) => {
  const momentDuration = moment.duration(duration, `minutes`);
  const durationHours = (momentDuration.asHours() <= 0)
    ? ``
    : `${(momentDuration.asHours()).toString().match(/(\d+)/)[0]} ч`;
  const durationMinutes = (momentDuration.minutes() <= 0) ? `` : `${momentDuration.minutes()} мин`;

  return `${durationHours} ${durationMinutes}`;
};



export const formatDate = (date, format) => {
  if (!(date instanceof Date)) {
    return ``;
  }
  return moment(date).format(format);
};
