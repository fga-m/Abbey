
export enum TeamRole {
  TEAM_1 = 'TEAM_1',
  TEAM_2 = 'TEAM_2',
  ADMIN = 'ADMIN'
}

export interface LocationData {
  id: string;
  name: string;
  question: string;
  answer: string;
  clue: string;
}

export interface AppState {
  role: TeamRole | null;
  currentStep: number;
  completedClues: string[];
  isFinished: boolean;
}
