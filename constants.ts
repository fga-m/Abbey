
import { LocationData } from './types';

export const LOCATIONS: Record<string, LocationData> = {
  D1: {
    id: 'D1',
    name: 'Station 1',
    question: "What's the colour of the door at the house of birds?",
    answer: 'red',
    clue: 'I provide entry and exit; I swing on hinges.'
  },
  D2: {
    id: 'D2',
    name: 'Station 2',
    question: 'How many motel rooms are there on site?',
    answer: '8',
    clue: 'Midnight visions that dance in your head while you sleep.'
  },
  D3: {
    id: 'D3',
    name: 'Station 3',
    question: 'Where rocks are thrown and the seashells lay, how many buttons does the chair have?',
    answer: '4',
    clue: 'The deep longings and wants that pull at your heart.'
  },
  S: {
    id: 'S',
    name: 'Station 4',
    question: "God's word where it is preached, the page number of verse 105.",
    answer: '569',
    clue: 'Ancient holy writings that guide the faithful.'
  },
  P1: {
    id: 'P1',
    name: 'Station 5',
    question: 'Tavis has a word',
    answer: 'family',
    clue: 'Living beings who talk, love, and walk the earth together.'
  },
  P2: {
    id: 'P2',
    name: 'Station 6',
    question: 'The red letter at the tree for peace',
    answer: 'pray',
    clue: 'A quiet inner nudge or a sudden feeling to do something.'
  },
  P3: {
    id: 'P3',
    name: 'Station 7',
    question: 'Cross number 7 has some prayers.',
    answer: 'joy|hope',
    clue: 'The sting of a physical wound or a heavy ache in the soul.'
  }
};

export const PATH_TEAM_1 = ['D1', 'D2', 'D3', 'S', 'P1', 'P2', 'P3'];
export const PATH_TEAM_2 = ['P3', 'P2', 'P1', 'S', 'D3', 'D2', 'D1'];
