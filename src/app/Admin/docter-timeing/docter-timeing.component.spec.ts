import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocterTimeingComponent } from './docter-timeing.component';

describe('DocterTimeingComponent', () => {
  let component: DocterTimeingComponent;
  let fixture: ComponentFixture<DocterTimeingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocterTimeingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocterTimeingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
