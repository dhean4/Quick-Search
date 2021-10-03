const search=document.getElementById('search');
const List=document.getElementById('match-list');



//search the state.json and filter it
const searchStates= async searchText=>{
   const res=await fetch('../data/search.json');
   const states=await res.json;
   //Get matches to current text input
   let matches =states.filter(state=>{
      const regex=new RegExp(`^${searchText}`, 'gi');
      return state.name.match(regex) || state.abbr.match(regex);
   });
   if(searchText ==0){
      matches=[];
      List.innerHTML='';
   }
   outputHtml(matches)
}
//outputting to html
//NB: The matches.map actually returns an array so we converted to string before outputting to the user screen
let outputHtml=matches =>{
   if(matches.length >0){
      const html=matches.map(match =>`
      <div class="card card-body md-4">
      <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</h4>
      <small>Lat: ${match.lat}/ Long: ${match.long}</small>
      </div>
      `).join('');
      List.innerHTML=html;
   }
}
search.addEventListener('input',()=>searchStates(search.values));