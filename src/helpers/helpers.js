const parseShipLength = shipType => {
  if (typeof shipType === "string") {
    const shipLength = Number(shipType.substr(shipType.indexOf("-") + 1, 1));

    return shipLength;
  }
};

const parseShipName = shipType => {
  if (typeof shipType === "string") {
    const shipName = shipType.substring(0, shipType.indexOf("-"));

    return shipName;
  }
};

const checkSurroundingCells = (x, y, m) => {
  const X = 0,
    Y = 1;
  const vectors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ];

  for (let i = 0; i < vectors.length; i++) {
    let vector = vectors[i];
    if (m[x + vector[X]] !== undefined) {
      if (m[x + vector[X]][y + vector[Y]] !== undefined) {
        if (m[x + vector[X]][y + vector[Y]].isShip === true) {
          return true;
        }
      }
    }
  }
  return false;
};

const parseId = id => {
  if (typeof id === "string") {
    const [firstIndex, secondIndex] = id.split("-");
    return [Number(firstIndex), Number(secondIndex)];
  }
};

export { parseShipLength, parseShipName, parseId, checkSurroundingCells };
