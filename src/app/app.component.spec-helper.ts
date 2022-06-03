import {ComponentFixture} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

export function setFieldValue<T>(
  fixture: ComponentFixture<T>,
  id: string,
  value: string,
): void {
  setFieldElementValue(
    findElById(fixture, id).nativeElement,
    value
  );
}

export function setFieldElementValue(
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  value: string,
): void {
  element.value = value;
  const isSelect = element instanceof HTMLSelectElement;
  dispatchFakeEvent(element, isSelect ? 'change' : 'input', !isSelect);
}

export function findElById<T>(
  fixture: ComponentFixture<T>,
  id: string
): DebugElement {
  return fixture.debugElement.query(
    By.css(`[id="${id}"]`)
  );
}

export function dispatchFakeEvent(
  element: EventTarget,
  type: string,
  bubbles: boolean = false,
): void {
  const event = document.createEvent('Event');
  event.initEvent(type, bubbles, false);
  element.dispatchEvent(event);
}

