import React, { Component } from 'react';
import { Modal, Button, Row, Input, Collapsible, CollapsibleItem } from 'react-materialize';
import PropTypes from 'prop-types';
import { merge, cloneDeep } from 'lodash';

const emptyGoal = {
  id: 0,
  name: '',
  updateInterval: 'day',
  description: '',
  accumulatorKey: '',
  accumulatorIncrement: '',
  accumulatorDescription: '',
};

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  triggerButton: PropTypes.node,
  modalId: PropTypes.string,
  actionButtonLabel: PropTypes.string,
  header: PropTypes.string,
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
  header: 'Add a New Goal',
  goal: cloneDeep(emptyGoal),
};

class GoalModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitDisabled: true,
      values: props.goal,
      modalOpen: false,
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
    this.setState({
      modalOpen: true,
      values: merge(this.state.values, { [field]: event.target.value }),
    });
    if (this.isFormValid()) {
      this.setState({ isSubmitDisabled: false });
    } else {
      this.setState({ isSubmitDisabled: true });
    }
  }

  handleSubmit() {
    const { values } = this.state;
    this.setState({ values: cloneDeep(emptyGoal), modalOpen: false });
    return this.props.handleSubmit(values);
  }

  handleKeyDown(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      if (this.isFormValid()) {
        return this.handleSubmit();
      }
    }
    return this.setState({ modalOpen: true });
  }

  isFormValid() {
    return this.state.values.name !== '' && this.state.values.description !== '';
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
        header={this.props.header}
        trigger={this.props.triggerButton}
        actions={actionButton}
        id={this.props.modalId}
        open={this.state.modalOpen}
        fixedFooter // can we set this dynamically? should only be fixed if content is taller than modal
      >
        <form onSubmit={this.handleSubmit}>
          <Collapsible defaultActiveKey={0}>
            <CollapsibleItem header="Describe Goal">
              <Row>
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
                  label="How often do you want to check in?"
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
              </Row>
            </CollapsibleItem>

            <CollapsibleItem header="Tracking">
              Do you want to track anything as you progress?<br />
              <span className="subtle">
                {
                  "This is passive and should only be a rough estimate, we'll do this automatically when you check in."
                }
                <br />
                {"We're after overall progress / improvement rather than strict measurement."}
              </span>
              <Row>
                <Input
                  s={6}
                  label="What do you want to track? (ex km run)"
                  value={this.state.values.accumulatorKey}
                  onKeyDown={this.handleKeyDown}
                  onChange={e => this.handleChange('accumulatorKey', e)}
                />
                <Input
                  s={6}
                  label={`How much do you expect to track every ${
                    this.state.values.updateInterval
                  }? (ex 4)`}
                  value={this.state.values.accumulatorIncrement}
                  onKeyDown={this.handleKeyDown}
                  onChange={e => this.handleChange('accumulatorIncrement', e)}
                />
              </Row>
              <em>
                I expect to track <b>{this.state.values.accumulatorIncrement || '4'} </b>
                <b>{this.state.values.accumulatorKey || 'km run'}</b> every{' '}
                {this.state.values.updateInterval}.
              </em>
            </CollapsibleItem>
          </Collapsible>
        </form>
      </Modal>
    );
  }
}

GoalModal.propTypes = propTypes;
GoalModal.defaultProps = defaultProps;

export default GoalModal;
