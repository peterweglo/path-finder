const rows = 10;
const cols = 10;

class PathFinder {
  constructor() {
    const thisPathFinder = this;
    thisPathFinder.flag = 0;
    thisPathFinder.shortestPath = [];
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
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
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
        if (thisPathFinder.flag === 0) {
          console.log('thisPathFinder.flag ', thisPathFinder.flag);
          const clickedElement = this;
          clickedElement.classList.add('clicked');
          const squareIndexRow = parseInt(square.getAttribute('data-row'));
          const squareIndexCol = parseInt(square.getAttribute('data-col'));
          console.log(squareIndexRow, squareIndexCol);

          const squareId = `${squareIndexRow}-${squareIndexCol}`;
          thisPathFinder.graph[squareId] = [];

          if (squareIndexRow - 1 >= 0) {
            const neighborId = `${squareIndexRow - 1}-${squareIndexCol}`;
            if (
              thisPathFinder.dom.wrapper
                .querySelector(
                  `[data-row="${
                    squareIndexRow - 1
                  }"][data-col="${squareIndexCol}"]`
                )
                .classList.contains('clicked')
            ) {
              thisPathFinder.graph[squareId].push(neighborId);
              thisPathFinder.graph[neighborId].push(squareId);
            }
          }
          if (squareIndexRow + 1 < rows) {
            const neighborId = `${squareIndexRow + 1}-${squareIndexCol}`;
            if (
              thisPathFinder.dom.wrapper
                .querySelector(
                  `[data-row="${
                    squareIndexRow + 1
                  }"][data-col="${squareIndexCol}"]`
                )
                .classList.contains('clicked')
            ) {
              thisPathFinder.graph[squareId].push(neighborId);
              thisPathFinder.graph[neighborId].push(squareId);
            }
          }
          if (squareIndexCol - 1 >= 0) {
            const neighborId = `${squareIndexRow}-${squareIndexCol - 1}`;
            if (
              thisPathFinder.dom.wrapper
                .querySelector(
                  `[data-row="${squareIndexRow}"][data-col="${
                    squareIndexCol - 1
                  }"]`
                )
                .classList.contains('clicked')
            ) {
              thisPathFinder.graph[squareId].push(neighborId);
              thisPathFinder.graph[neighborId].push(squareId);
            }
          }
          if (squareIndexCol + 1 < cols) {
            const neighborId = `${squareIndexRow}-${squareIndexCol + 1}`;
            if (
              thisPathFinder.dom.wrapper
                .querySelector(
                  `[data-row="${squareIndexRow}"][data-col="${
                    squareIndexCol + 1
                  }"]`
                )
                .classList.contains('clicked')
            ) {
              thisPathFinder.graph[squareId].push(neighborId);
              thisPathFinder.graph[neighborId].push(squareId);
            }
          }

          console.log(thisPathFinder.graph);
        }
      });
    }
  }

  initAction() {
    const thisPathFinder = this;
    thisPathFinder.dom.btn.addEventListener('click', function () {
      if (thisPathFinder.flag === 0) {
        const clickedSquares =
          thisPathFinder.dom.wrapper.querySelectorAll('.square.clicked');

        if (clickedSquares.length < 2) {
          alert('Choose at least dwo squares');
          return;
        }
        thisPathFinder.flag = 1;
        thisPathFinder.dom.subtitle.textContent = 'Pick start and finish';
        thisPathFinder.dom.btn.textContent = 'compute';
        thisPathFinder.dom.clickedSquares =
          thisPathFinder.dom.wrapper.querySelectorAll('.square.clicked');
        console.log(
          'thisPathFinder.dom.clickedSquares',
          thisPathFinder.dom.clickedSquares
        );
        thisPathFinder.chooseStartEnd();
      } else if (thisPathFinder.flag === 3) {
        thisPathFinder.dom.subtitle.textContent = 'The best route is...';
        thisPathFinder.dom.btn.textContent = 'statr again';
        thisPathFinder.findShortestPath();
      } else if (thisPathFinder.flag === 4) {
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
        if (thisPathFinder.flag === 1) {
          clickedElement.classList.add('start');
          const startIndexRow = parseInt(square.getAttribute('data-row'));
          const startIndexCol = parseInt(square.getAttribute('data-col'));
          thisPathFinder.startPoint = `${startIndexRow}-${startIndexCol}`;
          console.log('startPoint', thisPathFinder.startPoint);
          thisPathFinder.flag = 2;
        } else if (thisPathFinder.flag === 2) {
          clickedElement.classList.add('end');
          const endIndexRow = parseInt(square.getAttribute('data-row'));
          const endIndexCol = parseInt(square.getAttribute('data-col'));
          thisPathFinder.endPoint = `${endIndexRow}-${endIndexCol}`;
          console.log('endPoint', thisPathFinder.endPoint);
          thisPathFinder.flag = 3;
        }
      });
    }
  }

  findShortestPath() {
    const thisPathFinder = this;
    thisPathFinder.flag = 4;
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
