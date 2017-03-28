// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.considr_db;

var parliamentarian = {
	active: true, 
	last_updated: new Date(),
	csv_file_path: "input_docs/germany_AllPartiesComplete.csv",
	country: "germany",
	member_id: "1",
	full_name: "Jan van Aken",
	party: "Die Linke",
	parliament_member_url: "http://www.bundestag.de/abgeordnete18/biografien/A/aken_jan/258124",
	party_member_url: "https://www.linksfraktion.de/fraktion/abgeordnete/profil/jan-van-aken/",
	personal_url: "http://www.jan-van-aken.de/",
	photo_main_url: "http://www.bundestag.de/image/240714/3x4/122/163/be23238d3921acf3e9fa694ab1ae41f8/UK/aken_jan_gross.jpg",
	photo_backup_url: "https://www.linksfraktion.de/fileadmin/user_upload/MdB_Header/mdb-header-jan-van-aken-01.jpg",
	constituency_main: "Hamburg",
	constituency_detail: "Hamburg-Altona",
	constituency_number: "019",
	profession: "Biologe",
	office_constituency_main: "Berlin",
	office_address_main: "Platz der Republik 1",
	office_postal_code_main: "11011",
	office_location_main: "Berlin",
	office_email_main: "jan.vanaken@bundestag.de",
	office_phonenumber_main: "+4930/227-73486",
	office_constituency_backup: "Hamburg",
	office_address_backup: "Wendenstr. 6",
	office_postal_code_backup: "20097",
	office_location_backup: "Hamburg",
	office_email_backup: "jan.vanaken.wk@bundestag.de",
	office_phonenumber_backup: "040/280565-46",
	ministerial_role_information: "",
	birth_details: "Geboren am 01. Mai 1961",
	confession: "",
	family_status: "",
	parliament_join_date: "",
	extra_role_information: "",
	extra_role_information2: "",
	legislation_number: "",
	calling_score: 0  
};

var opts = {
  idInjection: true,
};
var Parliamentarian = ds.buildModelFromInstance('Parliamentarian', parliamentarian, opts);

var instance = new Parliamentarian(parliamentarian);
Parliamentarian.create(instance, function(err, model) {
  if (err) throw err;

  console.log('Created:', model);

  ds.disconnect();
});
