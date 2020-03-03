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
    position: 'fixed'
  },
}));

export default function AlertSuccess() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="success" style={{ opacity: 0.5 }}>This is a success alert — check it out!</Alert>
    </div>
  );
}