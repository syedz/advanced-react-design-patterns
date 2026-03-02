export interface Task {
  id: string;
  name: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface BoardData {
  name: string;
  columns: Column[];
}

export interface SelectedTask {
  colIdx: number;
  taskIdx: number;
}