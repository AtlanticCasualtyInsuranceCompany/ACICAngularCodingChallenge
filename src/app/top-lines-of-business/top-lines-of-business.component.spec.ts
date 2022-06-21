import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLinesOfBusinessComponent } from './top-lines-of-business.component';

describe('TopLinesOfBusinessComponent', () => {
  let component: TopLinesOfBusinessComponent;
  let fixture: ComponentFixture<TopLinesOfBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopLinesOfBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLinesOfBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
