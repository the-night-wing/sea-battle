import React from "react";
import { useDragLayer } from "react-dnd";

import { parseShipName, parseShipLength } from "../../helpers";

const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%"
};

const _imageBase = "http://127.0.0.1:8080/";

const getItemStyles = (initialOffset, currentOffset, clientOffset) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none"
    };
  }
  let { x, y } = clientOffset;

  //   const transform = `translate(${x}px, ${y}px)`;

  //   return {
  //     transform,
  //     WebkitTransform: transform
  //   };
  return {
    left: x,
    top: y - 15
  };
};

const CustomDragLayer = () => {
  const {
    itemType,
    isDragging,
    clientOffset,
    initialOffset,
    currentOffset
  } = useDragLayer(monitor => ({
    clientOffset: monitor.getClientOffset(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }));

  function renderItem() {
    const shipName = parseShipName(itemType);
    const shipLength = parseShipLength(itemType);

    return <img src={`${_imageBase}${shipName}.png`} alt="ship_preview" />;
  }

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div
        style={{
          position: "absolute",
          ...getItemStyles(initialOffset, currentOffset, clientOffset, itemType)
        }}
      >
        {renderItem()}
      </div>
    </div>
  );
};

export default CustomDragLayer;
