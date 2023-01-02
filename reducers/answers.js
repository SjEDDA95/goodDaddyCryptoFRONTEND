export default function(answers=[], action){
    if(action.type == 'addAnswer'){
        var answersCopy = [...answers];
        while(answersCopy.length > (action.questionNumber-1))  {
            answersCopy.pop();
        }
        answersCopy.push(action.answer);
        return answersCopy
    } else {
        return answers
    }
}