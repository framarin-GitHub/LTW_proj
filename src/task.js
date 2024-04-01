import {format, isToday, parseISO} from "date-fns";

const task = (() => { 
    class Task {
        constructor(title, group, description, date, is_done) {
            this.title = title
            this.group = group
            this.description = description
            this.date = date
            this.is_done = is_done
        }
        toggleDone() {
            this.is_done = !this.is_done
        }
    }
    let task_array = []
    return {task_array,Task}
})()
export default task