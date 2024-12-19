export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'george';
  timestamp: Date;
}