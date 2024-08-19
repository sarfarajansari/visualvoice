import React, { useContext, useMemo } from "react";
import { CaptionContext } from "./caption";
import styled from "styled-components";

const Container = styled.div`
  height: calc(100vh - 140px);
  overflow-y: auto;
  .notes-container {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(200px, 1fr)
    ); /* Responsive grid */
    gap: 20px; /* Space between notes */
    padding: 10px 10px;
  }

  /* Individual sticky note style */
  .sticky-note {
    background-color: #ffd966; /* Default sticky note color */
    padding: 15px;
    border-radius: 10px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2); /* Shadow to give a lifted effect */
    font-family: "Comic Sans MS", cursive, sans-serif; /* Fun, casual font */
    color: #333; /* Text color */
    transition: transform 0.2s ease; /* Smooth hover effect */
    word-wrap: break-word; /* Handle long words */
  }

  /* Additional colors for variety */
  .sticky-note:nth-child(odd) {
    background-color: #ffab91; /* Light orange */
  }

  .sticky-note:nth-child(even) {
    background-color: #ffe082; /* Light yellow */
  }

  .sticky-note:hover {
    transform: scale(1.05); /* Slightly enlarge on hover */
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
const Notes = ({ items, onSeek }) => {
  const { currentTime } = useContext(CaptionContext);
  const filtered = useMemo(() => {
    if (!items) return [];
    const newList = items.filter((item) => item.startTime <= currentTime);

    return newList.reverse();
  });
  return (
    <Container>
      <div class="notes-container">
        {filtered.map((item) => (
          <div class="sticky-note" onClick={() => onSeek(item.startTime)}>
            {item.note}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Notes;
