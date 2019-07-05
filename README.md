### Description

Written by colradi for Community Node Super Representative Organization 

Adapted by [gguelber](https://t.me/gguelber)

Contact me on Telegram for scripting services [gguelber](https://t.me/gguelber) 

This is a script for airdropping tokens (not TRX) based on votes for Super Representative.

### Install Dependencies

Clone this repository to your machine, go to the folder and type:

    npm install

Create a file called .env and insert the variables below with information about the address you will use to send the tokens from (IMPORTANT!):

    AIRDROP_ADDR = YOUR_ADDRESS
    AIRDROP_PK = YOUR_PRIVATE_KEY

### Instructions to get the voters list

The ratio of tokens to votes can be configured with the multiplier variable

Go to generateFile.js and set the SR Candidate whose voters you will be rewarding and the multiplier to decide how many tokens you want to send to each voter

    let candidate = "SR_ADDRESS_HERE"
    let multiplier = 0.01         // The amount of tokens to be sent for each voter will be: votes * multiplier (In this case, each voter will get 1 token for each 100 votes)

Run the following command in the console:

    node generateFile.js


generateFile.js will fetch an array of voters containing the address and the amount of tokens to be airdropped to each voter.

This script output will create a new JSON file with the name in the format below:

>  votes\_ADDRprefix\_DATE\_at\_TIME.json

It will contain an array like this:
	
    { "list":  [
        {"address" : "TXBnjY7CAq39Jj748XLfLd97tXGyknwD1x" , "votes" : 2004538},  
        {"address" : "TQ5qpcvtruNdYwokc3JHGb6dzuYMbam485" , "votes" : 1788121},  
        {"address" : "TUvV7VFJuj4wcd2ny3ZT3rZXivGpmhWoDV" , "votes" : 1473256},  
        {"address" : "TAh4zm9ULixhuCauikkaBjNCgnDptX5bW5" , "votes" : 1  }    
        ]  
    }

Your command line output will give you the exact command to start the airdrop, after you configure tronair.js

    node tronair.js votes_TGzz_2019_07_04at18_28.json



### Instructions to send the airdrop


The airdrop runs with the tron\_air.js script.

Go to tron\_air.js file and set the informations for the airdrop: 

    const token_name = 'Salvatio' // Change this value to your token name. Not required, this is only for display purposes
    let token_id = '1000375' // Change this value to your token_id 
    let minTokens = 50 // Filter the results and remove voters with less than that amount of tokens to receive, change to 0 remove the min amount filter
    let maxTokens = 6000 // Filter the results and remove voters with more than that amount of tokens to receive, change to Infinity remove the max amount filter

After everything is correctly configured, type the following command:

    node tronair.js votes_TGzz_2019_07_04at18_28.json


This will start the script and give you all informations before before sending the aidrop, i.e:

    TOTAL WALLETS TO RECEIVE TOKENS: 3062  // Number of transactions that will be made

    TOTAL TO BE SENT: 2776630 // Total amount of tokens the airdrop will send

    APPROXIMATED TRX FEE: 8.5736 TRX // Approximated fee to spend for the airdrop (in case you have 0 bandwidth)



    Do you want to start the airdrop of 2776630  to 3062 wallets?  // Hit yes or y to proceed. Hit anything else to quit 

After type yes, the airdrop will begin. If there are any FAILURES, those will be saved on a new file in the same folder, so you can track which transactions failed


### SUPPORT

If you liked this script, you can buy me a coffee :-)

TRX Address: 

    TXorcTKM9PjhAFKXoyMXWQG8Tn54nCemHs



Enjoy!