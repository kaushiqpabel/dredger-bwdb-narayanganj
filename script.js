document.addEventListener('DOMContentLoaded', () => {

const officeName = ["CE", "DSC", "DOC", "NDD", "MDD", "CDD", "DSD", "DMD", "RAC"];



const SHEET_ID = '1WUAGmAXg-OeJDdTL18jTWG7By4y7Pt_q8shJYX1XY7g';
const SHEET_TITLE = ['officers', 'dredgers', 'history-and-about-us', 'projects'];
const SHEET_RANGE = ['B2:G200', 'C3:AA200', 'A2:B3', 'A2:F100'];

for(let i = 0; i<SHEET_TITLE.length; i++){
  let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE[i] + '&range=' + SHEET_RANGE[i]);

  let data;

  if(i==0){
    // for officers information data
    fetch(FULL_URL)
    .then(res => res.text())
    .then(rep => {
      data = JSON.parse(rep.substring(47).slice(0,-2)); 
      officersInformationParser(data);
    }); 
  }else if(i==1){
    // for dredger information data
    fetch(FULL_URL)
    .then(res => res.text())
    .then(rep => {
      data = JSON.parse(rep.substring(47).slice(0,-2)); 
      dredgerInformationParser(data);
    }); 
  }else if(i==2){
    // for dredger information data
    fetch(FULL_URL)
    .then(res => res.text())
    .then(rep => {
      data = JSON.parse(rep.substring(47).slice(0,-2)); 
      aboutUsAndHistoryParser(data);
    }); 
  }else if(i==3){
    // for dredger information data
    fetch(FULL_URL)
    .then(res => res.text())
    .then(rep => {
      data = JSON.parse(rep.substring(47).slice(0,-2)); 
      projectInformationParser(data);
    }); 
  }
}


function officersInformationParser(data){
  let x = 0;
  let i = 0;
  while(data.table.rows[i].c[0].v != '-'){
    let htmlString = '';
    while(1){
      if(officeName[x] === data.table.rows[i].c[5].v.toUpperCase()){
        let imgURL = data.table.rows[i].c[4].v;
        let name = data.table.rows[i].c[0].v;
        let designation = data.table.rows[i].c[1].v;
        let bwdbId = data.table.rows[i].c[2].v;
        let contact = data.table.rows[i].c[3].v;
        htmlString += htmlStringForOfficer(imgURL, name, designation, bwdbId, contact);
        i++;
      }else {
        let insertionPoint = document.getElementById(officeName[x].toLowerCase() + '-insertion-point');
        insertionPoint.innerHTML = htmlString;
        x++;
        break;
      }         
    }
  }
}


function htmlStringForOfficer(imgURL, name, designation, bwdbId, contact){
  let string = '<div class="col-12"><div class="card bg-light"> <div class="card-body text-center">';
  if (imgURL != '-'){
    string += '<img src="' + imgURL + '"alt="' + name + '" class="mb-1 profile-pic">';
  }
  if(name != '-'){
    string += '<h5 class="card-title mb-1">' + name + '</h5>';
  }
  if(designation != '-'){
    string += '<p class="card-text">' + designation + '</p>';
  }
  if(bwdbId != '-'){
    string += '<p>BWDB ID-' + bwdbId + '</p>';
  }
  if(contact != '-'){
    string += '<p>Contact-' + contact + '</p>';
  }
  
  string += '</div></div> </div>'
  return string;                        
}


function dredgerInformationParser(data){
  let i = 0;
  let htmlString = '';
  while(data.table.rows[i].c[0].v != '-'){
    let dredgerName = data.table.rows[i].c[0].v;
    let manufacturer = data.table.rows[i].c[1].v;
    let yearOfProcurement = data.table.rows[i].c[2].v;
    let dredgerModel = data.table.rows[i].c[3].v;
    let dredgerSize = data.table.rows[i].c[4].v;
    let typeOfDredger = data.table.rows[i].c[5].v;
    let presentCondition = data.table.rows[i].c[23].v;
    let currentLocation = data.table.rows[i].c[24].v;
    htmlString += htmlStringForDredger(dredgerName, manufacturer, yearOfProcurement, dredgerModel, dredgerSize, typeOfDredger, presentCondition, currentLocation);
    i++;        
  }

  let insertionPoint = document.getElementById('dredger-info-insertion-point');
  insertionPoint.innerHTML = htmlString;
}


function htmlStringForDredger(dredgerName, manufacturer, yearOfProcurement, dredgerModel, dredgerSize, typeOfDredger, presentCondition, currentLocation){
  let string = '<div class="col-md-8 col-lg-5"> <div class="card bg-light"><div class="card-header text-center bg-secondary text-white">';
  if (dredgerName != '-'){
    string += '<h3 class="card-title fw-bold">' + dredgerName + '</h3>';
  }
  string += '</div><div class="card-body p-0"><table class="table table-bordered table-sm table-hover m-0"><tbody>';
  if(manufacturer != '-'){
    string += '<tr><th scope="row">Manufacturer:</th><td>' + manufacturer + '</td></tr>';
  }
  if(yearOfProcurement != '-'){
    string += '<tr><th scope="row">Year of Procurement:</th><td>' + yearOfProcurement + '</td></tr>';
  }
  if(dredgerModel != '-'){
    string += '<tr><th scope="row">Dredger Model:</th><td>' + dredgerModel + '</td></tr>';
  }
  if(dredgerSize != '-'){
    string += '<tr><th scope="row">Dredger Size:</th><td>' + dredgerSize + '</td></tr>';
  }
  if(typeOfDredger != '-'){
    string += '<tr><th scope="row">Type of Dredger:</th><td>' + typeOfDredger + '</td></tr>';
  }
  if(presentCondition != '-'){
    string += '<tr><th scope="row">Present Condition:</th><td>' + presentCondition + '</td></tr>';
  }
  if(currentLocation != '-'){
    string += '<tr><th scope="row">Current Location:</th><td>' + currentLocation + '</td></tr>';
  }

  string += '</tbody></table></div></div></div>'
  return string;                        
}

function aboutUsAndHistoryParser(data){
  let i = 0;
  let htmlString = '';
  while(data.table.rows[i].c[0].v != '-'){
    let aboutUs = data.table.rows[i].c[0].v;
    let history= data.table.rows[i].c[1].v;
    htmlString += htmlStringForAboutUsAndHistory(aboutUs, history);
    i++;        
  }

  let insertionPoint = document.getElementById('about-us-history-insertion-point');
  insertionPoint.innerHTML = htmlString;
}

function htmlStringForAboutUsAndHistory(aboutUs, history){
  let string = '';
  if (aboutUs != '-'){
    string += '<h2>About Us</h2><p class="text-dark" style="text-align: justify;">' + aboutUs + '</p>';
  }
  if (history != '-'){
    string += '<h2>History</h2><p class="text-dark" style="text-align: justify;">' + history + '</p>';
  }
  return string;                        
}


function projectInformationParser(data){
  let i = 0;
  let htmlString = '';
  while(data.table.rows[i].c[0].v != '-'){
    let projectName = data.table.rows[i].c[0].v;
    let riverName = data.table.rows[i].c[1].v;
    let location = data.table.rows[i].c[2].v;
    let executiveDivision = data.table.rows[i].c[3].v;
    let deployedDredgers = data.table.rows[i].c[4].v;
    let ancillaryVessels = data.table.rows[i].c[5].v;
    htmlString += htmlStringForProjects(projectName, riverName, location, executiveDivision, deployedDredgers, ancillaryVessels, i);
    i++;        
  }

  let insertionPoint = document.getElementById('projects-info-insertion-point');
  insertionPoint.innerHTML = htmlString;
}

function htmlStringForProjects(projectName, riverName, location, executiveDivision, deployedDredgers, ancillaryVessels, id){
  let string = '<div class="accordion-item"><h2 class="accordion-header" id="project-heading' + id + '"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#project-' + id + '">' + projectName + '</button></h2><div class="accordion-collapse collapse" id="project-' + id + '" aria-labelledby="project-heading-' + id + '" data-bs-parent="#projects-info-insertion-point"><div class="accordion-body">';
  console.log(string);
  if (projectName != '-'){
    string += '<p><span class="fw-bold">Project Name:&nbsp;</span>' + projectName + '</p>';
  }
  if (riverName != '-'){
    string += '<p><span class="fw-bold">River Name:&nbsp;</span>' + riverName + '</p>';
  }
  if (location != '-'){
    string += '<p><span class="fw-bold">Location:&nbsp;</span>' + location + '</p>';
  }
  if (executiveDivision != '-'){
    string += '<p><span class="fw-bold">Executive Division:&nbsp;</span>' + executiveDivision + '</p>';
  }
  if (deployedDredgers != '-'){
    string += '<p><span class="fw-bold">Deployed Dredger(s):&nbsp;</span>' + deployedDredgers + '</p>';
  }
  if (ancillaryVessels != '-'){
    string += '<p><span class="fw-bold">Ancillary Vessel(s):&nbsp;</span>' + ancillaryVessels + '</p>';
  }

  string += '</div></div></div>'

  return string;                        
}




const tooltips = document.querySelectorAll(".tt");
tooltips.forEach(t => {
  new bootstrap.Tooltip(t);
});

});