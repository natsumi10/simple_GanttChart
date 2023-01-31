window.onload = function(){
	/*var tasks = [
	{
		id: 'id1',
		name: 'Shot A',
		description: 'The task of shot A',
		start: '2023-01-22',
		end: '2023-01-27',
		progress: 100,
	},
	{
		id: 'id2',
		name: 'Shot B',
		description: 'The task of shot B',
		start: '2023-01-27',
		end: '2023-02-03',
		progress: 100,
	},
	];*/
	let gantt = new Gantt("#gantt", task_data);
	
	//console.log (task_data[0]);
	function move_scroll_x(){
		let tmp_rect = document.querySelector("#gantt > g.grid > rect.today-highlight")

		console.log(tmp_rect["x"]["animVal"]["value"])
		console.log(tmp_rect)
	}
	
	let scroll_pos = move_scroll_x()

	/*Start dynamic task table here.*/
	let header = [];
	function createTable(task_data){
		for( let key in task_data[0]){
			//console.log("key is :"+key)
			header.push(key)
		}
		let table = document.querySelector('table.d_table');
		let row = table.insertRow(-1);
		let th0 = document.createElement("th");
		row.appendChild(th0);
		th0.innerHTML=" ";
		th0.width = 30;

		for(let i=0; i<header.length; i++){
			let th = document.createElement("th");
			row.appendChild(th);
			th.innerHTML=header[i];
			//console.log("key is :"+header[i])
			th.width = 100;
		}
		table.width = 30 + 100*header.length;
		//table.width = 100*header.length;

		
		
		for( let r=0; r<task_data.length; r++){
			//console.log(item)
			let row = table.insertRow(-1);
			let cell1 = row.insertCell(-1);
			cell1.className = 'item';
			cell1.innerHTML = r;

			for(c=0; c<header.length; c++){
				let tmp_header = header[c];
				let tmp_value = task_data[r][tmp_header];
				console.log("key is :"+tmp_header);
				console.log("value is :"+tmp_value);
				//console.log("c is :"+c)
				let cell = row.insertCell(-1);
				cell.className = 'value';
				cell.setAttribute('contenteditable','true');
				cell.setAttribute('id','R'+r+'C'+c);
				cell.innerText = (tmp_value)
			}

		}
	}
		
	//createTable(task_data);
}

