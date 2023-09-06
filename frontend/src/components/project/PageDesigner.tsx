// components/project/PageDesigner.tsx
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ElementSidebar from "./ElementSidebar";
import Workspace from "./Workspace";
import styles from "@/styles/components/project/PageDesigner.module.css";
import { Draggable, Droppable } from "react-beautiful-dnd";

const PageDesigner = () => {
  // Define your initial elements here
  const initialElements = [
    { id: "element-1", content: "Text Element" },
    { id: "element-2", content: "Image Element" },
    // Add more elements as needed
  ];

  const [elements, setElements] = React.useState(initialElements);

  const onDragEnd = (result) => {
    // Check if the drag happened within a valid drop target
    if (!result.destination) {
      return;
    }

    // Get the source and destination indices
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // Create a copy of the elements array
    const updatedElements = [...elements];

    // Reorder the elements based on the drag and drop
    const [draggedElement] = updatedElements.splice(sourceIndex, 1);
    updatedElements.splice(destinationIndex, 0, draggedElement);

    // Update the state with the new order of elements
    setElements(updatedElements);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex" }}>
        <DraggableSidebar />
        <Workspace elements={elements} />
      </div>
    </DragDropContext>
  );
};

export default PageDesigner;

const DraggableSidebar = () => {
  return (
    <div>
      <h2>Sidebar</h2>
      <Droppable droppableId="sidebar-droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Draggable draggableId="element-1" index={0}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {" "}
                  <div
                    style={{
                      width: "100px", // Set the width and height as needed
                      height: "100px",
                      backgroundColor: "lightblue", // Customize the style
                      textAlign: "center",
                      lineHeight: "100px", // Vertical centering
                    }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {" "}
                    Text Element
                  </div>
                </div>
              )}
            </Draggable>

            <Draggable draggableId="element-2" index={1}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: "lightgreen",
                      textAlign: "center",
                      lineHeight: "100px",
                    }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    Image Element
                  </div>
                </div>
              )}
            </Draggable>
            {/* Add more draggable elements here */}
          </div>
        )}
      </Droppable>
    </div>
  );
};
