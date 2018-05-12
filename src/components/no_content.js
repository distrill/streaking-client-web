import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'react-materialize';

const propTypes = {
  goalsLength: PropTypes.number.isRequired,
};

function NoContent({ goalsLength }) {
  return (
    <div>
      {goalsLength === 0 && (
        <Row>
          <Col s={6} offset="s3">
            <Card className="grey lighten-4" title="Get started by adding a goal below!" />
          </Col>
        </Row>
      )}
    </div>
  );
}

NoContent.propTypes = propTypes;

export default NoContent;
