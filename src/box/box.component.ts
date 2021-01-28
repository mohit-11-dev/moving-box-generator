import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from "@angular/core";
import { KEY_CODE } from "../enums";

@Component({
  selector: "app-box",
  templateUrl: "./box.component.html",
  styleUrls: ["./box.component.css"]
})
export class BoxComponent implements OnInit {
  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (this.dataVal.isKeyBoardEnabled) {
      console.log(
        "dataVal.selected, boxLength",
        this.dataVal.selected + 1,
        this.dataVal.boxes.length
      );
      if (
        event.keyCode === KEY_CODE.DELETE &&
        this.dataVal.selected > 0 &&
        this.dataVal.boxes.length >= this.dataVal.selected
      ) {
        this.dataVal.boxes.splice(this.dataVal.selected - 1, 1);
        this.dataVal.selected = 0;
        console.log("box deleted", this.dataVal);
      } else if (
        event.keyCode === KEY_CODE.RIGHT_ARROW &&
        this.dataVal.selected > 0 &&
        this.dataVal.boxes.length >= this.dataVal.selected &&
        (!this.dataVal.boxes[this.dataVal.selected - 1].left ||
          this.dataVal.boxes[this.dataVal.selected - 1].left <= 62)
      ) {
        this.dataVal.boxes[this.dataVal.selected - 1].left = this.dataVal.boxes[
          this.dataVal.selected - 1
        ].left
          ? this.dataVal.boxes[this.dataVal.selected - 1].left + 0.5
          : 1 + 0.5;
        console.log("box moved right", this.dataVal);
      } else if (
        event.keyCode === KEY_CODE.LEFT_ARROW &&
        this.dataVal.selected > 0 &&
        this.dataVal.boxes.length >= this.dataVal.selected &&
        (!this.dataVal.boxes[this.dataVal.selected - 1].left ||
          this.dataVal.boxes[this.dataVal.selected - 1].left > 1)
      ) {
        this.dataVal.boxes[this.dataVal.selected - 1].left = this.dataVal.boxes[
          this.dataVal.selected - 1
        ].left
          ? this.dataVal.boxes[this.dataVal.selected - 1].left - 0.5
          : 1;
        console.log("box moved left", this.dataVal);
      } else if (
        event.keyCode === KEY_CODE.DOWN_ARROW &&
        this.dataVal.selected > 0 &&
        this.dataVal.boxes.length >= this.dataVal.selected &&
        (!this.dataVal.boxes[this.dataVal.selected - 1].top ||
          this.dataVal.boxes[this.dataVal.selected - 1].top <= 18)
      ) {
        this.dataVal.boxes[this.dataVal.selected - 1].top = this.dataVal.boxes[
          this.dataVal.selected - 1
        ].top
          ? this.dataVal.boxes[this.dataVal.selected - 1].top + 0.5
          : 1 + 0.5;
        console.log("box moved down", this.dataVal);
      } else if (
        event.keyCode === KEY_CODE.UP_ARROW &&
        this.dataVal.selected > 0 &&
        this.dataVal.boxes.length >= this.dataVal.selected &&
        (!this.dataVal.boxes[this.dataVal.selected - 1].top ||
          this.dataVal.boxes[this.dataVal.selected - 1].top > 1)
      ) {
        this.dataVal.boxes[this.dataVal.selected - 1].top = this.dataVal.boxes[
          this.dataVal.selected - 1
        ].top
          ? this.dataVal.boxes[this.dataVal.selected - 1].top - 0.5
          : 1;
        console.log("box moved down", this.dataVal);
      }
    }
  }

  public dataVal?: {
    boxes: Array<{
      id: number;
      top?: number;
      left?: number;
      right?: number;
      bottom?: number;
    }>;
    selected: number;
    isKeyBoardEnabled?: boolean;
  };

  @Input("data") public set data(value: {
    boxes: Array<{
      id: number;
      top?: number;
      left?: number;
      right?: number;
      bottom?: number;
    }>;
    selected: number;
    isKeyBoardEnabled?: boolean;
  }) {
    console.log("data setter called with", value);
    this.dataVal = value;
  }
  @Output("on-box-click") public onBoxClick: EventEmitter<
    number
  > = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  public onClick = (index_: number) => {
    console.log(index_ + 1);
    this.dataVal.selected = index_ + 1;
    this.onBoxClick.emit(index_ + 1);
  };
}
