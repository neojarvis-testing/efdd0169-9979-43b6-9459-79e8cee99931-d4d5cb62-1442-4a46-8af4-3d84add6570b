import { User } from "./user.model";

export class Feedback{
    feedbackId?:number;
    userId?:number;
    feedbackText:string;
    date:Date;
}