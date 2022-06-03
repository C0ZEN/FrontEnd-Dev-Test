import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import SpyObj = jasmine.SpyObj;

import {
  NgbDateAdapter,
  NgbDateNativeUTCAdapter,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PvmesService } from './services/pvmes.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  const pvmesServiceSpy: SpyObj<PvmesService> =
    jasmine.createSpyObj<PvmesService>('PvmesService', ['createPvmes']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbModule, FormsModule, ReactiveFormsModule],
      declarations: [AppComponent],
      providers: [
        FormBuilder,
        { provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter },
        { provide: PvmesService, useValue: pvmesServiceSpy },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
