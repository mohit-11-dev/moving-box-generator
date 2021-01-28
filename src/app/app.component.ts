import { Component, HostListener, Renderer2 } from "@angular/core";
import { KEY_CODE } from "../enums";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private renderer_: Renderer2) {}

  public boxes: Array<{ id: number }> = [];
  public activeBox = 0;
  public isKeyboardEnabled = false;
  public onAddBoxClick = () => this.boxes.push({ id: this.boxes.length + 1 });
  public toggleKeyboardControl = () =>
    (this.isKeyboardEnabled = !this.isKeyboardEnabled);
  public onBoxClick = (event: number) => {
    this.activeBox = event;
  };
}
