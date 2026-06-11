export interface TranscriptChunk {
  text: string;
  start: number; // in seconds
  end: number;   // in seconds
}

export interface VideoData {
  videoId: string;
  title: string;
  author: string;
  thumbnailUrl: string;
  transcript: TranscriptChunk[];
  summary: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: TranscriptChunk[];
}
