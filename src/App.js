import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./App.css";

const Card = ({ title }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
    </div>
  );
};

const App = () => {
  const [columns, setColumns] = useState({
    "column-1": [
      { id: "1", title: "Chips" },
      { id: "2", title: "Berry" },
      { id: "3", title: "Glue" },
      { id: "4", title: "Popcorn" },
    ],
    "column-2": [
      { id: "5", title: "Onion" },
      { id: "6", title: "Fries" },
      { id: "7", title: "Meat" },
      { id: "8", title: "Mug" },
    ],
    "column-3": [
      { id: "9", title: "Candy" },
      { id: "10", title: "Biscuit" },
      { id: "11", title: "Hammer" },
      { id: "12", title: "Screw" },
    ],
    "column-4": [
      { id: "13", title: "Apple" },
      { id: "14", title: "Smoothie" },
      { id: "15", title: "Cheese" },
      { id: "16", title: "Book" },
    ],
    "column-5": [
      { id: "17", title: "Orange" },
      { id: "18", title: "Pudding" },
      { id: "19", title: "Toffee" },
      { id: "20", title: "Rolls" },
    ],
    "column-6": [
      { id: "21", title: "Cucumber" },
      { id: "22", title: "Cocktail" },
      { id: "23", title: "Mojito" },
      { id: "24", title: "Jelly" },
    ],
  });

  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    const startColumn = Array.from(columns[source.droppableId]);
    const [movedItem] = startColumn.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      startColumn.splice(destination.index, 0, movedItem);
      setColumns((prevColumns) => ({
        ...prevColumns,
        [source.droppableId]: startColumn,
      }));
    } else {
      const finishColumn = Array.from(columns[destination.droppableId]);
      finishColumn.splice(destination.index, 0, movedItem);

      setColumns((prevColumns) => ({
        ...prevColumns,
        [source.droppableId]: startColumn,
        [destination.droppableId]: finishColumn,
      }));
    }
  };

  const colors = ["white", "antiquewhite"];

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="row">
          {Object.entries(columns).map(([columnId, columnData], index) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided, snapshot) => {
                const borderColor = snapshot.isDraggingOver ? "green" : "white";
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="column"
                    style={{
                      backgroundColor: colors[index % colors.length],
                      border: `5px solid ${borderColor}`,
                      transition: "border-color 0.2s ease",
                    }}
                  >
                    {columnData.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Card title={item.title} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
