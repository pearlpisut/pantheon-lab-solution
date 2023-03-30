import { Passing_score, Contact, Test_info } from "./info.js";

const display = document.getElementById("display")

const Total_days = Test_info.length
const Total_students = Contact.length

//This array provides coversion table from index to real date. E.g., 1 == '29-May-2022'
var dateLookup = []
for(let i of Test_info){
    dateLookup.push(i.testDate)
}


var allTest_info = []  //store all test records
var counter = 1

//storing all test records, along with contact info of test takers into allTest_info
for(let testDay of Test_info){
    testDay.scores.map(result =>{
        result.day = counter
        result.phone = Contact.find(contact => contact.name == result.name).phone
    })
    allTest_info.push(...testDay.scores)
    counter++
}

allTest_info = allTest_info.filter(item => item.score < Passing_score)

//sorting of input
allTest_info.sort(function(a, b){
        //sort by date (earliest first)
        if(a.day > b.day) return 1
        else return -1
    })

var queue = []  //queue will store the test porformances that are to be called
var final_ans = [] //storing all calls to be made and their information
var repeat_check = [] //this array provides look-up table to avoid calling the same student more than once

for(let i=0; i<Total_days; i++){
    //provide short-circuiting if all students have been called
    if(repeat_check.length === Total_students) break

    let todayTest = allTest_info.filter(item => item.day === i+1)
    let callLimit = Test_info[i].callLimit
    queue.push(...todayTest)

    //appending the failing performance to be called
    //sorting mid-operation to follow the guideline of call sequence
    queue.sort(function(a, b){
        //First: sort by score (lowest first)            
        if(a.score > b.score) return 1
        else if(a.score < b.score) return -1
        else if(a.score == b.score){

            //Second: sort by date (most recent first)
            if(a.day > b.day) return -1
            else if(a.day < b.day) return 1
            else if(a.day == b.day){
                
                //Last: sort by name alphabetically (A-Z)
                if(a.name > b.name) return 1
                else return -1
            }
            
        }
    })
    //the case where there is nobody to call/call limit = 0 to begin with
    if(callLimit === 0 || queue.length === 0){
        final_ans.push({[dateLookup[i]]: 'none'})
        continue
    }
    var temp = []
    // make 'T' no. of calls in each day by dequeuing 'T' times
    while(callLimit > 0){
        if(queue.length > 0 && !repeat_check.includes(queue[0].name)){
            const callee = queue.shift()
            callee.day = dateLookup[callee.day - 1]
            temp.push(callee)
            repeat_check.push(callee.name)
        }
        else{
            break
        }
        callLimit--
    }
    final_ans.push({[dateLookup[i]]: temp})
}

console.log("\n ----   Call to be made   ---- \n")

//the result will be shown when clicking the button
document.getElementById("trigger").addEventListener("click", show)

function show(){
    //outputting the program's final result
    for(let i of final_ans){
        var key = Object.keys(i)[0]
        // console.log("Date to call: ", key)
        display.innerHTML += `<span class=""> Date to call: </span><br><span class="fs-4 date">${key}</span> <br>`
        // console.log("callee list: ")
        display.innerHTML += "Callee list: "
        if(i[key] == 'none'){
            // console.log("none\n")
            display.innerHTML += "<span class='fw-bold none'>none</span> <br><br>"
            continue
        }
        for(let j of i[key]){
            display.innerHTML += `<br> <span class="contact fs-5"> 
            <span class="contactName fw-bold">${j.name}</span> / ${j.phone} / ${j.day} /  ${j.score} </span>`
            // console.log(`${j.name} | ${j.phone} | ${j.day} |  ${j.score}`)
        }
        // console.log("\n")
        display.innerHTML += "<br><br>"
    }
    document.getElementById("trigger").disabled = true
}

