import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PvmesService} from "./services/pvmes.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private pvmesService: PvmesService
  ) {
    const zipCodeLength = 5;
    const sirenLength = 9;
    this.form = this.formBuilder.group({
      company_attributes : this.formBuilder.group({
        name: new FormControl(null, Validators.required),
        siren: new FormControl(null, [Validators.required, Validators.maxLength(sirenLength), Validators.minLength(sirenLength)])
      }),
      customer_attributes: this.formBuilder.group({
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        telephone: new FormControl(null, Validators.required),
      }),
      address: this.formBuilder.group({
        street: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        zip_code: new FormControl(null, [Validators.required, Validators.maxLength(zipCodeLength), Validators.minLength(zipCodeLength)]),
        country: new FormControl(null, Validators.required),
      }),
      installation_date: new FormControl(null, Validators.required),
      panelCount: new FormControl(1, Validators.required),
      solar_panels_attributes: this.formBuilder.array([], Validators.required)
    });
    this.synchronizePanelsWithPanelCount();
  }

  get panels(): FormArray {
    return this.form.controls["solar_panels_attributes"] as FormArray;
  }

  synchronizePanelsWithPanelCount(): void {
    const panelCount = this.form.get('panelCount')?.value;
    const panelFormArrayLength = this.panels.length;

    if (!panelCount) {
      this.panels.clear();
    } else if (panelFormArrayLength < panelCount) {
      for (let i = 0; i < panelCount - panelFormArrayLength; i++) {
        this.addPanel();
      }
    } else if (panelFormArrayLength > panelCount) {
      for (let i = panelFormArrayLength - 1; i >= panelCount; i--) {
        this.deletePanel(i)
      }
    }
  }

  onSubmit(): void {
    const rawValue = this.form.getRawValue();
    delete rawValue.panelCount;
    this.pvmesService.createPvmes({pv_mise_en_service: rawValue}).subscribe();
  }

  private addPanel(): void {
    const serialNumberLength = 6;
    const panelForm = this.formBuilder.group({
      type_of: [0, Validators.required],
      serial_number: [null, [Validators.required, Validators.maxLength(serialNumberLength), Validators.minLength(serialNumberLength)]]
    });

    this.panels.push(panelForm);
  }

  private deletePanel(panelIndex: number): void {
    this.panels.removeAt(panelIndex);
  }
}
