String.prototype.getBaseConversionNumber = getBaseConversionNumber
String.prototype.CvnFromTo = CvnFromTo;
String.prototype.convertDigits = convertDigits;

		 let a=[];

var today = Date.now();
const todayFa = {
	"day": getDateFormat(today, {
		"day": "2-digit"
	}),
	"month": getDateFormat(today, {
		"month": "numeric"
	}),
	"monthTitle": getDateFormat(today, {
		"month": "long"
	}),
	"year": getDateFormat(today, {
		"year": "numeric"
	}),
	"dayWeek": getDateFormat(today, {
		"weekday": "long"
	}),
}

console.log(todayFa);
// index month to label
const monthLabel = [
	"فروردین",
	"اردیبهشت",
	"خرداد",
	"تیر",
	"مرداد",
	"شهریور",
	"مهر",
	"آبان",
	"آذر",
	"دی",
	"بهمن",
	"اسفند",
];

            //let tasks = calendarObject;
            // const taskForm = document.getElementById('task-form');
            // const taskInput = document.getElementById('task-input');
            // const taskList = document.getElementById('task-list');
            // const taskCount = document.getElementById('task-count');
            // const clearAll = document.getElementById('clear-all');
            // const emptyState = document.getElementById('empty-state');
// document.addEventListener('DOMContentLoaded', () => {
//             taskForm.addEventListener('submit', (e) => {
//                 e.preventDefault();
// 			});
		// });
const headDOM = document.getElementsByTagName("head")[0];

const parentDateDOM = document.getElementsByClassName('num-dates')[0];
const parentMetaYearDOM = document.getElementsByClassName('year-wrapper')[0];
const parentEventsDOM = document.getElementsByClassName('calendar-left')[0];

const todayDateDOM = document.getElementsByClassName("num-date")[0];
const todayDayDOM = document.getElementsByClassName("day")[0];

// set Property
todayDateDOM.textContent = todayFa['day'].convertDigits("fa");
todayDayDOM.textContent = todayFa['dayWeek'].convertDigits("fa");
//click out of modal
window.onclick=function(e){
const main = document.getElementById('main');
const modal = document.getElementById('modal');
	if(main===e.target){
		modal.classList.remove('is-open');
		main.classList.remove('modal-is-open');
	}
}
// event listener
const monthLetter = document.getElementsByClassName("month-letter");
for (const element of monthLetter) {
	element.onclick = function (e) {
		const thisElement = e.target;
		if (thisElement.classList.contains("active-season-cr")) return;
		
		const monthDataNumber = thisElement.getAttribute("data-num");
		activeMonthElement('dynamic-element', `dynamic-element-${monthDataNumber}`, 'active-element');
		activeMonthElement('month-letter', `month-letter-${monthDataNumber}`, 'active-season-cr');
	}
}

let season = getSeasonByMonNum(todayFa.month);
let cssSeason = getCssBySeason(season);

let styleCustom = document.getElementById("style-cln");

if (!styleCustom)
	headDOM.innerHTML += `<style id="style-cln">${cssSeason}</style>`;
else {
	styleCustom.innerHTML = cssSeason;
}


let monthCounter = 1;
for (const month of calendarObject) {

	const dateList = [];
	let liCounter = 0;
	let UlCounter = 1;
	let oneStarted = false;
	let tmpMetaYear = metaYear.metaYear[monthCounter - 1];
	tmpMetaYear = tmpMetaYear.split(" | ");

	parentMetaYearDOM.innerHTML += generateTemplateHTML("metaYear", {
		index: monthCounter,
		year: metaYear.year,
		arabic: tmpMetaYear[1],
		miladi: tmpMetaYear[0],
	});

	for (const day of month) {
		
		const currentMonth = monthLabel[monthCounter-1];
	
		
		if (day[5])
			oneStarted = false;
		else {
			oneStarted = true;
			dateList.push(day[0]);
		}
		var ulCurrentClass = `wk-${monthCounter}-${UlCounter}`;

		if (liCounter == 7) {
			document.getElementsByClassName(ulCurrentClass)[0].innerHTML += "<div class=\"clearfix\"></div>";
			liCounter = 0;
			UlCounter++;
		}

		ulCurrentClass = `wk-${monthCounter}-${UlCounter}`;

		var ulCurrent = document.getElementsByClassName(ulCurrentClass)[0];

		if (!ulCurrent) {
			var htmlUL = '';
			htmlUL += `<ul class="week ${ulCurrentClass} month-${monthCounter} dynamic-element dynamic-element-${monthCounter}"></ul>`;
			parentDateDOM.innerHTML += htmlUL;
			ulCurrent = document.getElementsByClassName(ulCurrentClass)[0];
		}
		let liClass = "day-element ";
		let liClick = "";
		let liId = "";

		if (!oneStarted)
			liClass += "disable-one ";
		else if (oneStarted)
			liClass += `date-${monthCounter}-${day[0].convertDigits("en")} `;

		if (day[3] === true)
			liClass += "holiday ";
	////////////////////////////////////
		if (day[6].length >0) //{
			liClass += "bdg ";
		// 	// liId = `${monthCounter}-${day[0].convertDigits("en")}`;
		// 	liClick = `onclick= "handleModal('${monthCounter},${day[0].convertDigits("en")}');"`;
		// }else {
		// 	// liId = `${monthCounter}-${day[0].convertDigits("en")}`;
		liClick = `onclick= "handleModal('${monthCounter},${day[0].convertDigits("en")}');"`;
		// }
	////////////////////////////////////
	////////////////////////////////////
	ulCurrent.innerHTML += generateTemplateHTML('date', {
			class: liClass,
			// id : liId,
			jalali: day[0].toString().convertDigits("fa"),
			click: liClick,
			miladi: day[1],
			ghamari: day[2].toString().convertDigits("ar"),
		});

		const eventClass = `event-list-${monthCounter}`;
		let eventDOM = document.getElementsByClassName(eventClass)[0];
		if (!eventDOM) {
			parentEventsDOM.innerHTML += `<ul class="events-list event-list-${monthCounter} dynamic-element dynamic-element-${monthCounter}"></ul>`;
			eventDOM = document.getElementsByClassName(eventClass)[0];
		}
//console.log(day[4]);
		for (const dayElement of day[4]) {
			const indexBracket = dayElement.indexOf("[");
			const eventdate = (0 <= indexBracket) ? dayElement.substring(indexBracket) : "";
// if (eventdate!="") a=dayElement;
// console.log(a);
			
			const eventTitle = dayElement.replace(eventdate, "");
			const startedDate = dateList[dateList.length - 1];
			
			if (oneStarted) {
				eventDOM.innerHTML += generateTemplateHTML('events', {
					day: `${startedDate} ${currentMonth}`.convertDigits("fa"),
					eventTitle: eventTitle,
					date: eventdate,
				});
			}
		}




		liCounter++;

	}

	monthCounter++;
}



activeMonthElement('dynamic-element', `dynamic-element-${todayFa.month}`, 'active-element');
activeMonthElement('month-letter', `month-letter-${todayFa.month}`, 'active-season-cr');
activeMonthElement('day-element', `date-${todayFa.month}-${parseInt(todayFa.day)}`, 'active-season');
//console.log(todayFa.month);
//console.log(todayFa.day);
function getSeasonByMonNum(numMonth) {
	const monthSeason = [
		"spring",
		"summer",
		"fall",
		"winter",
	];

	let season = "";

	if (numMonth <= 3) {
		season = monthSeason[0];
	} else if (3 < numMonth && numMonth <= 6) {
		season = monthSeason[1];
	} else if (6 < numMonth && numMonth <= 9) {
		season = monthSeason[2];
	} else if (9 < numMonth && numMonth <= 12) {
		season = monthSeason[3];
	}

	return season;
}

function getCssBySeason(season) {
	const cssObjects = cssProperty[season];
	let cssString = "";
	for (const cssObject of cssObjects) {
		let template = `${cssObject['selector']}{\n`;
		for (const property of cssObject['property']) {
			template += `${property}\n`;
		}
		template += "}\n\n"
		cssString += template;
	}

	return cssString;
}

function getDateFormat(uDate, option) {
	let date = new Intl.DateTimeFormat('fa-IR', option).format(uDate);
	date = date.convertDigits("en");
	return date;
}

function activeMonthElement(allCls, whichCls, activeCls) {
	const dynamicElement = document.getElementsByClassName(allCls);
	for (const element of dynamicElement) {
		if (element.classList.contains(activeCls))
			element.classList.remove(activeCls);
		else if (element.classList.contains(whichCls))
			element.classList.add(activeCls);
	}
}

function generateTemplateHTML(type, data) {
	let htmlTemplate = '';
	bdg='';
	// if (String(data.class).includes('bdg')) bdg=`<small id="b-${data.id}"></small><small class="b_s"></small></li>`;
	// console.log(bdg);
	if (type == "date")
		htmlTemplate = `<li class="${data.class}"`+ data.click+ `><span id="jalali">${data.jalali}</span><small id="miladi">${data.miladi}</small><small id="ghamari">${data.ghamari}</small>`;
	else if (type == "metaYear") {
		htmlTemplate = `<div class="year yr-${data.index} dynamic-element dynamic-element-${monthCounter}">${data.year}</div> <div class="year-meta myr-${data.index} dynamic-element dynamic-element-${monthCounter}">${data.arabic}<br>${data.miladi}</div>`;
	} else if (type == "events") {
		htmlTemplate = `<li><span class="event-day">${data.day} </span><div class="event-title">${data.eventTitle}</div><span class="event-date-type"> ${data.date}</span></li>`;
	}
	return htmlTemplate;
}

function handlexModal(data) {

  let dates=data.split(',');
  modal.classList.add('is-open'); //el.classList.remove(className);
  main.classList.add('modal-is-open');
  let html = '';
  m= document.getElementsByClassName('active-season-cr');
  let liClassE='';

  for (const element of calendarObject[dates[0]-1]) {
	if ((element[0].convertDigits('en')==dates[1]) && (element[5]!==true) ) {
		liClassE=element[6];
		break;		
	}	
  }
  if (liClassE.length > 0){
	handleTaskLists(dates,data);
  
//   html +=`<div class="modalHead">
//   			<button class="close" onClick="handleModalClose()">X</button>
// 			<span class="monthHeader">${dates[1].convertDigits('fa')}  ${m[0].innerText} ${String(metaYear.year).convertDigits('fa')}</span>
// 		  </div>
// 		  <div class="modalMain">
// 		  	<ul class="events-list event-list-${dates[0]} dynamic-element dynamic-element-${dates[0]} active-element">
// 		  <table><tbody id="tableList">`;
// 	  for (j=0; j <= liClassE.length-1; j++) {
// 		html +=`<tr>
// 				<td><form class="task-form" id="task-form">
// 					<button class="button" onClick="&#9997">×</button>
// 					<button class="button" onClick="10060">&#9997</button>
// 				</form></td>
// 				<td><li><span class="event-day">${liClassE[j]} </span>
// 				</li></td>
// </tr>`;
	  }
	//   console.log(dates);
	// html +='</tbody></table></ul></div>';
	//  html +=`<div class="footer">
    //          <button class="clear-all" >حذف همه</button>
    //        <div> شما <span class="task-count">0</span> رویداد آماده ثبت دارید	</div>
    //     	</div>
	// 		<div class="modalFoot">
	// 			<div class="form-container">
    //           		<form class="task-form" id="task-form" >
    //             	<input type="text" class="task-input" id="task-input" placeholder="رویداد مورد نظر ....." />
    //             	<button type="button" class="add-btn" onclick="handleAdd();">افزودن</button>
    //           		</form>
    //     		</div>
	// 	 	</div>`;

//   if (typeof events[day] !== 'undefined') {
//     html += '<p>There is already an appointment registered for that day, you can update or delete it below:</p><form onSubmit="handleSubmit(' + day + '); return false;"><input type="hidden" name="day" value="' + day + '" /><input id="text" type="text" name="description" value="' + events[day] + '" /><button class="update" type="submit">Update</button><button class="delete" onClick="handleDelete(' + day + '); return false;">Delete</button></form>';
//   } else {
//     html += '<p>There is no appointment registered for this day, do you want to register some?</p><form onSubmit="handleSubmit(' + day + '); return false;"><input type="hidden" name="day" value="' + day + '" /><input id="text" type="text" name="description" value="" /><button class="save" type="submit">Save</button><button class="cancel" onClick="handleModalClose(); return false;">Cancel</button></form>';
//   }
  
  modal.innerHTML = html;
}
function handleModal(data) {
  const main = document.getElementById('main');
  const modal = document.getElementById('modal');
  let dates=data.split(',');
  modal.classList.add('is-open'); //el.classList.remove(className);
  main.classList.add('modal-is-open');
  let html = '';
  m= document.getElementsByClassName('active-season-cr');
	let liClassE='';

  html +=`<div class="modalHead active-season">
  			<button class="close" onClick="handleModalClose()">X</button>
			<span class="monthHeader">${dates[1].convertDigits('fa')}  ${m[0].innerText} ${String(metaYear.year).convertDigits('fa')}</span>
		  </div>
		<div class="modalMain"id="modalMain">
		  </div>`;
  modal.innerHTML=html;
  for (const element of calendarObject[dates[0]-1]) 
	if ((element[0].convertDigits('en')==dates[1]) && (element[5]!==true) ) {
		liClassE=element[6];
		break;		
	}
	if (liClassE.length > 0){
		html += handleTaskLists(liClassE,dates);	
	}else{
				// const modal = document.getElementById('tasksItems');
					//console.log('111');
				openmodal(data,dates);


	}

	// console.log(html);
	html +=`</tbody></table></ul>
        <div class="footer ">
            <button class="clear-all" >حذف همه</button>
            <div> شما <span class="task-count">${liClassE.length}</span> رویداد برای امروز ثبت کرده اید</div>
        </div>
		<div class="modalFoot active-season">
			<div class="form-container">
              <form class="task-form" id="task-form" >
                <input type="text" class="task-input" id="task-input" placeholder="رویداد مورد نظر ....." />
                <button type="button" class="add-btn" onclick="handleAdd(${dates});">افزودن</button>
              </form>
        	</div>
		</div>
		
		`;
	modal.innerHTML=html;

//html += `</tbody></table></ul>`;
//   html +='<input type="text" class="task-input" id="task-input" placeholder="Add a new task..." required=""></input>';

// <ul class="events-list event-list-${dates[0]} dynamic-element dynamic-element-${dates[0]} active-element">
 		//    <table><tbody id="tasksItems">

// confirm('Are you sure you want to delete all tasks?');
}

function handleTaskLists(data,dates) {
	// console.log(dates,data);
	// const modal = document.getElementById('tasksItems');
	let html=``;
	  for (j=0; j <= data.length-1; j++) {
		html +=`<tr id="${j}">
				<td><form class="task-form" id="task-form">
					<a class="delete-btn" onClick="handleDelete('${dates,j}');">×</a>
					<a class="delete-btn" onClick="handleEdit('${j}');">&#9997</a>
					</form>
				</td>
				<td><li><span class="event-day">${data[j]} </span>
				</li></td>
				</tr>`;
	  }
 return html;
}

function handleAdd(dates) {
	const modal = document.getElementById('tasksItems');
	const inpt = document.getElementById('task-input').value;
	const counter= document.getElementsByClassName('task-count');
// console.log(modal);
	let html=``;
	//if(modal.children.length<=1) modal.innerHTML='';
// if (modal.children.length>1) 
		html =`<tr id="${counter[0].innerText ++}">
				<td><form class="task-form" id="task-form">
					<a class="delete-btn" onClick="handleDelete('${dates}');">×</a>
					<a class="delete-btn" onClick="handleEdit('${modal.children.length}');">&#9997</a>
					</form>
				</td>
				<td><li><span class="event-day">${inpt} </span>
				</li></td>
				</tr>`;
	//html += `</tbody></table></ul>`;
	modal.insertAdjacentHTML ( 'beforeend',html);

return 0;
}
function handleModalClose() {
  const modal = document.getElementById('modal');
  const main = document.getElementById('main');
  modal.classList.remove('is-open');
  main.classList.remove('modal-is-open');
  modal.innerHTML='';
}


function openmodal(data,dates)
{


const tUl = document.createElement('ul');
    	// tUl.setAttribute('data-id', task.id);
const tTable = document.createElement('table');
const tTbody = document.createElement('tbody');
const tTr = document.createElement('tr');
const tTd = document.createElement('td');
const tTd2 = document.createElement('td2');
const tSpan = document.createElement('span');
const tLi = document.createElement('li');

	tUl.classList.add(`events-list`,`event-list-${dates[0]}`,`dynamic-element`,`dynamic-element-${dates[0]}`,`active-element`);
	tTbody.setAttribute('data-id', 'tasksItems');
	tSpan.classList.add('event-day');
	tLi.appendChild(tSpan);
	tTd.appendChild(tLi);
	tTr.appendChild(tTd);
	tTr.appendChild(tTd2);
	tTbody.appendChild(tTr);
	tTable.appendChild(tTbody);
	tUl.appendChild(tTable);
const aa = document.getElementById('modal');
console.log(aa.length);
aa.appendChild(tUl);
}

function convertDigits(to) {
	let str = this;
	const toCvn = (this.getBaseConversionNumber(to))[to];
	const allDigits = this.getBaseConversionNumber("all");

	delete allDigits[to];

	const Objkeys = Object.keys(allDigits);
	for (var i = 0; i < Objkeys.length; i++) {
		const currentKey = Objkeys[i];
		const fromCvn = allDigits[currentKey];
		str = this.CvnFromTo(fromCvn, toCvn, str)
	}
	return str;
}

function CvnFromTo(fromDigits, toDigits, str) {
	var str = str == undefined ? this : str;
	for (var i = 0; i < toDigits.length; i++) {
		const currentFromDigit = fromDigits[i];
		const currentToDigit = toDigits[i];
		const regex = new RegExp(currentFromDigit, 'g');
		str = str.replace(regex, currentToDigit);
	}
	return str;
}

function getBaseConversionNumber(label) {
	const faDigits = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
	const enDigits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
	const arDigits = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠'];

	var whichDigit = {};

	switch (label) {
		case 'fa':
			whichDigit[label] = faDigits;
			break;
		case 'en':
			whichDigit[label] = enDigits;
			break;
		case 'ar':
			whichDigit[label] = arDigits;
			break;
		case 'all':
			whichDigit = {
				"fa": faDigits,
				"en": enDigits,
				"ar": arDigits
			};
			break;
		default:
			whichDigit = [];
	}

	return whichDigit;
}

window.onkeyup = function(e){
	const keyName = e.code;
	let action = null;
	
	if(keyName == "ArrowLeft"){
		action = "DECREASE";
	}else if(keyName == "ArrowRight"){
		action = "INCREASE";
	}else{
		return;
	}
	
	const activeMonthDOM = document.getElementsByClassName("active-season-cr")[0];
	const numberMonth = activeMonthDOM.getAttribute("data-num");
	
	let numberMonthFinal = 0;
	
	if(action == "INCREASE"){
		numberMonthFinal = parseInt(numberMonth) + 1;
	}else if(action == "DECREASE"){
		numberMonthFinal = parseInt(numberMonth) - 1;	
	}
	
	if(numberMonthFinal == 13){
		numberMonthFinal = 1;
	}
	if(numberMonthFinal == 0 ){
		numberMonthFinal = 12;
	}
	
	const newMonthDOM = document.getElementsByClassName("month-letter")[(numberMonthFinal-1)];
	
	const eventClick = new Event("click");
	
	newMonthDOM.dispatchEvent(eventClick);
}