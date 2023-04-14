import ptBR from 'date-fns/locale/pt-BR';
import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import './index.css';

const DatePicker = ({ id, label, value, minDate, maxDate, onChange, disabled }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        helperText=""
        id="date-picker-inline"
        label={label}
        minDate={minDate}
        maxDate={maxDate}
        value={value}
        onChange={onChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        disabled={disabled}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
