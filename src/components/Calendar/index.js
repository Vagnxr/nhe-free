import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

import './calendar.css';

moment.locale('pt-br');

const useStyles = makeStyles({
  title: {
    color: '#009DE1',
    fontFamily: 'dinmedium',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '16px',
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
    marginBottom: '16px',
  },
  error: {
    color: '#F44336',
    marginTop: '8px',
  },
});

const Calendar = ({ handleChange, date, open, handleFocus, handleBlur, title, touched, error }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Typography className={classes.title}>{title}</Typography>
      <SingleDatePicker
        date={date}
        name="data"
        required
        readOnly
        showDefaultInputIcon
        inputIconPosition="after"
        weekDayFormat="ddd"
        firstDayOfWeek={1}
        placeholder=""
        onDateChange={val => handleChange(val, false)}
        focused={open}
        onFocusChange={({ focused }) => {
          handleBlur('data');
          handleFocus(focused);
        }}
        id="calendar"
        daySize={25}
        numberOfMonths={1}
        hideKeyboardShortcutsPanel
      />
      {touched && error && <Typography className={classes.error}>{error}</Typography>}
    </Fragment>
  );
};

Calendar.defaultProps = {
  date: null,
};

Calendar.propTypes = {
  handleChange: PropTypes.func.isRequired,
  date: momentPropTypes.momentObj,
  open: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  handleBlur: PropTypes.func.isRequired,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

export default Calendar;
