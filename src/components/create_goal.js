import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-materialize';
import EditGoal from './edit_goal';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  triggerButton: PropTypes.node,
};

const defaultProps = {
  triggerButton: <Button floating large className="add-goal red" waves="light" icon="add" />,
};

function CreateGoal({ handleSubmit, triggerButton }) {
  return <EditGoal handleSubmit={handleSubmit} triggerButton={triggerButton} />;
}

CreateGoal.propTypes = propTypes;
CreateGoal.defaultProps = defaultProps;

export default CreateGoal;
