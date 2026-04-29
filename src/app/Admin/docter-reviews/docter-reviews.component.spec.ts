import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocterReviewsComponent } from './docter-reviews.component';

describe('DocterReviewsComponent', () => {
  let component: DocterReviewsComponent;
  let fixture: ComponentFixture<DocterReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocterReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocterReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
