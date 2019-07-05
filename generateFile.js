
/************************** CONFIGURATION AREA **********************************/
// 
let candidate = "TGzz8gjYiYRqpfmDwnLxfgPuLVNmpCswVp"; //SR/candidate address from whom we want the votes details 
let multiplier = .005; // i.e: 0.005 for 1 TOKEN every 200 votes
//
// 'votes_TDGy_2019_02_10at22_20_DONE.json'; EXAMPLE of filename output
//
/************************** END CONFIGURATION *******************************/

let tv = require('tronvotes');
let fs = require('fs');
//change the candidate address for whatever candidate/SR you want to get the votes-list from
let voters = tv.getVoters(candidate, tv.format.JSON, multiplier); 

voters.then( function(data){ 
        console.log("Candidate: " + data.candidate);
        console.log("Total votes: " + data.total_votes );
        console.log("Number of voters: " + data.num_voters );
		
		console.log("\r\n\t\t\t\t\t\tWARNING ");
		console.log("Before doing the airdrop, please manually double-check *Total Votes* and *Number of voters* against tronscan webpage\r\n");
		
 		let filename = data.table_name + '.json';
		let path = __dirname + "\\" + filename;
		
	    fs.appendFile( path, data.result, function (err) {
			if (err) { 
				console.log("Error writing file" + path);  
			}else{
				console.log("Generated JSON file: " + filename );
				console.log("NEXT STEP, please type this command to do airdrop: \n\n\t\t node tronair.js " + filename );
			}
		}); 
 
 } );