import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  buttonContainer: {
    marginLeft: '10px',
  },
  textField: {
    width: '90%',
  },
  dateText: {
    textAlign: 'center',
  },
  divider: {
    border: 'none',
    borderLeft: '1px solid hsla(200, 10%, 50%,100)',
    height: '90px',
    width: '1px',
  },
  button: {
    background: `linear-gradient(to right, #233573 0%, #059BDF 100%)`,
    color: '#FFF',
    borderRadius: '20px',
    width: '130px',
    height: '30px',
    border: 0,
    margin: 0,
    fontFamily: 'dinmedium',
    fontSize: '16px',
  },
});

export default useStyles;
