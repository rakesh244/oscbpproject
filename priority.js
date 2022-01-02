var a
function createTable() {
  var y=document.getElementById('table')
  y.innerHTML=""
    a = document.getElementById('item1').value;
    if (a == "") {
      alert("Please enter some numeric value");
    } else {
      var th = document.querySelectorAll('#table th');//To check whether `TD` is appended in table or not!
      console.log(th)
      if (!th.length) {
        //If not appended, then append TD in table
        var rows = "<th>Process ID</th><th>Arrival time</th><th>Burst time</th><th>Priority</th>";
        var table = document.createElement('table');
        table.innerHTML = rows;
        console.log(table)
        document.getElementById("table").appendChild(table.firstChild);
      }
      console.log(a)
  
      for (var i = 0; i < a; i++) {
        var elems = '';
        elems += "<tr><td><input type='number' 'name='" + "name".concat(i + 1) + "' id='"+"a".concat(i+1)+"'></td><td><input type='number' name='" + "quantity".concat(i + 1) + "' id='"+"b".concat(i+1)+"'></td><td><input type='number' name='" + "qtype".concat(i + 1) + "' id='"+"c".concat(i+1)+"'></td><td id='amt'><input type='number' name='" + "total".concat(i + 1) + "' id='"+"d".concat(i+1)+"'></td></tr>";
        var table = document.createElement('table');
        table.innerHTML = elems;
        document.getElementById("table").appendChild(table.firstChild);
      }
      console.log(document.getElementById("table"))
    }
  }
const p={
    processid:0,
    arrivaltime:0,
    bursttime:0,
    priority:0,
    ct:0,
    tat:0,
    wt:0,
    //start_time:0,
    //response_time:0
}
let array=[]
var temp_burst_times = new Array(a);
function getTable(){
    array=[]
    if(a==undefined)
    {
        alert("please try again or refresh page,give correct input")
    }
    else{
        for(var i=0;i<a;i++){
            const v=Object.assign({},p);
            v.processid=(parseInt(document.getElementById("a".concat(i+1)).value)||0)
            v.arrivaltime=(parseInt(document.getElementById("b".concat(i+1)).value)||0)
            v.bursttime=(parseInt(document.getElementById("c".concat(i+1)).value)||0)
            v.priority=(parseInt(document.getElementById("d".concat(i+1)).value)||0)
            array.push(v)
        }
        console.log(array)
        //console.log(process,arrival,burst,priority)
        for (var i = 0; i < a; i++)
            temp_burst_times[i] = array[i].bursttime;
        sortArrival()
    }
}
function sortArrival(){
    for(var i=0;i<a;i++){
        for(var j=i+1;j<a;j++){
            if(array[i].arrivaltime>array[j].arrivaltime){
                var temp=Object.assign({},array[i]);
                array[i]=Object.assign({},array[j]);
                array[j]=Object.assign({},temp);
            }
        }
    }
    console.log(array)
}
function sortProcessid(){
  for(var i=0;i<a;i++){
      for(var j=i+1;j<a;j++){
          if(array[i].processid>array[j].processid){
              var temp=Object.assign({},array[i]);
              array[i]=Object.assign({},array[j]);
              array[j]=Object.assign({},temp);
          }
      }
  }
}
function isAllDone(temp_burst_times, a) {
  for (var i = 0; i < a; i++)
      if (temp_burst_times[i] != 0)
          return 0;
  return 1;
}
function fcfs(){
    var service_time=[]
	  service_time[0] = array[0].arrivaltime;
	  array[0].wt = 0;
	  // calculating waiting time
	  for (var i = 1; i < a; i++)
	  {
		// Add burst time of previous processes
		service_time[i] = service_time[i-1] + array[i-1].bursttime;

		// Find waiting time for current process =
		// sum - at[i]
		array[i].wt=service_time[i] - array[i].arrivaltime;

		// If waiting time for a process is in negative
		// that means it is already in the ready queue
		// before CPU becomes idle so its waiting time is 0
		if (array[i].wt< 0)
			array[i].wt = 0;
	}
    compute()
}
function sjf(){
  //process.sort((a, b) => a.arrival_time - b.arrival_time);
  //console.log(temp_burst_times)

  var clock = array[0].arrivaltime, completed = 0,shortestJobId;
  while (completed < a) {
      shortestJobId = -1;
      for (var i = 0; i < a; i++) {
          if (array[i].arrivaltime <= clock && temp_burst_times[array[i].processid - 1] > 0) {
              if (shortestJobId == -1)
                  shortestJobId = array[i].processid;
              else {
                  if (temp_burst_times[array[i].processid - 1] < temp_burst_times[shortestJobId - 1]) {
                      shortestJobId = array[i].processid;
                  }
              }
          }
      }
      if (shortestJobId == -1) {
          clock++;
          continue;
      }
      //console.log(shortestJobId, clock);
      temp_burst_times[shortestJobId - 1]--;
      clock++;
      if (temp_burst_times[shortestJobId - 1] == 0) {
          completed++;
          for (var i = 0; i < a; i++) {
              if (array[i].processid == shortestJobId) {
                array[i].ct = clock;
                  break;
              }
          }
      }
  }
  sortProcessid()
  computeTimes()
}
function prioritySche(){
    var temp_bt = new Array(a);
    for (var i = 0; i < a; i++)
        temp_bt[i] = array[i].bursttime;
    console.log(temp_bt)
    var is_completed=new Array(a)
    for(let i=0;i<a;i++){
        is_completed[i]=0
    }
    var current_time=0,prev=0,completed = 0,total_idle_time=0;
    while(completed != a){
        let idx=-1;
        let mx=-1
        for(let i=0;i<a;i++){
            console.log(is_completed)
            if(array[i].arrivaltime <= current_time && is_completed[i] ==0){
                if(array[i].priority > mx) {
                    mx = array[i].priority;
                    idx = i;
                    console.log(mx,idx)
                }
                if(array[i].priority == mx) {
                    if(array[i].arrivaltime < array[idx].arrivaltime) {
                        mx = array[i].priority;
                        idx = i;
                    }
                }
            }
        }
        if(idx != -1) {
            console.log("in if")
                 if(temp_bt[idx] == array[idx].bursttime) {
                     array[idx].start_time = current_time;
                     total_idle_time += array[idx].start_time - prev;
                }
                temp_bt[idx] -= 1;
                current_time++;
                prev = current_time;
                console.log(temp_bt[idx])
                if(temp_bt[idx] == 0) {
                    //console.log(completed)
                    array[idx].ct = current_time;
                    array[idx].tat = array[idx].ct - array[idx].arrivaltime;
                    array[idx].wt = array[idx].tat - array[idx].bursttime;
                    //array[idx].response_time = array[idx].start_time - array[idx].arrivaltime;

                    is_completed[idx] = 1;
                    completed++;
                }
        }
        else{
            current_time++;
        }
    }
    sortProcessid()
    computeTimes()
}
function roundrobin() {
  // var temp_burst_times = new Array(process_count);
  // for (var i = 0; i < process_count; i++)
  //     temp_burst_times[i] = process[i].burst_time;
  var queue = new Array(),time_quantum=2;
  var isInQueue = new Array(a)
  for(let i=0;i<a;i++){
      isInQueue[i]=0
  }
  //process.sort((a, b) => a.arrival_time - b.arrival_time);
  var clock = array[0].arrivaltime;
  queue.push(array[0].processid - 1);
  isInQueue[array[0].processid - 1] = 1
  while (1) {
      if (queue.length >= 1) {
          if (temp_burst_times[queue[0]] >= time_quantum) {
              clock += time_quantum;
              temp_burst_times[queue[0]] -= time_quantum;
          }
          else {
              clock += temp_burst_times[queue[0]];
              temp_burst_times[queue[0]] = 0;
          }
      }
      if (queue.length >= 1) {
          for (var j = 0; j < a; j++) {
              if (array[j].arrivaltime <= clock && isInQueue[array[j].processid - 1] == 0) {
                  queue.push(array[j].processid - 1);
                  isInQueue[array[j].processid - 1] = 1;
              }
          }
      } else {
          var times = []
          for (var i = 0; i < a; i++)
              times.push(array[i].arrivaltime);
          times.sort((p, q) => p - q);
          for (var i = 0; i < a; i++) {
              if (times[i] > clock) {
                  clock = times[i];
                  break;
              }
          }
          for (var j = 0; j < a; j++) {
              if (array[j].arrivaltime <= clock && isInQueue[array[j].processid - 1] == 0) {
                  queue.push(array[j].processid - 1);
                  isInQueue[array[j].processid - 1] = 1;
              }
          }
      }
      if (temp_burst_times[queue[0]] != 0)
          queue.push(queue.shift());
      else {
          for (var j = 0; j < a; j++) {
              if (array[j].processid == queue[0] + 1) {
                array[j].ct = clock;
                  break;
              }
          }
          queue.shift();
      }
      if (isAllDone(temp_burst_times, a) == 1){
        break;
      }
  }
  sortProcessid()
  computeTimes()
}
function computeTimes(){
  for(var i=0;i<a;i++){
    array[i].tat=array[i].ct-array[i].arrivaltime
    array[i].wt=array[i].tat-array[i].bursttime
  }
}
function compute(){
    for(var i=0;i<a;i++){
        array[i].tat=array[i].bursttime+array[i].wt;
    }
    
    for(var i=0;i<a;i++){
        array[i].ct=array[i].tat+array[i].arrivaltime;
    }
}
function display() {
    var y=document.getElementById('result')
    y.innerHTML=""
    a = document.getElementById('item1').value;
    if (a == "") {
      alert("Please enter some numeric value");
    } else {
      var q = document.querySelectorAll('#result th');//To check whether `TD` is appended in table or not!
      console.log(q)
      if (!q.length) {
        //If not appended, then append TD in table
        var rows = "<th>Process ID</th><th>Arrival time</th><th>Burst time</th><th>Priority</th><th>completion time</th><th>waiting time</th><th>turnaround time</th>";
        var tab = document.createElement('table');
        tab.innerHTML = rows;
        document.getElementById("result").appendChild(tab.firstChild);
        console.log(tab)
        console.log(document.getElementById("result"))
      }
      console.log(a)
    const tableBody = document.getElementById('result');
    console.log(array)
    for (const user of array) {
    console.log(user)
    const tr = document.createElement('result');
    var r = "";
    r+="<td>"+user.processid+"</td>"+"<td>"+user.arrivaltime+"</td>"+"<td>"+user.bursttime+"</td>"+"<td>"+user.priority+"</td>"+"<td>"+user.ct+"</td>"+"<td>"+user.wt+"</td>"+"<td>"+user.tat+"</td>"+"</tr>"
    console.log(r)
    var le = document.createElement('table');
    le.innerHTML = r;
    document.getElementById("result").appendChild(le.firstChild);
    }
    }
        console.log(document.getElementById("result"))
}