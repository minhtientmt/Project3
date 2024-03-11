"use strict";
class DatePicker {
	constructor(id, callback){
		this.id = id;
		this.callback = callback;
	}
	render(date) {
		const week_days = ['sun','mon','tue','wed','thu','fri','sat'];
		const tbl = document.createElement('table');
		tbl.style.width = '100px';
		tbl.style.border = '1px solid black';
		const dayInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
		const dayInPreMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
		const weekdayStartMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
		const currentDay = new Date().getDate();
		const currentMonth = new Date().getMonth();
		const currentYear = new Date().getFullYear();
		const rows = Math.ceil((dayInMonth + 7 - (7 - weekdayStartMonth))/7);
		var elem = document.getElementById(this.id);
		//add info and button
		const divBtn = document.createElement('div');
		const btnPrev = document.createElement('button');
		btnPrev.innerText = "<";
		const dateText = document.createElement('p');
		dateText.innerText = date.getMonth() + 1 + "/" + date.getFullYear();
		const btnNext = document.createElement('button');
		btnNext.innerText = ">";
		divBtn.append(btnPrev);
		divBtn.append(dateText);
		divBtn.append(btnNext);
		divBtn.classList.add('calendar--header');
		elem.append(divBtn);
		let tr = tbl.insertRow();
		for (let j = 0; j < 7; j++) {
			const td = tr.insertCell();
			td.appendChild(document.createTextNode(week_days[j]));
			td.style.border = '1px solid black';
		}
		let indexDayInMonth = 1;
		// add Preday
		const tr1 = tbl.insertRow();
		for(let i = weekdayStartMonth +1; i >= 2; i--){
			const td = tr1.insertCell();
			td.style.border = '1px solid black';
			td.appendChild(document.createTextNode(dayInPreMonth - i + 2));
			td.addEventListener('click', () => {
				divBtn.remove();
				tbl.remove();
				if(date.getMonth() === 0){
					this.render(new Date(date.getFullYear() - 1, 12, 0));
				}else{
					this.render(new Date(date.getFullYear() , date.getMonth() - 1 , 1));
				}
			});
		}
		//add day first week
		for(let i = weekdayStartMonth; i < 7; i++){
			const td = tr1.insertCell();
			td.style.border = '1px solid black';
			td.style.background = '#aaa';
			if(indexDayInMonth === currentDay && date.getMonth() === currentMonth && 
					date.getFullYear() === currentYear){
				td.style.border = '2px solid blue';
			}
			td.appendChild(document.createTextNode(indexDayInMonth++));
		}
		//add rest day in month
		for (let i = 1; i < rows; i++) {
			tr = tbl.insertRow();
			for (let j = 1; j < 8; j++) {
				const td = tr.insertCell();
				td.style.border = '1px solid black';
				if(indexDayInMonth <= dayInMonth){
					td.style.background = '#aaa';
					if(indexDayInMonth === currentDay && date.getMonth() === currentMonth && 
					date.getFullYear() === currentYear){
						td.style.border = '2px solid blue';
					}
					td.appendChild(document.createTextNode(indexDayInMonth++));
				}else{
					td.appendChild(document.createTextNode(indexDayInMonth++ - dayInMonth));
					td.addEventListener('click', () => {
						divBtn.remove();
						tbl.remove();
						if(date.getMonth() === 11){
							this.render(new Date(date.getFullYear() + 1, 1, 0));
						}else{
							this.render(new Date(date.getFullYear() , date.getMonth() + 1 , 1));
						}
					});
				}
				
			}
		}	
		elem.appendChild(tbl);
		//add event for button
		btnNext.addEventListener('click', () => {
			divBtn.remove();
			tbl.remove();
			if(date.getMonth() === 11){
				this.render(new Date(date.getFullYear() + 1, 1, 0));
			}else{
				this.render(new Date(date.getFullYear() , date.getMonth() + 1 , 1));
			}
		});
		btnPrev.addEventListener('click', () => {
			divBtn.remove();
			tbl.remove();
			if(date.getMonth() === 0){
				this.render(new Date(date.getFullYear() - 1, 12, 0));
			}else{
				this.render(new Date(date.getFullYear() , date.getMonth() - 1 , 1));
			}
		});

	}
}


