import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";

function App() {
  const [cards, setCards] = useState([
    { id: 1, text: "conteudo 1" },
    { id: 2, text: "conteudo 2" },
    { id: 3, text: "conteudo 3" },
    { id: 4, text: "conteudo 4" },
  ]);

  const [card2, setCard2] = useState([]);

  function handleDragEnd(result) {
    if (!result.destination) return; // Se o cartão foi descartado fora de uma área droppable, saia da função

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const destination = result.destination.droppableId;
    const source = result.source.droppableId;

    let updatedCards = [...cards];
    let updatedCard2 = [...card2];

    if (source === "cards" && destination === "cards") {
      const [dragged] = updatedCards.splice(sourceIndex, 1);
      updatedCards.splice(destinationIndex, 0, dragged);
      setCards(updatedCards);
    }
    if (source === "card2" && destination === "card2") {
      const [dragged] = updatedCard2.splice(sourceIndex, 1);
      updatedCard2.splice(destinationIndex, 0, dragged);
      setCard2(updatedCard2);
    }

    if (source === "cards" && destination === "card2") {
      let [removed] = updatedCards.splice(sourceIndex, 1);
      setCards(updatedCards);
      updatedCard2 = [...card2, removed];
      setCard2(updatedCard2);
    }

    if (source === "card2" && destination === "cards") {
      let [removed] = updatedCard2.splice(sourceIndex, 1);
      setCard2(updatedCard2);
      updatedCards = [...cards, removed];
      setCards(updatedCards);
    }
  }

  function removeCard(card, sourceIndex) {
    return card.splice(sourceIndex, 1); // Extrai o cartão arrastado
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 h-screen justify-center items-center">
        <Droppable droppableId="cards">
          {(provided) => (
            <div
              className="bg-blue-200 w-96 flex flex-col gap-4  p-8"
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
        <Droppable droppableId="card2">
          {(provided) => (
            <div
              className="bg-blue-200 w-96 flex flex-col gap-4  p-8"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {card2.map((card, index) => (
                <Draggable
                  key={card?.id}
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
      </div>
    </DragDropContext>
  );
}

export default App;
