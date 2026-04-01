import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowSummaryComponent } from './show-summary.component';

describe('ShowSummaryComponent', () => {
  let component: ShowSummaryComponent;
  let fixture: ComponentFixture<ShowSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
