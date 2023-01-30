window.onload = function(){
	var tasks = [
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
	];
	var gantt = new Gantt("#gantt", task_data);
	
	console.log (task_data[0]);

	var header = [];
	for( const item of task_data){
		console.log(item)
		
		for( var key in item){	
			console.log("item is :"+item[key])
		}
	}
		
	
	//createTable(task_data);
}


