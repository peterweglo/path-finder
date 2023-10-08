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
    thisPathFinder.dom.button = document.querySelector('button');
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

        const prevSquareIndexCol = thisPathFinder.squareIndexCol - 1;
        const nextSquareIndexCol = thisPathFinder.squareIndexCol + 1;
        const nextSquareIndexRow = thisPathFinder.squareIndexRow + 1;
        const prevSquareIndexRow = thisPathFinder.squareIndexRow - 1;

        if (square.classList.contains('clicked')) {
          if (prevSquareIndexCol >= 0) {
            const neighbourSquare = thisPathFinder.dom.wrapper.querySelector(
              `[data-row="${thisPathFinder.squareIndexRow}"][data-col="${prevSquareIndexCol}"]`
            );

            if (
              neighbourSquare &&
              !neighbourSquare.classList.contains('clicked')
            ) {
              neighbourSquare.classList.add('neighbour');
            }
          }
          if (nextSquareIndexCol < thisPathFinder.cols) {
            const neighbourSquare = thisPathFinder.dom.wrapper.querySelector(
              `[data-row="${thisPathFinder.squareIndexRow}"][data-col="${nextSquareIndexCol}"]`
            );
            if (
              neighbourSquare &&
              !neighbourSquare.classList.contains('clicked')
            ) {
              neighbourSquare.classList.add('neighbour');
            }
          }
          if (prevSquareIndexRow >= 0) {
            const neighbourSquare = thisPathFinder.dom.wrapper.querySelector(
              `[data-row="${prevSquareIndexRow}"][data-col="${thisPathFinder.squareIndexCol}"]`
            );
            if (
              neighbourSquare &&
              !neighbourSquare.classList.contains('clicked')
            ) {
              neighbourSquare.classList.add('neighbour');
            }
          }
          if (nextSquareIndexRow < thisPathFinder.rows) {
            const neighbourSquare = thisPathFinder.dom.wrapper.querySelector(
              `[data-row="${nextSquareIndexRow}"][data-col="${thisPathFinder.squareIndexCol}"]`
            );
            if (
              neighbourSquare &&
              !neighbourSquare.classList.contains('clicked')
            ) {
              neighbourSquare.classList.add('neighbour');
            }
          }
        }
      }
    }
  }

  pathExist(startPoint, endPoint) {
    const thisPathFinder = this;
    const visited = new Set();
    const queue = [startPoint];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      if (currentNode === endPoint) {
        return true;
      }

      visited.add(currentNode);

      for (const neighbour of thisPathFinder.copyOfGraph[currentNode]) {
        if (!visited.has(neighbour)) {
          queue.push(neighbour);
        }
      }
    }
    return false;
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

        const prevClickedSquareIndexRow =
          thisPathFinder.clickedSquareIndexRow - 1;
        const nextClickedSquareIndexRow =
          thisPathFinder.clickedSquareIndexRow + 1;
        const prevClickedSquareIndexCol =
          thisPathFinder.clickedSquareIndexCol - 1;
        const nextClickedSquareIndexCol =
          thisPathFinder.clickedSquareIndexCol + 1;

        if (!square.classList.contains('clicked')) {
          if (thisPathFinder.flag === 0) {
            const clickedElement = this;
            clickedElement.classList.add('clicked');

            thisPathFinder.flag = 1;

            thisPathFinder.graph[squareId] = [];
          }
          if (thisPathFinder.flag === 1) {
            const clickedElement = this;

            thisPathFinder.squareId = `${thisPathFinder.clickedSquareIndexRow}-${thisPathFinder.clickedSquareIndexCol}`;

            const addClickedRemoveNeighbour = function () {
              clickedElement.classList.add('clicked');
              clickedElement.classList.remove('neighbour');
              thisPathFinder.graph[thisPathFinder.squareId] = [];
            };

            if (prevClickedSquareIndexRow >= 0) {
              const neighbourSquare = thisPathFinder.dom.wrapper.querySelector(
                `[data-row="${prevClickedSquareIndexRow}"][data-col="${thisPathFinder.clickedSquareIndexCol}"]`
              );
              if (
                neighbourSquare &&
                neighbourSquare.classList.contains('clicked')
              )
                addClickedRemoveNeighbour();
            }

            if (nextClickedSquareIndexRow < thisPathFinder.rows) {
              const neighbourSquare = thisPathFinder.dom.wrapper.querySelector(
                `[data-row="${nextClickedSquareIndexRow}"][data-col="${thisPathFinder.clickedSquareIndexCol}"]`
              );
              if (
                neighbourSquare &&
                neighbourSquare.classList.contains('clicked')
              )
                addClickedRemoveNeighbour();
            }

            if (prevClickedSquareIndexCol >= 0) {
              const neighbourSquare = thisPathFinder.dom.wrapper.querySelector(
                `[data-row="${thisPathFinder.clickedSquareIndexRow}"][data-col="${prevClickedSquareIndexCol}"]`
              );
              if (
                neighbourSquare &&
                neighbourSquare.classList.contains('clicked')
              )
                addClickedRemoveNeighbour();
            }

            if (nextClickedSquareIndexCol < thisPathFinder.cols) {
              const neighbourSquare = thisPathFinder.dom.wrapper.querySelector(
                `[data-row="${thisPathFinder.clickedSquareIndexRow}"][data-col="${nextClickedSquareIndexCol}"]`
              );
              if (
                neighbourSquare &&
                neighbourSquare.classList.contains('clicked')
              )
                addClickedRemoveNeighbour();
            }

            if (prevClickedSquareIndexRow >= 0) {
              const neighbourId = `${prevClickedSquareIndexRow}-${thisPathFinder.clickedSquareIndexCol}`;
              if (
                thisPathFinder.dom.wrapper
                  .querySelector(
                    `[data-row="${prevClickedSquareIndexRow}"][data-col="${thisPathFinder.clickedSquareIndexCol}"]`
                  )
                  .classList.contains('clicked')
              ) {
                thisPathFinder.graph[thisPathFinder.squareId].push(neighbourId);
                thisPathFinder.graph[neighbourId].push(thisPathFinder.squareId);
              }
            }
            if (nextClickedSquareIndexRow < thisPathFinder.rows) {
              const neighbourId = `${nextClickedSquareIndexRow}-${thisPathFinder.clickedSquareIndexCol}`;
              if (
                thisPathFinder.dom.wrapper
                  .querySelector(
                    `[data-row="${nextClickedSquareIndexRow}"][data-col="${thisPathFinder.clickedSquareIndexCol}"]`
                  )
                  .classList.contains('clicked')
              ) {
                thisPathFinder.graph[thisPathFinder.squareId].push(neighbourId);
                thisPathFinder.graph[neighbourId].push(thisPathFinder.squareId);
              }
            }
            if (prevClickedSquareIndexCol >= 0) {
              const neighbourId = `${thisPathFinder.clickedSquareIndexRow}-${prevClickedSquareIndexCol}`;
              if (
                thisPathFinder.dom.wrapper
                  .querySelector(
                    `[data-row="${thisPathFinder.clickedSquareIndexRow}"][data-col="${prevClickedSquareIndexCol}"]`
                  )
                  .classList.contains('clicked')
              ) {
                thisPathFinder.graph[thisPathFinder.squareId].push(neighbourId);
                thisPathFinder.graph[neighbourId].push(thisPathFinder.squareId);
              }
            }
            if (nextClickedSquareIndexCol < thisPathFinder.cols) {
              const neighbourId = `${thisPathFinder.clickedSquareIndexRow}-${nextClickedSquareIndexCol}`;
              if (
                thisPathFinder.dom.wrapper
                  .querySelector(
                    `[data-row="${thisPathFinder.clickedSquareIndexRow}"][data-col="${nextClickedSquareIndexCol}"]`
                  )
                  .classList.contains('clicked')
              ) {
                thisPathFinder.graph[thisPathFinder.squareId].push(neighbourId);
                thisPathFinder.graph[neighbourId].push(thisPathFinder.squareId);
              }
            }
          }
        } else if (square.classList.contains('clicked')) {
          if (thisPathFinder.flag === 1) {
            const neighbours = thisPathFinder.graph[squareId];
            let pathFlag = true;
            console.log('neighbours', neighbours);

            thisPathFinder.copyOfGraph = JSON.parse(
              JSON.stringify(thisPathFinder.graph)
            );

            delete thisPathFinder.copyOfGraph[squareId];

            for (const thissquareArrayId in thisPathFinder.copyOfGraph) {
              const squareArray = thisPathFinder.copyOfGraph[thissquareArrayId];
              if (squareArray.includes(squareId)) {
                const indexOfSquareID = squareArray.indexOf(squareId);
                squareArray.splice(indexOfSquareID, 1);
              }
            }

            for (let i = 0; i < neighbours.length - 1; i++) {
              for (let j = i + 1; j < neighbours.length; j++) {
                if (!thisPathFinder.pathExist(neighbours[i], neighbours[j])) {
                  pathFlag = false;
                  break;
                }
              }
              if (!pathFlag) {
                alert('You can not break the path');
                break;
              }
            }
            if (pathFlag === true) {
              square.classList.remove('clicked');

              delete thisPathFinder.graph[squareId];

              for (const thissquareArrayId in thisPathFinder.graph) {
                const squareArray = thisPathFinder.graph[thissquareArrayId];
                if (squareArray.includes(squareId)) {
                  const indexOfSquareID = squareArray.indexOf(squareId);
                  squareArray.splice(indexOfSquareID, 1);
                }
              }
            }
            console.log('copyOfGraph', thisPathFinder.copyOfGraph);
            console.log('thisPathFinder.graph', thisPathFinder.graph);
          }
          if (Object.keys(thisPathFinder.graph).length === 0) {
            thisPathFinder.flag = 0;
          }
        }

        thisPathFinder.addNeighbour();
      });
    }
  }

  findShortestPath(startPoint, endPoint) {
    const thisPathFinder = this;
    thisPathFinder.flag = 5;
    const queue = [{ node: startPoint, path: [] }];
    const visited = new Set();

    while (queue.length > 0) {
      const { node, path } = queue.shift();

      if (node === endPoint) {
        thisPathFinder.shortestPath = path.concat(node);

        for (const node of thisPathFinder.shortestPath) {
          const [row, col] = node.split('-');
          const square = thisPathFinder.dom.wrapper.querySelector(
            `[data-row="${row}"][data-col="${col}"]`
          );
          square.className = 'square shortest';
        }
        return thisPathFinder.shortestPath;
      }

      if (!visited.has(node)) {
        visited.add(node);

        for (const neighbour of thisPathFinder.graph[node]) {
          if (!visited.has(neighbour)) {
            queue.push({ node: neighbour, path: path.concat(node) });
          }
        }
      }
    }

    alert('The shortest path not found');

    return false;
  }

  findAllPaths(startPoint, endPoint, currentPath = []) {
    const thisPathFinder = this;
    currentPath.push(startPoint);

    if (startPoint === endPoint) {
      return [currentPath];
    }

    const paths = [];
    const neighbours = thisPathFinder.graph[startPoint] || [];

    for (const neighbour of neighbours) {
      if (!currentPath.includes(neighbour)) {
        const newPaths = thisPathFinder.findAllPaths(neighbour, endPoint, [
          ...currentPath,
        ]);
        paths.push(...newPaths);
      }
    }

    return paths;
  }

  summary() {
    const thisPathFinder = this;
    thisPathFinder.allSquaresNumber = Object.keys(thisPathFinder.graph).length;
    thisPathFinder.shortestRouteLength = thisPathFinder.shortestPath.length;
    const allPaths = thisPathFinder.findAllPaths(
      thisPathFinder.startPoint,
      thisPathFinder.endPoint
    );
    thisPathFinder.longestPathLength = 0;
    for (const path of allPaths) {
      if (path.length > thisPathFinder.longestPathLength) {
        thisPathFinder.longestPathLength = path.length;
      }
    }

    // alert(
    //   ` Full route: ${thisPathFinder.allSquaresNumber}\n Shortest route: ${thisPathFinder.shortestRouteLength}\n The longest route: ${thisPathFinder.longestPathLength}`
    // );
  }

  initAction() {
    const thisPathFinder = this;
    thisPathFinder.dom.button.addEventListener('click', function () {
      if (thisPathFinder.flag === 1) {
        const clickedSquares =
          thisPathFinder.dom.wrapper.querySelectorAll('.square.clicked');

        if (clickedSquares.length < 2) {
          alert('Choose at least dwo squares');
          return;
        }
        thisPathFinder.flag = 2;
        thisPathFinder.dom.subtitle.textContent = 'Pick start and finish';
        thisPathFinder.dom.button.textContent = 'compute';
        thisPathFinder.dom.clickedSquares =
          thisPathFinder.dom.wrapper.querySelectorAll('.square.clicked');

        thisPathFinder.chooseStartEnd();
      } else if (thisPathFinder.flag === 4) {
        thisPathFinder.dom.subtitle.textContent = 'The best route is...';
        thisPathFinder.dom.button.textContent = 'start again';
        thisPathFinder.findShortestPath(
          thisPathFinder.startPoint,
          thisPathFinder.endPoint
        );
        thisPathFinder.summary();
        thisPathFinder.modal();
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
        for (let square of thisPathFinder.dom.squares) {
          square.classList.remove('neighbour');
        }
        if (thisPathFinder.flag === 2) {
          clickedElement.classList.add('start');
          const startIndexRow = parseInt(square.getAttribute('data-row'));
          const startIndexCol = parseInt(square.getAttribute('data-col'));
          thisPathFinder.startPoint = `${startIndexRow}-${startIndexCol}`;

          thisPathFinder.flag = 3;
        } else if (thisPathFinder.flag === 3) {
          clickedElement.classList.add('end');
          const endIndexRow = parseInt(square.getAttribute('data-row'));
          const endIndexCol = parseInt(square.getAttribute('data-col'));
          thisPathFinder.endPoint = `${endIndexRow}-${endIndexCol}`;
          thisPathFinder.flag = 4;
        }
      });
    }
  }

  modal() {
    const thisPathFinder = this;
    document.querySelector('.modal-wrap').classList.add('active');
    document.querySelector(
      '.modal-text .full'
    ).textContent = ` Full route: ${thisPathFinder.allSquaresNumber} fields`;
    document.querySelector(
      '.modal-text .shortest'
    ).textContent = `Shortest route: ${thisPathFinder.shortestRouteLength} fields`;
    document.querySelector(
      '.modal-text .longest'
    ).textContent = `The longest route: ${thisPathFinder.longestPathLength} fields`;

    document.querySelector('span.hide').addEventListener('click', function () {
      document.querySelector('.modal-wrap').classList.remove('active');
    });
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
    thisPathFinder.dom.button.textContent = 'Finish drawning';
  }
}
export default PathFinder;
