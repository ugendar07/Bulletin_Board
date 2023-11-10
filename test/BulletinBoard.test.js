const ethers = require('ethers');

const BulletinBoard = artifacts.require("BulletinBoard");

 

contract("BulletinBoard", (accounts) => {
  
  let instance;
    before(async () => {
            instance = await BulletinBoard.new() // Deploying the contract  
          });

    // Interact with the contract instance
     it('ensures that contract is deployed succesfully', async() =>{
      let count = await instance.getMessageCount()
      assert.equal(count,0,'the initial massege count should be 0')
     } )

     it("should post a message", async () => {
      

      
      const sender = accounts[0]; // The address of the sender
    const name = 'Alice';
    const message = 'Hello, world!';
    const topic = web3.utils.utf8ToHex("General");
    console.log(sender)

    // Create a message hash
    const messageHash = web3.utils.soliditySha3(name, message, topic);

    // Sign the message hash with the sender's private key
    const signerWallet = new ethers.Wallet('0x968409f4f320ea6bf31beeb8c6345f6c932ecd5b4bac4215210a5fd1f9b6a57c'); // Replace with the sender's private key
    const signature = await signerWallet.signMessage(messageHash);
    console.log(signature)

    // Post the message with the valid signature
    let M_count_B = await instance.getMessageCount();
    const result = await instance.postMessage(name, message, topic, signature);
      let M_count_A = await instance.getMessageCount();
  
      assert.equal(M_count_A.toNumber(), M_count_B.toNumber() + 1, "Message count should increase by 1");
     })

     it("getting address of the writer ", async() =>{
       
      // await instance.postMessage(Name, message, topic);

      const acc_add = await instance.getWriterAccounts();
      // console.log("initial  accounts address =",acc_add);
      assert.equal(acc_add,accounts[0],"writer address should match")

     })



     it("getting the info of a  message ",async() =>{

      const sender = accounts[0]; // The address of the sender
    const name = 'Bob';
    const message = 'Hello Alice';
    const topic = web3.utils.utf8ToHex("General");

    // Create a message hash
    const messageHash = web3.utils.soliditySha3(name, message, topic);

    // Sign the message hash with the sender's private key
    const signerWallet = new ethers.Wallet('0x968409f4f320ea6bf31beeb8c6345f6c932ecd5b4bac4215210a5fd1f9b6a57c'); // Replace with the sender's private key
    const signature = await signerWallet.signMessage(messageHash);

    // Post the message with the valid signature
    const result = await instance.postMessage(name, message, topic, signature);


      const M_count = await instance.getMessageCount();
      // console.log("no.of accounts :",M_count)

      const len = await instance.getWriterAccounts()
      const adds = await instance.getWriterAccount(len.length-1);
      // console.log("account of writer :",adds)

      const Message = await instance.getMessage(M_count-1);
      // console.log("address of the writer:",Message)
      // console.log("Name of the writer:",Message[1])
      // console.log("address of the Topic :",Message[3])
      // console.log("actual type address :",web3.utils.utf8ToHex("General"))
      const topic_name = web3.utils.hexToUtf8(Message[3])
      // console.log("Name of the Topic :",topic_name)

      assert.equal(Message[0],adds, "Writer address should match");
      assert.equal(Message[1], "Bob", "Nick name should match");
      assert.equal(Message[2], "Hello Alice", "Message should match");
      assert.equal(topic_name, "General", "Topic should match");

     })

     it("Should return the address of the owner :", async() =>{
      const Owner = await instance.owner();

      assert.equal(Owner,accounts[0],"owner of the board should be initial account owner")
     })

     it("should retrieve all messages", async () => {

      const sender = accounts[0]; // The address of the sender
    const name = 'Alice';
    const message = 'Hello, world!';
    const topic = web3.utils.utf8ToHex("General");

    // Create a message hash
    const messageHash = web3.utils.soliditySha3(name, message, topic);

    // Sign the message hash with the sender's private key
    const signerWallet = new ethers.Wallet('0x968409f4f320ea6bf31beeb8c6345f6c932ecd5b4bac4215210a5fd1f9b6a57c'); // Replace with the sender's private key
    const signature = await signerWallet.signMessage(messageHash);

    // Post the message with the valid signature
    const result = await instance.postMessage(name, message, topic, signature);


      // Geting the total message count
      const T_Messages = await instance.getMessageCount();

      // // Fetching and display each message
      for (let i = 0; i < T_Messages; i++) {
        // const Mess = await instance.getMessage(i);
        // console.log("Message", i + 1, "from:", Mess[0]);
        // console.log("Nick Name:", Mess[1]);
        // console.log("Message:", Mess[2]);
        // console.log("Topic:", web3.utils.hexToUtf8(Mess[3]));
        // console.log("Post Time:",new Date(Mess[4] * 1000).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));  
        // console.log("_________________________*************__________________________");
        }
      assert.equal(T_Messages,3,"total messages are 3 ")
     })

     it("Getting the messages that are associated with a specific topic",async() =>{
      const sender = accounts[0]; // The address of the sender
    const name = 'Alice';
    const message = 'Hello, world!';
    const topic = web3.utils.utf8ToHex("General");

    // Create a message hash
    const messageHash = web3.utils.soliditySha3(name, message, topic);

    // Sign the message hash with the sender's private key
    const signerWallet = new ethers.Wallet('0x968409f4f320ea6bf31beeb8c6345f6c932ecd5b4bac4215210a5fd1f9b6a57c'); // Replace with the sender's private key
    const signature = await signerWallet.signMessage(messageHash);

    // Post the message with the valid signature
    const result = await instance.postMessage(name, message, topic, signature);

      const B_Messages = await instance.getMessageCount();
      let topic_messages =0
      // get the messages associated with topics 
      for (let i=0;i<B_Messages;i++){
        const Messa = await instance.getMessage(i);
        if(web3.utils.hexToUtf8(Messa[3]) == "Announcement"){
          topic_messages++
          // console.log("message :",Messa[2])
          // console.log("___________*****__________")

        }
      }
      assert.equal(topic_messages,0,"nothing")

     })

     // write a test case to get the address of the writer of a particular message

     it("should retrieve a writer's account by index", async () => {

      // Get the writer account at index 0
      M_count = await instance.getMessageCount();
      accounts = await instance.getWriterAccounts();
      for(i=0;i<accounts.length;i++){
        const writerAccount = await instance.getWriterAccount(i);
        // console.log("writerAccount :",writerAccount)
        assert.equal(writerAccount, accounts[i], "Writer account should match");

      } 
    });
  
    it("should handle invalid index gracefully", async () => {
      // Attempt to retrieve a writer account with an invalid index
       try {
        await instance.getWriterAccount(M_count );
        console.log("Expected an exception but did not receive one");
        assert.equal(true, false, "Expected an exception but did not receive one");
       } catch (error) {
        // console.log("error :",error);
        assert(error.message.includes('Invalid index'), "Invalid index", "Invalid index error not thrown");
      }
    });
 
  it("should revert when posting a message by an address", async () => {

    
    const sender = accounts[0]; // The address of the sender
    const name = 'Alice';
    const message = 'Hello, world!';
    const topic = web3.utils.utf8ToHex("General");

    // Create a message hash
    const messageHash = web3.utils.soliditySha3(name, message, topic);

    // Sign the message hash with the sender's private key
    const signerWallet = new ethers.Wallet('0x968409f4f320ea6bf31beeb8c6345f6c932ecd5b4bac4215210a5fd1f9b6a57c'); // Replace with the sender's private key
    const signature = await signerWallet.signMessage(messageHash);

    // Post the message with the valid signature
    const result = await instance.postMessage(name, message, topic, signature);

    const address_1 = await instance.getWriterAccounts()
    const address_2 = address_1[0]
    const returnValues = await instance.getMessageByAddress(address_2);
    console.log("returnValues :",returnValues)
    console.log("returnValues[0][0] :",returnValues[0][0])
    assert.equal(returnValues[0][0],address_2,"address should match");
  })

  it("should revert when retrieving a message by an unknown address", async () => {
    accounts = await instance.getWriterAccounts();
    // const unknownAddress = accounts[10]; // Use an address that hasn't posted a message

    try {
      await instance.getMessageByAddress('0x9D5e0FA7ACd604BA7Bb5c06a96f1301aDcd74Bf5');
      assert.fail("Expected revert but didn't get one");
    } catch (error) {
      assert(error.message.includes("Message not found"), "Reverted with correct message");
    }
  });


  it('should allow a valid message with a valid signature', async () => {

    const sender = accounts[0]; // The address of the sender
    const name = 'Alice';
    const message = 'Hello, world!';
    const topic = web3.utils.utf8ToHex("General");

    // Create a message hash
    const messageHash = web3.utils.soliditySha3(name, message, topic);

    // Sign the message hash with the sender's private key
    const signerWallet = new ethers.Wallet('0x968409f4f320ea6bf31beeb8c6345f6c932ecd5b4bac4215210a5fd1f9b6a57c'); // Replace with the sender's private key
    const signature = await signerWallet.signMessage(messageHash);

    // Post the message with the valid signature
    const result = await instance.postMessage(name, message, topic, signature);

    // Check if the MessageInfo event was emitted
    const event = result.logs.find((log) => log.event === 'MessageInfo');
    expect(event).to.exist;

    // Verify that the event's fields match the expected values
    expect(event.args.sender).to.equal(sender);
    expect(event.args.name).to.equal(name);
    expect(event.args.message).to.equal(message);
    expect(event.args.topic).to.equal(topic);
  });


});


