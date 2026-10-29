const search = document.getElementById('search');
const textarea = document.getElementById('textarea');
let estadoborda=false;
textarea.addEventListener('focus', borda);
function borda(){
    if(estadoborda){
      search.style.border="none";
      search.style.outline="none";
    } else{
      search.style.border="2px solid gray";
      search.style.outline="2px solid white";
    }
   estadoborda=!estadoborda;
}
