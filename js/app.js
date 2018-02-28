


let employees = [];
let selectedIndex = 0;

var searchForEmployee = document.querySelector('.search-for_employee');
var overlayForModal = document.querySelector('.overlay-for_modal');




   //  ------------------     F U N C T I O N S  ----------------- //

/**
 *  this creates the element
 * @param {object} parentElement /* parentElement

 * @param {string} tagName

 * @param {string} className

 * @param {string} innerHTML

 * @returns  this returns the created element
 */


    var createChildElement = (parentElement, tagName, className, innerHTML) => {
      var createdElement = document.createElement(tagName);
    parentElement.appendChild(createdElement);

    if (className) { createdElement.className = className;}
      if (innerHTML) {  createdElement.innerHTML = innerHTML;}
    return createdElement;
};



/**
 * Capitalizes the first letter in a string also handles the strings spacing.
 * @param {string} name
 * @returns a string that is capitalized
 */


   var formatName = function(name) {
    var splitName = name.split(' ');
   let result = [];
    for (let i = 0; i < splitName.length; i++) {
   var word = splitName[i];
    result.push(word[0].toUpperCase() + word.slice(1));
    }
   return result.join(' ');
};



     const modalDisplayForUser = function(member) { selectedIndex = employees.indexOf(member);

     const fullNameForEmployee = `${formatName(member.name.first)} ${formatName(member.name.last)}`;

     const addressForEmployee = `${formatName(member.location.street)} ${formatName(member.location.city)

    }, ${formatName(member.location.state)} ${member.location.postcode}`;

    overlayForModal.style = 'display: inline-block';


let modalContent =
  `<div class="container-for_modal">

    <div>
      <span class="close-the_modal">&times;</span>

        <ul class="list-for_modal">

          <img src="${member.picture.large}" id="image-for_modal">

           <li id="nameForModal">${fullNameForEmployee}</li>

            <li>${member.email}</li>
          <li>${formatName(member.location.city)}</li>
        </ul>
      </div>

    <div>
      <ul class="list-for_modal2">
        <li>${member.cell}</li>
         <li>${addressForEmployee}</li>
        <li>Birthday: ${new Date(member.dob).toLocaleDateString('en-US')}</li>
      </ul>

        <img class="arrow-to_go-left" src="images/arrow-left.png">
        <img class="arrow-to_go-right" src="images/arrow-right.png">
      
        </div>
    </div>`;
       overlayForModal.innerHTML = modalContent;


    // this will listen for the x to be clicked
    const modalClose = document.querySelector('.close-the_modal'); modalClose.addEventListener('click', () => {
        overlayForModal.style = 'display: none'; $('.container-for_modal').remove();
    });
};


// this will listen for the event that is clicked, then returns a popup box
overlayForModal.addEventListener('click', (e) => { if (e.target.className === 'arrow-to_go-left') { if (selectedIndex === 0)
{ return modalDisplayForUser (employees[employees.length - 1]);}return modalDisplayForUser (employees[selectedIndex - 1]);
    }

if (e.target.className === 'arrow-to_go-right') { if (selectedIndex === employees.length - 1) {return modalDisplayForUser (employees[0]);
    }
          return modalDisplayForUser (employees[selectedIndex + 1]);
    }
});



//                       A J A X    R E Q U E S T                       ///


$.ajax({ url: 'https://randomuser.me/api/?results=12&nat=us&inc=name,picture,email,location,cell,dob',
    dataType: 'json', success: function(response) { employees = response.results;




        //   Main information for employees directory
    for (let i = 0; i < employees.length; i++) {
        var firstNameEmployee = formatName(employees[i].name.first);
          var lastNameEmployee = formatName(employees[i].name.last);
            var fullNameEmployee = `${firstNameEmployee} ${lastNameEmployee}`;

          var mainContainer = document.querySelector('.main-container');
        const memberContainer = createChildElement(mainContainer, 'div', 'grid__item');
      memberContainer.onclick = () => modalDisplayForUser (employees[i]);





            // this div container is the information on the persons block
    let memberContent =
        `<div>
          <img src="${employees[i].picture.medium}"></div>

            <div>
              <ul>
                <li id="persons-name">${fullNameEmployee}</li>
                <li id="persons-email">${employees[i].email}</li>
                <li id="location-city">${formatName(employees[i].location.city)}</li>
              </ul>
          </div>`;

    memberContainer.innerHTML = memberContent;



        }
    }
});
