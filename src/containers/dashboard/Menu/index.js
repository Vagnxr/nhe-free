import React, { useState } from 'react';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import DropDownIcon from 'static/icons/dropdown.svg';

import Logout from './Logout';

const useStyles = makeStyles({
  userTitle: {
    fontSize: '15px',
    fontFamily: 'DinMedium',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  actionButton: {
    padding: '0px 12px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  menuTitle: {
    marginBottom: '15px',
    textAlign: 'center',
    fontSize: '15px',
    fontFamily: 'DinMedium',
    color: '#6B6B6B',
  },
  menu: {
    position: 'absolute',
    top: '50px !important',
    left: 'calc(100% - 200px) !important',
    width: '200px',
    right: '0',
    height: '180px',
  },
  menuContainer: {
    padding: '16px',
    height: '100%',
  },
  menuButton: {
    border: '1px solid #233473',
    borderRadius: '20px',
    padding: '8px 50px',
    color: '#6B6B6B',
    fontFamily: 'DinMedium',
    fontSize: '12px',
  },
  list: {
    height: '100%',
  },
  version: {
    fontSize: '12px',
    color: '#6B6B6B',
  },
  divider: {
    width: '100%',
    borderBottom: '1px solid black',
  },
});

const menuId = 'primary-search-account-menu';

const RenderMenu = ({ anchorEl, isMenuOpen, handleMenuClose, classes, name }) => {
  const [open, setOpen] = useState(false);
  return (
    <Menu
      classes={{
        paper: classes.menu,
        list: classes.list,
      }}
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left' }}
      id={menuId}
      keepMounted
      transformOrigin={{ horizontal: 'left' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Logout handleClose={() => setOpen(false)} open={open} />
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
        className={classes.menuContainer}
      >
        <Grid item className={classes.divider}>
          <Typography className={classes.menuTitle}>{name}</Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.version}>V. 0.0.1</Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" className={classes.menuButton} onClick={() => setOpen(true)}>
            Sair
          </Button>
        </Grid>
      </Grid>
    </Menu>
  );
};

const UserInformations = ({ name }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Grid container alignItems="center">
        <Grid item>
          <Typography className={classes.userTitle}>{name}</Typography>
        </Grid>
        <Grid item>
          <IconButton
            aria-haspopup="true"
            aria-label="Informações do Sistema e Logout"
            onClick={handleProfileMenuOpen}
            disableRipple
            classes={{
              root: classes.actionButton,
            }}
          >
            <ReactSVG src={DropDownIcon} />
          </IconButton>
        </Grid>
      </Grid>
      <RenderMenu
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        classes={classes}
        name={name}
      />
    </div>
  );
};

RenderMenu.propTypes = {
  anchorEl: PropTypes.node.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  handleMenuClose: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
};

UserInformations.propTypes = {
  name: PropTypes.string.isRequired,
};

const mapStateToProps = ({ login: { name } }) => ({ name: name.toUpperCase() });

export default connect(mapStateToProps)(UserInformations);
