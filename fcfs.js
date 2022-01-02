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
        var rows = "<th>Process ID</th><th>Arrival Time</th><th>Burst Time</th>";
        var table = document.createElement('table');
        table.innerHTML = rows;
        console.log(table)
        document.getElementById("table").appendChild(table.firstChild);
      }
      console.log(a)
      for (var i = 0; i < a; i++) {
        var elems = '';
        elems += "<tr><td><input type='number' 'name='" + "name".concat(i + 1) + "' id='"+"a".concat(i+1)+"'></td><td><input type='number' name='" + "quantity".concat(i + 1) + "' id='"+"b".concat(i+1)+"'></td><td><input type='number' name='" + "qtype".concat(i + 1) + "' id='"+"c".concat(i+1)+"'></td></tr>";
        var table = document.createElement('table');
        table.innerHTML = elems;
        document.getElementById("table").appendChild(table.firstChild);
      }
      console.log(document.getElementById("table"))
      document.getElementById("pikachu").style.display="block";
    }
  }
const p={
    processid:0,
    arrivaltime:0,
    bursttime:0,
    priority:0,
    ct:0,
    tat:0,
    wt:0
}
let array=[]
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
            array.push(v)
        }
        console.log(array)
        //console.log(process,arrival,burst,priority)
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
      if (!q.length){
        //If not appended, then append TD in table
        var rows = "<th>Process ID</th><th>Arrival Time</th><th>Burst Time</th><th>Completion Time</th><th>Waiting Time</th><th>Turnaround Time</th>";
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
    r+="<td>"+user.processid+"</td>"+"<td>"+user.arrivaltime+"</td>"+"<td>"+user.bursttime+"</td>"+"<td>"+user.ct+"</td>"+"<td>"+user.wt+"</td>"+"<td>"+user.tat+"</td>"+"</tr>"
    console.log(r)
    var le = document.createElement('table');
    le.innerHTML = r;
    document.getElementById("result").appendChild(le.firstChild);
    }
    }
        console.log(document.getElementById("result"))
}