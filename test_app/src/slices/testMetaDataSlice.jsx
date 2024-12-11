import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null, // Store the current user's ID
  isSubmitted: false, // Flag to track if the test is submitted
  questions: [
    // Example question structure:
    // {
    //   id: 1,
    //   question: "What is 2 + 2?",
    //   options: ["1", "2", "3", "4"],
    //   correctOption: "4",
    //   selectedOption: null,
    //   visited: false,
    // },
  ],
  currentQuestion: 0, // Index of the current question being answered
};

const testMetaDataSlice = createSlice({
  name: "testMetaData",
  initialState,
  reducers: {
    // Action to set the userId
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    // Action to set the questions array (e.g., fetched from API)
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    // Action to update the selected option for a specific question
    selectOption: (state, action) => {
      const { questionId, selectedOption } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);
      if (question) {
        question.selectedOption = selectedOption;
      }
    },
    // Action to mark a question as visited
    markAsVisited: (state, action) => {
      const { questionId } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);
      if (question) {
        question.visited = true;
      }
    },
    // Action to update the current question index
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    // Action to submit the test and mark the test as submitted
    submitTest: (state) => {
      state.isSubmitted = true;
    },
    // Action to reset the test (e.g., clearing selected options)
    resetTest: (state) => {
      state.questions = state.questions.map((q) => ({
        ...q,
        selectedOption: null,
        visited: false,
      }));
      state.isSubmitted = false;
      state.currentQuestion = 0; // Reset the current question to the first question
    },
  },
});

// Export actions to dispatch them
export const {
  setUserId,
  setQuestions,
  selectOption,
  markAsVisited,
  setCurrentQuestion, // Export the new action
  submitTest,
  resetTest,
} = testMetaDataSlice.actions;

// Export the reducer to add to the store
export default testMetaDataSlice.reducer;
