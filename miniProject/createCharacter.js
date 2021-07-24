//Character creation function.
function createCharacter() {
  console.log("createCharacter");
  const idInput = document.querySelector("#characterid").value;
  const nameInput = document.querySelector("#characterName").value;
  const genderInput = document.querySelector("#characterGender").value;
  const ageInput = document.querySelector("#characterAge").value;

  const encrypted = encrypt(idInput);
  const name = nameInput.toString();
  const gender = genderInput.toString();
  const age = ageInput.toString();

  //Check if the age is numeric. Bounce user back if it isn't.
  if (!isNumeric(age)) {
    alert("Please enter an age that is only numbers.");
  } else {
    firebase
      .database()
      .ref()
      .push({
        id: encrypted,
        Name: name,
        Gender: gender,
        Age: age
      });
    console.log("Attempted a push to database.");
    alert(`Character ${name} created!`);
  }
}

function isNumeric(num) {
  const checkNumbers = /^\d+$/;
  const isNumeric = checkNumbers.test(num);

  return isNumeric;
}

//Encrypt the id so we can correctly compare it against the database.
function encrypt(plaintext) {
  const hash = new Hashes.MD5().hex(plaintext);
  return hash;
}
