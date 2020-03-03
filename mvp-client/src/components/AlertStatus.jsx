import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    zIndex: '100',
    // position: 'fixed'
  },
}));

export function AlertSuccess() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="success">Status has been updated!</Alert>
    </div>
  );
}

export function AlertError() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Alert severity="error">There is an error updating your status, please contact your care team.</Alert>
    </div>
  );
}