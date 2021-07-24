console.log("in main script");

//Retrieve the characters from firebase
function getCharacters() {
  console.log(firebase);
  const charactersRef = firebase.database().ref();
  charactersRef.on("value", snapshot => {
    const characters = snapshot.val();
    console.log(characters);
    findCharacter(characters);
  });
}

//Attempt to find a character based off the character id
function findCharacter(characters) {
  console.log("findCharacter");
  //Grab the user's entry for the character id.
  const idAttempt = document.querySelector("#characterid").value;

  //Check to see if there is a character with a matching id.
  var foundACharacter = false;
  for (var character in characters) {
    const characterData = characters[character];
    var id = encrypt(idAttempt);
    //console.log(id);
    
    //If we find a matching character, begin rendering character data
    if (characterData.id.toString() == id) {
      console.log("Found a matching character.");
      renderMessageData(characterData);
      foundACharacter = true;
    }
  }
  
  //Give an alert if that character id does not have a linked character.
  if (!foundACharacter) {
    alert("Did not find a character with that id. Please try again.");
  }
}

//Show the corresponding character.
function renderMessageData(messageContent) {
  //Hide passcode box
  const nameBox = document.querySelector("#characterName");
  const genderBox = document.querySelector("#characterGender");
  const ageBox = document.querySelector("#characterAge");
  //Display matching message as HTML
  nameBox.innerHTML = messageContent.Name;
  genderBox.innerHTML = messageContent.Gender;
  ageBox.innerHTML = messageContent.Age;
}

//Encrypt the character id for safekeeping.
function encrypt(plaintext) {
  const hash = new Hashes.MD5().hex(plaintext);
  return hash;
}

//TODO: generate character cards from script
function addElement(characterData) {
  var tag = document.createElement("div");
  var text = document.createTextNode(characterData);
  tag.appendChild(text);
  var element = document.getElementsByTagName("body")[0];
  element.appendChild(tag);
}
