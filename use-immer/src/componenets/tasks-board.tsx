import React, { useState } from "react";
import { useImmer } from "use-immer";
import styled from "styled-components";
import { boardData as initialData } from "../board-data";
import type { BoardData, SelectedTask } from "../types/board";

const Container = styled.div`
  padding: 2rem 0;
  max-width: 800px;
  margin: auto;
`;

const SectionHeader = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f4f4f4;
  border-radius: 8px;
`;

const ColumnWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
`;

const ColumnContainer = styled.div`
  background: #ebecf0;
  border-radius: 4px;
  min-width: 250px;
  padding: 0.5rem;
`;

const TaskCard = styled.div<{ $active: boolean }>`
  background: white;
  margin-bottom: 8px;
  padding: 10px;
  border-radius: 3px;
  cursor: pointer;
  border: 2px solid ${props => props.$active ? '#0079bf' : 'transparent'};
  box-shadow: 0 1px 0 rgba(9, 30, 66, .25);
`;

const TasksBoard: React.FC = () => {
  const [board, updateBoard] = useImmer<BoardData>(initialData);
  const [selectedTask, setSelectedTask] = useState<SelectedTask>({ 
    colIdx: 0, 
    taskIdx: 0 
  });

  const onTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { colIdx, taskIdx } = selectedTask;
    updateBoard((draft) => {
      // Direct mutation is safe here because of useImmer
      draft.columns[colIdx].tasks[taskIdx].name = e.target.value;
    });

    // Used to be the way to update the board before useImmer
    // updateBoard((board) => {
    //   return {
    //     ...board,
    //     columns: [
    //       ...board.columns.map((column, _columnIdx) => {
    //         if (columnIdx !== _columnIdx) {
    //           return column;
    //         }
    //         return {
    //           ...column,
    //           tasks: column.tasks.map((task, _taskIdx) => {
    //             if (taskIdx !== _taskIdx) {
    //               return task;
    //             }
    //             return {
    //               ...task,
    //               name: e.target.value,
    //             };
    //           }),
    //         };
    //       }),
    //     ],
    //   };
    // });
  };

  return (
    <Container>
      <SectionHeader>
        <p>Edit selected task name:</p>
        <input 
          type="text" 
          onChange={onTaskNameChange} 
          placeholder="Type to rename..."
        />
      </SectionHeader>

      <ColumnWrapper>
        {board.columns.map((column, cIdx) => (
          <ColumnContainer key={column.id}>
            <h4>{column.title}</h4>
            {column.tasks.map((task, tIdx) => (
              <TaskCard
                key={task.id}
                $active={cIdx === selectedTask.colIdx && tIdx === selectedTask.taskIdx}
                onClick={() => setSelectedTask({ colIdx: cIdx, taskIdx: tIdx })}
              >
                {task.name}
              </TaskCard>
            ))}
          </ColumnContainer>
        ))}
      </ColumnWrapper>
    </Container>
  );
};

export default TasksBoard;