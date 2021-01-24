import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-box",
  templateUrl: "./box.component.html",
  styleUrls: ["./box.component.css"]
})
export class BoxComponent implements OnInit {
  public dataVal?: { boxes: Array<number>; selected: number };
  @Input("data") public set data(value: {
    boxes: Array<number>;
    selected: number;
  }) {
    console.log(value);
    this.dataVal = value;
  }
  @Output("on-box-click") public onBoxClick: EventEmitter<
    number
  > = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  public onClick = (index_: number) => {
    console.log(index_ + 1);
    this.onBoxClick.emit(index_ + 1);
  };
}
