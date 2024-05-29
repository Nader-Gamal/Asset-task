import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent {
  // Keeps track of the currently open tab index, or null if no tab is open
  currentOpenTab: number | null = null;

  // Array of tab objects, each containing a title and an array of question-answer pairs
  tabs = [
    {
      title: 'Question Tab 1',
      content: [
        { question: 'Question 1?', answer: 'Answer 1' },
        { question: 'Question 2?', answer: 'Answer 2' },
        { question: 'Question 3?', answer: 'Answer 3' },
        { question: 'Question 4?', answer: 'Answer 4' },
        { question: 'Question 5?', answer: 'Answer 5' },
      ],
    },
    {
      title: 'Question Tab 2',
      content: [
        { question: 'Question 1?', answer: 'Answer 1' },
        { question: 'Question 2?', answer: 'Answer 2' },
        { question: 'Question 3?', answer: 'Answer 3' },
        { question: 'Question 4?', answer: 'Answer 4' },
        { question: 'Question 5?', answer: 'Answer 5' },
      ],
    },
    {
      title: 'Question Tab 3',
      content: [
        { question: 'Question 1?', answer: 'Answer 1' },
        { question: 'Question 2?', answer: 'Answer 2' },
        { question: 'Question 3?', answer: 'Answer 3' },
        { question: 'Question 4?', answer: 'Answer 4' },
        { question: 'Question 5?', answer: 'Answer 5' },
      ],
    },
    {
      title: 'Question Tab 4',
      content: [
        { question: 'Question 1?', answer: 'Answer 1' },
        { question: 'Question 2?', answer: 'Answer 2' },
        { question: 'Question 3?', answer: 'Answer 3' },
        { question: 'Question 4?', answer: 'Answer 4' },
        { question: 'Question 5?', answer: 'Answer 5' },
      ],
    },
  ];

  // Method to toggle the current open tab
  toggleTab(index: number) {
    // If the current tab is already open, close it by setting currentOpenTab to null
    if (this.currentOpenTab === index) {
      this.currentOpenTab = null;
    } else {
      // Otherwise, open the clicked tab by setting currentOpenTab to the clicked tab's index
      this.currentOpenTab = index;
    }
  }
}
