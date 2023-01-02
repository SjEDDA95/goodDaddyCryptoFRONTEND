export default function(salary=0, action){
    if(action.type == 'addSalary'){
        return action.salary
    } else {
        return salary
    }
}