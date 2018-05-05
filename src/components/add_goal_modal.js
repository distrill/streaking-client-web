import React, { Component } from 'react';
import { Modal, Button, Row, Input } from 'react-materialize';
import PropTypes from 'prop-types';
import { merge, cloneDeep } from 'lodash';

const propTypes = {
  createGoal: PropTypes.func.isRequired,
};

const baseValuesState = {
  name: '',
  updateInterval: 'day',
  description: '',
  accumulatorKey: '',
  accumulatorIncrement: '',
  accumulatorDescription: '',
};

class GoalModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitDisabled: true,
      isModalOpen: false,
      values: cloneDeep(baseValuesState),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
  }

  handleChange(field, event) {
    this.setState({ values: merge(this.state.values, { [field]: event.target.value }) });
    if (this.isFormValid()) {
      this.setState({ isSubmitDisabled: false });
    } else {
      this.setState({ isSubmitDisabled: true });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  handleSubmit() {
    const { values } = this.state;
    this.setState({ isModalOpen: false, values: cloneDeep(baseValuesState) });
    return this.props.createGoal(values).then(() => console.log('submit as'));
  }

  handleKeyDown(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      if (this.isFormValid()) {
        return this.handleSubmit();
      }
    }
    return this.setState({ isModalOpen: true });
  }

  isFormValid() {
    return (
      Object.values(this.state.values).filter(e => e).length ===
      Object.values(this.state.values).length
    );
  }

  render() {
    const actionButton = (
      <Button
        disabled={this.state.isSubmitDisabled}
        className="modal-close"
        waves="light"
        type="submit"
        name="action"
        onClick={this.handleSubmit}
      >
        Create
      </Button>
    );

    const triggerButton = <Button floating large className="red" waves="light" icon="add" />;

    return (
      <Modal
        header="Add a New Goal"
        trigger={triggerButton}
        actions={actionButton}
        open={this.state.isModalOpen}
      >
        <Row>
          <form onSubmit={this.handleSubmit}>
            <Input
              s={6}
              label="Name"
              value={this.state.values.name}
              onKeyDown={this.handleKeyDown}
              onChange={e => this.handleChange('name', e)}
            />

            <Input
              s={6}
              type="select"
              label="Update Interval"
              value={this.state.values.updateInterval}
              onKeyDown={this.handleKeyDown}
              onChange={e => this.handleChange('updateInterval', e)}
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </Input>
            <Input
              s={12}
              label="Description"
              value={this.state.values.description}
              onKeyDown={this.handleKeyDown}
              onChange={e => this.handleChange('description', e)}
            />
            <Input
              s={6}
              label="Accumulator Key"
              value={this.state.values.accumulatorKey}
              onKeyDown={this.handleKeyDown}
              onChange={e => this.handleChange('accumulatorKey', e)}
            />
            <Input
              s={6}
              label="Accumulator Increment"
              value={this.state.values.accumulatorIncrement}
              onKeyDown={this.handleKeyDown}
              onChange={e => this.handleChange('accumulatorIncrement', e)}
            />
            <Input
              s={12}
              label="Accumulator Description"
              value={this.state.values.accumulatorDescription}
              onKeyDown={this.handleKeyDown}
              onChange={e => this.handleChange('accumulatorDescription', e)}
            />
          </form>
        </Row>
      </Modal>
    );
  }
}

GoalModal.propTypes = propTypes;

export default GoalModal;
