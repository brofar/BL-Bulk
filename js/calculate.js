const requirements = {
    'add_device_service': ['deviceId', 'planName', 'expiry', 'so'],
    'move_devices': ['deviceId', 'orgId'],
    'assign_users_to_devices': ['first_name', 'last_name', 'orgId', 'deviceId'],
    'check_device_orgs': ['deviceId'],
    'create_users': ['first_name', 'last_name', 'has_account', 'orgId'],
    'rename_devices': ['deviceId', 'orgId', 'name'],
    'add_devices_to_group': ['deviceId', 'orgId', 'groupName'],
    'add_to_config_profile': ['deviceId', 'orgId', 'configuration'],
    'add_to_alert_profile': ['deviceId', 'orgId', 'alert_profile'],
    'add_to_notification_profile': ['deviceId', 'orgId', 'notification_profile'],
    'set_beacon_address': ['deviceId', 'orgId', 'lat', 'long', 'address'],
    'activate_beacon': ['deviceId', 'orgId'],
    'activate_dock': ['deviceId', 'orgId'],
    'create_groups': ['groupName', 'orgId'],
};

/*
document.body.addEventListener('change', function (e) {
const rows = [
    ["name1", "city1", "some other info"],
    ["name2", "city2", "more info"]
];

let csvContent = "data:text/csv;charset=utf-8," 
    + rows.map(e => e.join(",")).join("\n");
var encodedUri = encodeURI(csvContent);
var link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "my_data.csv");
document.body.appendChild(link); // Required for FF

link.click(); // This will download the data file named "my_data.csv".
});
*/

function CreateCSV(cols, type) {

	let rows = [cols];
	
	let csvContent = "data:text/csv;charset=utf-8," 
		+ rows.map(e => e.join(",")).join("\n");
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "import_" + type + ".csv");
	document.body.appendChild(link); // Required for FF

	link.click(); // This will download the data file named "my_data.csv".
}

function Generate(e) {
	// Get the id of the parent container.
	// Need to go up 3 levels to get true parent div ID.
	let type = e.target.parentNode.parentNode.parentNode.id;
	
	// Get checked options from the selected container.
	var checkedCbs = document.querySelectorAll('#' + type + ' input[type="checkbox"]:checked');
	
	// If nothing was checked, do nothing.
	if(checkedCbs.length == 0) return;
	
	// Iterate through checked options
	var fields = [];
	var ids = []
	for (var i = 0; i < checkedCbs.length; i++) {
		var id = (checkedCbs[i].id);
		ids.push(id);
		
		// Combine without duplicates
		fields = [...new Set([...fields,...requirements[id]])];
	}
	fields.push(ids.join("|"));
	CreateCSV(fields, type);
}

// Create event handlers for click events of ALL buttons
for (let elm of document.querySelectorAll("button")) {
  elm.onclick = Generate;
}