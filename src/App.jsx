import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";

function App() {
  const [cards, setCards] = useState([
    { id: 1, text: "conteudo 1" },
    { id: 2, text: "conteudo 2" },
    { id: 3, text: "conteudo 3" },
    { id: 4, text: "conteudo 4" },
  ]);

  function handleDragEnd(result) {
    if (!result.destination) return; // Se o cartão foi descartado fora de uma área droppable, saia da função

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const updatedCards = [...cards];

    const [draggedCard] = updatedCards.splice(sourceIndex, 1); // Extrai o cartão arrastado
    updatedCards.splice(destinationIndex, 0, draggedCard); // Insere o cartão na nova posição

    setCards(updatedCards);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="cards">
        {(provided) => (
          <div
            className="bg-blue-200 w-96 flex flex-col gap-4 m-auto p-8"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {cards.map((card, index) => (
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
    </DragDropContext>
  );
}

export default App;
