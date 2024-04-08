import {format, isToday, parseISO} from "date-fns";

const task = (() => { 
    class Task {
        constructor(title, group_title, description, date, is_done) {
            this.title = title
            this.group_title = group_title
            this.description = description
            this.date = date
            this.is_done = is_done
        }
        toggleDone() {
            this.is_done = !this.is_done
        }
    }
    class Group {
        constructor(group_title, ...members){
            this.group_title = group_title
            this.members = [...members]
        }
        isMember(person){
            for(let x of this.members){
                if(x === person)
                    return true
            }
            return false
        }
        addMember(person){
            this.members.unshift(person)
        }
        removeMember(person){
            let index = this.indexOf(person);
            if(index > -1)
                this.members.splice(index, 1)
        }
        deleteGroup(){
            for(let x of task_array){
                if(x.group_title == this.group_title)
                    return
            }
            let index = group_array.indexOf(this)
            if(index > -1)
                group_array.splice(index,1)
        }
    }
    let task_array = []
    let group_array = []
    return {task_array, group_array, Task,Group}
})()
export default task