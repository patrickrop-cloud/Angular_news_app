import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav'
import { NewsService } from './services/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit,OnInit {

  title = 'NewsApp';
  public sources:any=[];
  public articles:any=[];
  public selectedNewsChannel:string="Top 10 Trending News!";
  @ViewChild(MatSidenav) sideNav! : MatSidenav;
 

  constructor(
    private Observer: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private newsApi: NewsService){

  }
  ngOnInit(): void {
    this.newsApi.initArticles()
    .subscribe((res:any)=>{
      console.log(res);
      this.articles = res.articles;
    });
    this.newsApi.initSources()
    .subscribe((res:any)=>{
      console.log(res);
      this.sources = res.sources;
    })
  }
  ngAfterViewInit(): void{
    this.sideNav.opened = true;
    this.Observer.observe(['(max-width:787px)'])
    .subscribe((res)=>{
      if(res?.matches){
        this.sideNav.mode = "over";
        this.sideNav.close();
      }
      else{
        this.sideNav.mode = "side";
        this.sideNav.open();
      }
    })
    this.cdr.detectChanges();
  }
  searchSource(source:any){
    this.newsApi.getArticles(source)
    .subscribe((res)=>{
      this.articles = this.articles;
      this.selectedNewsChannel = source.name
    })

  }
}