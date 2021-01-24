import { Component, HostListener, Renderer2 } from "@angular/core";
import { KEY_CODE } from "../enums";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private renderer_: Renderer2) {}
  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (this.isKeyboardEnabled) {
      console.log(
        "activeBox, boxLength",
        this.activeBox + 1,
        this.boxes.length
      );
      if (
        this.activeBox === 0 &&
        (event.keyCode === KEY_CODE.RIGHT_ARROW ||
          event.keyCode === KEY_CODE.LEFT_ARROW ||
          event.keyCode === KEY_CODE.UP_ARROW ||
          event.keyCode === KEY_CODE.DOWN_ARROW)
      ) {
        this.activeBox = 1;
      } else if (
        event.keyCode === KEY_CODE.RIGHT_ARROW &&
        this.activeBox + 1 <= this.boxes.length
      ) {
        console.log("active box increment");
        this.activeBox++;
      } else if (event.keyCode === KEY_CODE.LEFT_ARROW && this.activeBox >= 2) {
        this.activeBox--;
        console.log(this.activeBox, "active box decrement");
      } else if (
        event.keyCode === KEY_CODE.DOWN_ARROW &&
        this.activeBox + 6 <= this.boxes.length
      ) {
        this.activeBox += 6;
        console.log(this.activeBox, "active box increment with up arrow key");
      } else if (event.keyCode === KEY_CODE.UP_ARROW && this.activeBox >= 7) {
        this.activeBox -= 6;
        console.log(this.activeBox, "active box increment with up arrow key");
      }
    }
  }
  public boxes: Array<number> = [];
  public activeBox = 0;
  public isKeyboardEnabled = false;
  public onAddBoxClick = () => this.boxes.push(this.boxes.length + 1);
  public toggleKeyboardControl = () =>
    (this.isKeyboardEnabled = !this.isKeyboardEnabled);
  public onBoxClick = (event: number) => {
    this.activeBox = event;
  };
}
