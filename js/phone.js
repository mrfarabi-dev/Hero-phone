const loadPhone = async (searchText='13',isShowall) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    displayPhone(phones,isShowall);
}

const displayPhone = (phones,isShowall) => {
    // step:-1  set div of cr1eate a div
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';
    // display show all phones
    const showAllPhones = document.getElementById('show-phons')
    if(phones.length > 12 && !isShowall){
       showAllPhones.classList.remove('hidden');
    }
    else{
      showAllPhones.classList.add('hidden');
    }
    // show all button click on all show
    // console.log('is show all',isShowall);
    // set display limitaton
    if(!isShowall){
      phones = phones.slice(0,12);
    }
    // set by all object part to part 
    phones.forEach(phone => {
    // console.log(phone);
    // step:-2  create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `text-center card bg-gray-100 p-4 shadow-xl`;
    // step:-3  set innerHtml
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body text-center">
      <h2 class="text-center font-extrabold text-3xl">${phone.phone_name}</h2>
      <p class="text-center">If new phone veirsion take your choose?</p>
      <h1 class="text-center font-extrabold">Discount 60% OFF: ${9999}</h1>
      <div class="card-actions justify-center">
        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
      </div>
    </div>
    `
    // step:-4  append child
    phoneContainer.appendChild(phoneCard)
   });

  //  hidden loading sppinner
  toggolLodingSpinner(false)
}

// handle search button
const handleSearch =(isShowall) =>{
    toggolLodingSpinner(true)
     const searchField = document.getElementById('search_fild');
     const searchText = searchField.value;
     console.log(searchText);
     loadPhone(searchText,isShowall);

} 


const toggolLodingSpinner = (isLoading) => {
     const loddingSpinner = document.getElementById('loding-spinner');
     loddingSpinner.classList.remove('hidden');
     if(isLoading){
      loddingSpinner.classList.remove('hidden');
     }
     else{
      loddingSpinner.classList.add('hidden');
     }
}
// handle show ditailce
const handleShowDetail = async (id) => {
  // console.log('click show ditail',id)
  // lode single data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDitaile(phone)
}

const showPhoneDitaile = (phone) => {
  console.log(phone)
  
  

  const showDitaileContainer = document.getElementById('show-ditaile-container');
  showDitaileContainer.innerHTML = `
       <dib class="bg-gray-400 w-14 mb-5">
       <img class="mx-auto mb-8" src="${phone.image}" alt="" />
       </dib>
       <p class="font-extrabold mb-5 text-3xl">${phone.name}</p>

       <p><span class="font-extrabold">storage:</span>${phone.mainFeatures.storage}</p>
       <P><span class="font-extrabold">brand:</span>${phone.brand}</P>
       <p><span class="font-extrabold">chipSet:</span>${phone.mainFeatures.chipSet}</p>
       <p><span class="font-extrabold">displaySize:</span>${phone.mainFeatures.displaySize}</p>
       <p><span class="font-extrabold">memory:</span>${phone.mainFeatures.memory}</p>
       <p><span class="font-extrabold">chipSet:</span>${phone.mainFeatures.chipSet}</p>
       <p><span class="font-extrabold">slug:</span>${phone.slug}</p>
       <p><span class="font-extrabold">releaseDate:</span>${phone.releaseDate}</p>

  `


  // show the  modal
  show_details_modal.showModal()

}

// handle show button
const handwlShowAll = () =>{
   handleSearch(true)
}
loadPhone()

