import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';
import { ApiUrl } from '../constants/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  baseUrl:string=''
  
  constructor(private http:HttpClient) { 
    this.baseUrl=ApiUrl.apiUrl
    console.log('url:'+this.baseUrl)
  }

  sendFeedback(feedback:Feedback,userId:number):Observable<Feedback>{
    return this.http.post<Feedback>(`${this.baseUrl}/feedback/${userId}`,feedback);
  }
  getAllFeedbacksByUserId(userId:number):Observable<Feedback[]>{
    return this.http.get<Feedback[]>(`${this.baseUrl}/feedback/user/${userId}`);
  }
  // deleteFeedback(feedbackId:number): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/feedback/${feedbackId}`);
  // }

  deleteFeedback(feedbackId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/feedback/${feedbackId}`, { responseType: 'text' as 'json' });
  }
  
  getFeedbacks():Observable<Feedback[]>{
    return this.http.get<Feedback[]>(`${this.baseUrl}/feedback`);
  }
}
