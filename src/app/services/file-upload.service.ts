import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseUrl = `${environment.api}`;

  constructor(private http: HttpClient) { }

  uploadImage(file: File):Observable<any>{
    let formData = new FormData();
    formData.append("image", file);

    return this.http.post(`${this.baseUrl}/image/new`, formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'text'
    });
  }

  deleteImage(name: string): Observable<any>{
    return this.http.delete(`${this.baseUrl}/image/delete/${name}`, {
      responseType: 'text'
    });
  }
}
