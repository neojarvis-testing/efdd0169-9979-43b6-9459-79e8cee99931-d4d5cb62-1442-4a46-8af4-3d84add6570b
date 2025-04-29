import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../constants/apiUrl';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  baseUrl:string=''
  
  constructor(private http:HttpClient) { 
    this.baseUrl=ApiUrl.apiUrl
    console.log('url:'+this.baseUrl)
  }

  sendFeedback(feedback:Feedback):Observable<Feedback>{
    return this.http.post<Feedback>(`${this.baseUrl}/feedback`,feedback);
  }
  getAllFeedbacksByUserId(userId:number):Observable<Feedback[]>{
    return this.http.get<Feedback[]>(`${this.baseUrl}/feedback/user/${userId}`);
  }
  deleteFeedback(feedbackId:number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/feedback/${feedbackId}`);
  }
  getFeedbacks():Observable<Feedback[]>{
    return this.http.get<Feedback[]>(`${this.baseUrl}/feedback`);
  }
}
