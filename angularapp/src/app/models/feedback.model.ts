import { User } from "./user.model";
export class Feedback {
    feedbackId?: number;
    userId?: number; // Optional if userId is directly accessible
    user?: User; // User object contains additional details
    feedbackText: string;
    date: Date;
  }