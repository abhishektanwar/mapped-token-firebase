const form = document.querySelector('#add-token-form');
const updateform = document.querySelector('#update-token-form');
const tokenList = document.querySelector('#token-list');

// crete element and render tokens
function renderToken(doc,ID){
	let li = document.createElement('li');
	console.log(doc.id);
	let dataID = document.createElement('span');
	let address5 = document.createElement('span');
	let address80001 = document.createElement('span');
	let decimals = document.createElement('span');
	let id = document.createElement('span');
	let name = document.createElement('span');
	let symbol = document.createElement('span');
	let cross = document.createElement('div');


	li.setAttribute('data-id',ID);
	address5.textContent = doc.data().addresses["5"];
	address80001.textContent = doc.data().addresses["80001"];
	decimals.textContent = doc.data().decimals;
	id.textContent = doc.data().id;
	name.textContent = doc.data().name;
	symbol.textContent = doc.data().symbol;
	cross.textContent = 'x';

	li.appendChild(address5);
	li.appendChild(address80001);
	li.appendChild(decimals);
	li.appendChild(id);
	li.appendChild(name);
	li.appendChild(symbol);
	li.appendChild(cross);

	tokenList.appendChild(li);

	//deleting data
	cross.addEventListener('click',(e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		db.collection('tokens').doc(id).delete();
	})

}
//get data
db.collection('tokens').get().then((snapshot) => {
	snapshot.docs.forEach(doc => {
		renderToken(doc,doc.id);
	})
});

//saving data
form.addEventListener('submit', (e) => {
	e.preventDefault();
	db.collection('tokens').add({
		addresses : {
			5 : form.address5.value,
			80001 : form.address80001.value
		},
		decimals : form.decimals.value , 
		id : form.id.value ,
		name : form.name.value ,
		symbols : form.symbol.value
	});
	form.address5.value = '';
	form.address80001.value = '';
	form.address5.id = '';
	form.address5.decimals = '';
	form.address5.name = '';
	form.address5.symbol = '';

})

//updating data
updateform.addEventListener('submit',(e) => {
	e.preventDefault();
	db.collection('tokens').doc(updateform.dataID.value).update({
		addresses : {
			5 : updateform.address5.value,
			80001 : updateform.address80001.value
		},
		decimals : updateform.decimals.value , 
		id : updateform.id.value ,
		name : updateform.name.value ,
		symbols : updateform.symbol.value
	})
})