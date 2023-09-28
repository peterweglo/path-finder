class PathFinder {
  constructor() {
    const thisPathFinder = this;
    thisPathFinder.flag = 0;
    thisPathFinder.shortestPath = [];
    thisPathFinder.rows = 10;
    thisPathFinder.cols = 10;
    thisPathFinder.renderGrid();
    thisPathFinder.getElements();
    thisPathFinder.chooseSquares();
    thisPathFinder.initAction();
  }

  getElements() {
    const thisPathFinder = this;
    const element = thisPathFinder.dom.wrapper;
    thisPathFinder.dom.squares = element.querySelectorAll('.square');
    // console.log('squares', thisPathFinder.dom.squares);
    thisPathFinder.dom.btn = document.querySelector('button');
    thisPathFinder.dom.subtitle = document.querySelector(
      '.pathfinder-subtitle'
    );
  }

  renderGrid() {
    const thisPathFinder = this;
    thisPathFinder.dom = {};
    thisPathFinder.dom.wrapper = document.querySelector('.game-field');
    thisPathFinder.dom.wrapper.innerHTML = '';
    for (let row = 0; row < thisPathFinder.rows; row++) {
      for (let col = 0; col < thisPathFinder.cols; col++) {
        let square = document.createElement('div');
        square.classList.add('square');
        square.dataset.row = row;
        square.dataset.col = col;
        thisPathFinder.dom.wrapper.appendChild(square);
      }
    }
  }

  chooseSquares() {
    const thisPathFinder = this;
    thisPathFinder.graph = {};

    for (let square of thisPathFinder.dom.squares) {
      square.addEventListener('click', function () {
        thisPathFinder.clickedSquareIndexRow = parseInt(
          square.getAttribute('data-row')
        );
        thisPathFinder.clickedSquareIndexCol = parseInt(
          square.getAttribute('data-col')
        );
        const squareId = `${thisPathFinder.clickedSquareIndexRow}-${thisPathFinder.clickedSquareIndexCol}`;

        if (!square.classList.contains('clicked')) {
          if (thisPathFinder.flag === 0) {
            console.log('thisPathFinder.flag ', thisPathFinder.flag);
            const clickedElement = this;
            clickedElement.classList.add('clicked');

            thisPathFinder.flag = 1;

            thisPathFinder.graph[squareId] = [];
          }
          if (thisPathFinder.flag === 1) {
            const clickedElement = this;

            thisPathFinder.squareId = `${thisPathFinder.clickedSquareIndexRow}-${thisPathFinder.clickedSquareIndexCol}`;
            // thisPathFinder.graph[thisPathFinder.squareId] = [];

            if (thisPathFinder.clickedSquareIndexRow - 1 >= 0) {
              const neighborSquare = thisPathFinder.dom.wrapper.querySelector(
                `[data-row="${
                  thisPathFinder.clickedSquareIndexRow - 1
                }"][data-col="${thisPathFinder.clickedSquareIndexCol}"]`
              );
              if (
                neighborSquare &&
                neighborSquare.classList.contains('clicked')
              ) {
                clickedElement.classList.add('clicked');
                clickedElement.classList.remove('neighbour');
                thisPathFinder.graph[thisPathFinder.squareId] = [];
              }
            }

            if (
              thisPathFinder.clickedSquareIndexRow + 1 <
              thisPathFinder.rows
            ) {
              const neighborSquare = thisPathFinder.dom.wrapper.querySelector(
                `[data-row="${
                  thisPathFinder.clickedSquareIndexRow + 1
                }"][data-col="${thisPathFinder.clickedSquareIndexCol}"]`
              );
              if (
                neighborSquare &&
                neighborSquare.classList.contains('clicked')
              ) {
                clickedElement.classList.add('clicked');
                clickedElement.classList.remove('neighbour');
                thisPathFinder.graph[thisPathFinder.squareId] = [];
              }
            }

            if (thisPathFinder.clickedSquareIndexCol - 1 >= 0) {
              const neighborSquare = thisPathFinder.dom.wrapper.querySelector(
                `[data-row="${
                  thisPathFinder.clickedSquareIndexRow
                }"][data-col="${thisPathFinder.clickedSquareIndexCol - 1}"]`
              );
              if (
                neighborSquare &&
                neighborSquare.classList.contains('clicked')
              ) {
                clickedElement.classList.add('clicked');
                clickedElement.classList.remove('neighbour');
                thisPathFinder.graph[thisPathFinder.squareId] = [];
              }
            }

            if (
              thisPathFinder.clickedSquareIndexCol + 1 <
              thisPathFinder.cols
            ) {
              const neighborSquare = thisPathFinder.dom.wrapper.querySelector(
                `[data-row="${
                  thisPathFinder.clickedSquareIndexRow
                }"][data-col="${thisPathFinder.clickedSquareIndexCol + 1}"]`
              );
              if (
                neighborSquare &&
                neighborSquare.classList.contains('clicked')
              ) {
                clickedElement.classList.add('clicked');
                clickedElement.classList.remove('neighbour');
                thisPathFinder.graph[thisPathFinder.squareId] = [];
              }
            }

            if (thisPathFinder.clickedSquareIndexRow - 1 >= 0) {
              thisPathFinder.neighborId = `${
                thisPathFinder.clickedSquareIndexRow - 1
              }-${thisPathFinder.clickedSquareIndexCol}`;
              if (
                thisPathFinder.dom.wrapper
                  .querySelector(
                    `[data-row="${
                      thisPathFinder.clickedSquareIndexRow - 1
                    }"][data-col="${thisPathFinder.clickedSquareIndexCol}"]`
                  )
                  .classList.contains('clicked')
              ) {
                thisPathFinder.graph[thisPathFinder.squareId].push(
                  thisPathFinder.neighborId
                );
                thisPathFinder.graph[thisPathFinder.neighborId].push(
                  thisPathFinder.squareId
                );
              }
            }
            if (
              thisPathFinder.clickedSquareIndexRow + 1 <
              thisPathFinder.rows
            ) {
              const neighborId = `${thisPathFinder.clickedSquareIndexRow + 1}-${
                thisPathFinder.clickedSquareIndexCol
              }`;
              if (
                thisPathFinder.dom.wrapper
                  .querySelector(
                    `[data-row="${
                      thisPathFinder.clickedSquareIndexRow + 1
                    }"][data-col="${thisPathFinder.clickedSquareIndexCol}"]`
                  )
                  .classList.contains('clicked')
              ) {
                thisPathFinder.graph[thisPathFinder.squareId].push(neighborId);
                thisPathFinder.graph[neighborId].push(thisPathFinder.squareId);
              }
            }
            if (thisPathFinder.clickedSquareIndexCol - 1 >= 0) {
              const neighborId = `${thisPathFinder.clickedSquareIndexRow}-${
                thisPathFinder.clickedSquareIndexCol - 1
              }`;
              if (
                thisPathFinder.dom.wrapper
                  .querySelector(
                    `[data-row="${
                      thisPathFinder.clickedSquareIndexRow
                    }"][data-col="${thisPathFinder.clickedSquareIndexCol - 1}"]`
                  )
                  .classList.contains('clicked')
              ) {
                thisPathFinder.graph[thisPathFinder.squareId].push(neighborId);
                thisPathFinder.graph[neighborId].push(thisPathFinder.squareId);
              }
            }
            if (
              thisPathFinder.clickedSquareIndexCol + 1 <
              thisPathFinder.cols
            ) {
              const neighborId = `${thisPathFinder.clickedSquareIndexRow}-${
                thisPathFinder.clickedSquareIndexCol + 1
              }`;
              if (
                thisPathFinder.dom.wrapper
                  .querySelector(
                    `[data-row="${
                      thisPathFinder.clickedSquareIndexRow
                    }"][data-col="${thisPathFinder.clickedSquareIndexCol + 1}"]`
                  )
                  .classList.contains('clicked')
              ) {
                thisPathFinder.graph[thisPathFinder.squareId].push(neighborId);
                thisPathFinder.graph[neighborId].push(thisPathFinder.squareId);
              }
            }

            console.log(thisPathFinder.graph);
          }
        } else if (square.classList.contains('clicked')) {
          if (thisPathFinder.flag === 1) {
            square.classList.remove('clicked');

            delete thisPathFinder.graph[squareId];

            for (const squareArrayID in thisPathFinder.graph) {
              const squareArray = thisPathFinder.graph[squareArrayID];
              if (squareArray.includes(squareId)) {
                const indexOfSquareID = squareArray.indexOf(squareId);
                squareArray.splice(indexOfSquareID, 1);
              }
            }
          }
          console.log(thisPathFinder.graph);
          if (Object.keys(thisPathFinder.graph).length === 0) {
            thisPathFinder.flag = 0;
          }
        }

        thisPathFinder.addNeighbour();
      });
    }
  }

  addNeighbour() {
    const thisPathFinder = this;
    if (thisPathFinder.flag === 0 || thisPathFinder.flag === 1) {
      for (let square of thisPathFinder.dom.squares) {
        square.classList.remove('neighbour');
      }
      for (let square of thisPathFinder.dom.squares) {
        thisPathFinder.squareIndexRow = parseInt(
          square.getAttribute('data-row')
        );
        thisPathFinder.squareIndexCol = parseInt(
          square.getAttribute('data-col')
        );

        if (square.classList.contains('clicked')) {
          if (thisPathFinder.squareIndexCol - 1 >= 0) {
            const neighborSquare = thisPathFinder.dom.wrapper.querySelector(
              `[data-row="${thisPathFinder.squareIndexRow}"][data-col="${
                thisPathFinder.squareIndexCol - 1
              }"]`
            );
            if (
              neighborSquare &&
              !neighborSquare.classList.contains('clicked')
            ) {
              neighborSquare.classList.add('neighbour');
            }
          }
          if (thisPathFinder.squareIndexCol + 1 < thisPathFinder.cols) {
            const neighborSquare = thisPathFinder.dom.wrapper.querySelector(
              `[data-row="${thisPathFinder.squareIndexRow}"][data-col="${
                thisPathFinder.squareIndexCol + 1
              }"]`
            );
            if (
              neighborSquare &&
              !neighborSquare.classList.contains('clicked')
            ) {
              neighborSquare.classList.add('neighbour');
            }
          }
          if (thisPathFinder.squareIndexRow - 1 >= 0) {
            const neighborSquare = thisPathFinder.dom.wrapper.querySelector(
              `[data-row="${thisPathFinder.squareIndexRow - 1}"][data-col="${
                thisPathFinder.squareIndexCol
              }"]`
            );
            if (
              neighborSquare &&
              !neighborSquare.classList.contains('clicked')
            ) {
              neighborSquare.classList.add('neighbour');
            }
          }
          if (thisPathFinder.squareIndexRow + 1 < thisPathFinder.rows) {
            const neighborSquare = thisPathFinder.dom.wrapper.querySelector(
              `[data-row="${thisPathFinder.squareIndexRow + 1}"][data-col="${
                thisPathFinder.squareIndexCol
              }"]`
            );
            if (
              neighborSquare &&
              !neighborSquare.classList.contains('clicked')
            ) {
              neighborSquare.classList.add('neighbour');
            }
          }
        }
      }
    }
  }

  initAction() {
    const thisPathFinder = this;
    thisPathFinder.dom.btn.addEventListener('click', function () {
      if (thisPathFinder.flag === 1) {
        const clickedSquares =
          thisPathFinder.dom.wrapper.querySelectorAll('.square.clicked');

        if (clickedSquares.length < 2) {
          alert('Choose at least dwo squares');
          return;
        }
        thisPathFinder.flag = 2;
        thisPathFinder.dom.subtitle.textContent = 'Pick start and finish';
        thisPathFinder.dom.btn.textContent = 'compute';
        thisPathFinder.dom.clickedSquares =
          thisPathFinder.dom.wrapper.querySelectorAll('.square.clicked');
        console.log(
          'thisPathFinder.dom.clickedSquares',
          thisPathFinder.dom.clickedSquares
        );
        thisPathFinder.chooseStartEnd();
      } else if (thisPathFinder.flag === 4) {
        thisPathFinder.dom.subtitle.textContent = 'The best route is...';
        thisPathFinder.dom.btn.textContent = 'statr again';
        thisPathFinder.findShortestPath();
      } else if (thisPathFinder.flag === 5) {
        thisPathFinder.reset();
      }
    });
  }

  chooseStartEnd() {
    const thisPathFinder = this;

    for (let square of thisPathFinder.dom.clickedSquares) {
      square.addEventListener('click', function () {
        const clickedElement = this;
        console.log('thisPathFinder.flag', thisPathFinder.flag);
        for (let square of thisPathFinder.dom.squares) {
          square.classList.remove('neighbour');
        }
        if (thisPathFinder.flag === 2) {
          clickedElement.classList.add('start');
          const startIndexRow = parseInt(square.getAttribute('data-row'));
          const startIndexCol = parseInt(square.getAttribute('data-col'));
          thisPathFinder.startPoint = `${startIndexRow}-${startIndexCol}`;
          console.log('startPoint', thisPathFinder.startPoint);

          thisPathFinder.flag = 3;
        } else if (thisPathFinder.flag === 3) {
          clickedElement.classList.add('end');
          const endIndexRow = parseInt(square.getAttribute('data-row'));
          const endIndexCol = parseInt(square.getAttribute('data-col'));
          thisPathFinder.endPoint = `${endIndexRow}-${endIndexCol}`;
          console.log('endPoint', thisPathFinder.endPoint);
          thisPathFinder.flag = 4;
        }
      });
    }
  }

  findShortestPath() {
    const thisPathFinder = this;
    thisPathFinder.flag = 5;
    const queue = [{ node: thisPathFinder.startPoint, path: [] }];
    console.log('queue', queue);
    const visited = new Set();

    while (queue.length > 0) {
      const { node, path } = queue.shift();

      if (node === thisPathFinder.endPoint) {
        thisPathFinder.shortestPath = path.concat(node);

        for (const node of thisPathFinder.shortestPath) {
          const [row, col] = node.split('-');
          const square = thisPathFinder.dom.wrapper.querySelector(
            `[data-row="${row}"][data-col="${col}"]`
          );
          square.className = 'square shortest';
        }
        console.log('thisPathFinder.shortestPath', thisPathFinder.shortestPath);
        return thisPathFinder.shortestPath;
      }

      if (!visited.has(node)) {
        visited.add(node);

        for (const neighbor of thisPathFinder.graph[node]) {
          if (!visited.has(neighbor)) {
            queue.push({ node: neighbor, path: path.concat(node) });
          }
        }
      }
    }

    alert('The shortest path not found');
  }
  reset() {
    const thisPathFinder = this;
    thisPathFinder.flag = 0;
    thisPathFinder.graph = {};
    thisPathFinder.startPoint = null;
    thisPathFinder.endPoint = null;
    thisPathFinder.renderGrid();
    thisPathFinder.getElements();
    thisPathFinder.chooseSquares();

    thisPathFinder.dom.subtitle.textContent = 'Draw routes';
    thisPathFinder.dom.btn.textContent = 'Finish drawning';
  }
}
export default PathFinder;
