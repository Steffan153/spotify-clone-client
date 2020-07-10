const str_pad_left = (string, pad, length) => {
  return (new Array(length + 1).join(pad) + string).slice(-length);
};

const formatDuration = (seconds, withHours = false) => {
  const total = seconds;
  const mins = Math.floor(total / 60);
  const secs = total - mins * 60;
  const hrs = Math.floor(total / 3600);
  return `
    ${withHours ? str_pad_left(hrs, '0', 2) + ':' : ''}${str_pad_left(
    mins,
    '0',
    2,
  )}:${str_pad_left(secs, '0', 2)}
  `;
};

export { formatDuration };
