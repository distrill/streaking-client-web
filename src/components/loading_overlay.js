import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ProgressBar } from 'react-materialize';

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
};

function LoadingOverlay({ isFetching }) {
  return (
    <div className={`loading overlay ${isFetching ? '' : 'hide'}`}>
      <Row>
        <Col s={12}>
          <ProgressBar className="loading-progress" />
        </Col>
      </Row>
    </div>
  );
}

LoadingOverlay.propTypes = propTypes;

export default LoadingOverlay;
