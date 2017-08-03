import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent {
	buttons = {x: {click: () => this.emitDeleteEvent()}};
	@Output('delete') deleteEvent = new EventEmitter<void>();
	@Output('moveUp') moveUpEvent = new EventEmitter<void>();
	@Output('moveDown') moveDownEvent = new EventEmitter<void>();
	
	emitDeleteEvent(): void {
		this.deleteEvent.emit();
	}
	
	emitMoveUpEvent(): void {
		this.moveUpEvent.emit();
	}
	
	emitMoveDownEvent(): void {
		this.moveDownEvent.emit();
	}
}
