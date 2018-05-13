import React, { Component } from 'react';
import { Modal, Button, Row, Input } from 'react-materialize';
import PropTypes from 'prop-types';
import { merge, omit, cloneDeep } from 'lodash';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  triggerButton: PropTypes.node,
  modalId: PropTypes.string,
  actionButtonLabel: PropTypes.string,
  goal: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    updateInterval: PropTypes.string,
    description: PropTypes.string,
    accumulatorKey: PropTypes.string,
    accumulatorIncrement: PropTypes.string,
    accumulatorDescription: PropTypes.string,
  }),
};

const defaultProps = {
  triggerButton: null,
  modalId: '',
  actionButtonLabel: 'CREATE',
  goal: {
    id: 0,
    name: '',
    updateInterval: 'day',
    description: '',
    accumulatorKey: '',
    accumulatorIncrement: '',
    accumulatorDescription: '',
  },
};

class GoalModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitDisabled: true,
      isModalOpen: false,
      values: props.goal,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
  }

  componentDidMount() {
    if (this.isFormValid()) {
      this.setState({
        isSubmitDisabled: false,
      });
    }
  }

  handleChange(field, event) {
    this.setState({ values: merge(this.state.values, { [field]: event.target.value }) });
    if (this.isFormValid()) {
      this.setState({ isSubmitDisabled: false });
    } else {
      this.setState({ isSubmitDisabled: true });
    }
  }

  handleSubmit() {
    const { values } = this.state;
    this.setState({ isModalOpen: false, values: cloneDeep(defaultProps.goal) });
    return this.props.handleSubmit(values);
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
    const values = Object.values(omit(this.state.values, 'id'));
    return values.filter(e => e).length === values.length;
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
        {this.props.actionButtonLabel}
      </Button>
    );

    return (
      <Modal
        header="Add a New Goal"
        trigger={this.props.triggerButton}
        actions={actionButton}
        open={this.state.isModalOpen}
        id={this.props.modalId}
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
GoalModal.defaultProps = defaultProps;

export default GoalModal;
