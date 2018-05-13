import React from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import { Button, Modal } from 'react-materialize';
import { baseColors } from './../config';

const propTypes = {
  modalId: PropTypes.string.isRequired,
  updateColor: PropTypes.func.isRequired,
};

function PickColor({ modalId, updateColor }) {
  async function handleClick(color) {
    await updateColor(color);
    // ew. jquery is required by react-materialize.
    // see https://react-materialize.github.io/#/modals
    // eslint-disable-next-line no-undef
    $(`#${modalId}`).modal('close');
  }
  return (
    <Modal header="Set Goal Color" id={modalId}>
      <div className="colors-container">
        {baseColors.map(color => {
          const key = shortId.generate();
          return (
            <Button
              key={key}
              className={`${color} color-button`}
              onClick={() => handleClick(color)}
            />
          );
        })}
      </div>
    </Modal>
  );
}

PickColor.propTypes = propTypes;

export default PickColor;
