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

const getItemStyles = (
  initialOffset,
  currentOffset,
  clientOffset,
  itemType
) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none"
    };
  }

  let { x, y } = clientOffset;
  // const shipLength = parseShipLength(itemType);

  // if (Math.abs(window.innerWidth - x) < 30 * shipLength + 5 + 2 * shipLength) {
  //   return {
  //     left: window.innerWidth - 30 * shipLength + 5 + 2 * shipLength,
  //     top: y - 15
  //   };
  // }
  //   const transform = `translate(${x}px, ${y}px)`;

  //   return {
  //     transform,
  //     WebkitTransform: transform
  //   };
  // console.log(`x : ${x}, y : ${y}`);
  // console.log(`width : ${window.innerWidth}, heigth : ${window.innerHeight}`);
  return {
    left: x,
    top: y - 15
  };
};

const CustomDragLayerSlow = () => {
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

    return (
      <img
        src={`${_imageBase}${shipName}.png`}
        alt="ship_preview"
        style={{ width: `${30 * shipLength}px` }}
      />
    );
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

const CustomDragLayer = React.memo(CustomDragLayerSlow);

export default CustomDragLayer;
