// Import dotenv and initialize it to use the .env file
const dotenv = require('dotenv')
dotenv.config()

/*********************************************************************************/
/************************** CONFIGURATION AREA **********************************/
//address containing the tokens to be airdropped
let air_address = process.env.AIRDROP_ADDR

// name of the token to be airdropped
const token_name = 'Salvatio'
//'1000322' = CommunityNodeToken  '1000562' HELP
let token_id = '1000375' 
//set the minimum amount to send from the voters list
let minTokens = 50
//set the maximum amount to send from the voters list
let maxTokens = 6000

/************************** END CONFIGURATION *******************************/
const { GrpcClient } = require('tronix.js')
const fs = require('fs')

let filename = process.argv[2]
let voters = require("./" + filename ) //load the file
let failures = []

// db2_fullnode
const client = new GrpcClient({
  hostname: 'grpc.trongrid.io',
  port: 50051,
});

const newList = voters.list.filter(voter => voter.votes < maxTokens && voter.votes >= minTokens)

let totalToAirdrop = 0

newList.map(voter => {
	totalToAirdrop += voter.votes
})

// Function to send the tokens
async function sendToken(voter){
	
	const tx = await client.transferAsset( process.env.AIRDROP_PK, token_id, air_address, voter.address, voter.votes,'')
	
	if(!tx.result) { 
		failures.push(voter); 
		console.log("FAILURE: " + tx.transaction.toAddress + " - " + tx.transaction.amount + " tokens "); // result 	
	}else{
		console.log("SUCCESS: " + tx.transaction.toAddress + " - " + tx.transaction.amount + " tokens "); // result 	
	}	
}


const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`

TOTAL WALLETS TO RECEIVE ${token_name}: ${newList.length}

TOTAL ${token_name} TO BE SENT: ${totalToAirdrop}

APPROXIMATED TRX FEE: ${newList.length * 0.0028} TRX



Do you want to start the airdrop of ${totalToAirdrop} ${token_name} to ${newList.length} wallets? `, (answer) => {
  if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y' ) {
	console.log(`
	
	
	* * * Starting airdrop to ${newList.length} wallets. Total tokens to be sent: ${totalToAirdrop} Salvatio  * * *`)
	newList.map( sendToken )
  } else if (answer.toLowerCase() === 'no' || answer.toLowerCase() === 'n') {
	console.log('Ok, bye!');
  }

  rl.close();
});
//Error handling
if(failures.length > 0){  //store failures on a file
	
	failures = { "list": failures } // write contents in the appropiate format (tronvotes.format.JSON)
	let new_filename = filename.slice(0, -5) + "_fail.json"
	let path = __dirname + "\\" + new_filename

	console.log("Some transactions went wrong.")
	
    fs.appendFile( path, JSON.stringify(failures), function (err) {
		if (err) { 
			console.log("Error, could not save them on a new file"); 
		}else{
			console.log("To retry to send them, pleas type this command: \n\n\t\t node tronair.js  " + new_filename)
		}
	});

}

