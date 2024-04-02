import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";

function App() {
  const [cards, setCards] = useState([
    [
      { id: 1, text: "conteudo 1" },
      { id: 2, text: "conteudo 2" },
      { id: 3, text: "conteudo 3" },
      { id: 4, text: "conteudo 4" },
    ],

    [],
  ]);

  function handleDragEnd(result) {
    if (!result.destination) return; // Se o cartão foi descartado fora de uma área droppable, saia da função

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const source = result.source.droppableId;
    const destination = result.destination.droppableId;

    let updatedCards = [...cards];

    const [removed] = updatedCards[source].splice(sourceIndex, 1);
    updatedCards[destination].splice(destinationIndex, 0, removed);
    setCards(updatedCards);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 h-screen justify-center items-center">
        {cards.map((card, i) => {
          return (
            <Droppable droppableId={`${i}`} key={i}>
              {(provided) => (
                <div
                  className="bg-blue-200 w-96 flex flex-col gap-4  p-8"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {card.map((card, index) => (
                    <Draggable
                      key={card.id}
                      draggableId={card.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <p
                          className="p-2 bg-red-200"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {card.text}
                        </p>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default App;
