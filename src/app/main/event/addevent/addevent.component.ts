import { AnEvent } from './../../../interfaces/Event';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-addevent',
  standalone: true,
  imports: [CommonModule, FormsModule], // Include CommonModule
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css'],
})
export class AddeventComponent {
  @Input() showModalAddEvent: boolean = false;
  @Output() closeModalAddEvent: EventEmitter<void> = new EventEmitter();
  event: AnEvent = {
    id: 0,
    name: '',
    description: '',
    img: '',
    reservation: null,
    reservation_id: 0,
    reserver: null,
    reserver_id: 0,
  };
  constructor(private eventService: EventService) {}
  close() {
    this.closeModalAddEvent.emit(); // Emit event to close modal
  }
  onSubmit() {
    console.log('Event data:', this.event);
    // Add API call to save the event
  }

  saveEvent(): void {
    this.eventService.AddEvent(this.event, 0, 0).subscribe(
      (data) => {
        this.event = data;
        alert('Event created successfully!');
        this.close();
      },
      (error) => {
        console.error('Error creating Event:', error);
        alert(
          `Failed to create the Event. ${error.message || error.error.message}`
        );
      }
    );
  }
}
