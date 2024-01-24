export function convertFirestoreTimestamp(timestamp) {
  console.log(timestamp);
  // Extract seconds and nanoseconds from the Firestore timestamp
  const { _seconds, _nanoseconds } = timestamp;
  if (_seconds === undefined || _nanoseconds === undefined) {
    return timestamp;
  } else {
    // Create a new Date object using the seconds and nanoseconds
    const utcDate = new Date(_seconds * 1000 + _nanoseconds / 1000000);

    return utcDate;
  }
}
export function filterTasks(tasks, filter) {
  console.log(tasks);

  const filteredTasks = [];
  return new Promise((resolve, reject) => {
    tasks.forEach((task) => {
      console.log("task", task);
      task.due_date = new Date(
        Date.parse(convertFirestoreTimestamp(task.due_date))
      );
      console.log(task.due_date);
      const today = new Date();
      if (task.completed === false) {
        if (filter === "Overdue") {
          if (task.due_date.getDate() < today.getDate()) {
            filteredTasks.push(task);
          }
        } else if (filter === "Due Today") {
          if (task.due_date.getDate() === today.getDate()) {
            filteredTasks.push(task);
          }
        } else if (filter === "Upcoming") {
          if (task.due_date.getDate() > today.getDate()) {
            filteredTasks.push(task);
          }
        }
      } else if (filter === "Completed") {
        if (task.completed === true) {
          filteredTasks.push(task);
        }
      }
    });
    resolve(filteredTasks);
  });
}
