# Exercise App

See on GitHub pages
An exercise app using **React Native**. This is a mobile application that helps users to manage their fitness routines and track their progress such as time spent and calories burned. User's exercise history can be saved in local storage.

## Features

### Exercises

The user can begin several preset repetition exercises including pushup and planking, or duration exercises including running and biking. In Repetition exercises, the user can count up the amount of reps they had performed. In Duration exercises, the user can interact with the timer to record the time spent on the exercise.

### Calories Burned Calculation

For each exercise that the user performs, there is a calorie calculation at play. The equation is based on the exercise's MET score and the user's weight. In Repetition exercises, the calorie counter updates whenever the user completes a rep. In Duration exercises, the calorie counter updates every second that the user is performing the exercise.

### Setting Daily Calorie and Daily Time Spending Goals

The user is able to set a daily calorie and time spending goal. A progress bar is provided for the user to see their progress of the day in the **Home** screen.

### Exercise Session Goal

In addition to the daily goals, the user can set session goals within each repetition and duration exercises. In Repetition exercises, the user is able to set a goal for the amount of reps they wish to complete. In Duration exercises, the user is can set a target goal for the amount of time in minutes and seconds they wish to spend in the exercise.

### Exercise History

Each time the user completed an exercise with some calories burned and returns to the home screen, the app automatically save their session information such as the type of exercise, calories burned, and time elapsed into local storage. The user can then view those previous exercises in the **History** screen.
