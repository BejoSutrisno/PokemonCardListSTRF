const loginDiv = document.getElementById('loginDiv');
const mainDiv = document.getElementById('mainDiv');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');
const form = document.getElementById('pokemonForm');
const grid = document.getElementById('pokemonGrid');
const typeFilter = document.getElementById('typeFilter');

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalType = document.getElementById('modalType');
const modalHP = document.getElementById('modalHP');
const modalAbility = document.getElementById('modalAbility');
const spanClose = document.getElementsByClassName('close')[0];

let currentUser = null;
let allPokemons = [];

loginBtn.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('/api/auth/login', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({username,password})
  })
  .then(res => res.json())
  .then(data => {
    if(data.error) loginError.textContent = data.error;
    else {
      currentUser = data;
      loginDiv.style.display = 'none';
      mainDiv.style.display = 'block';
      if(currentUser.role==='admin') form.style.display='block';
      fetchPokemons();
    }
  });
});

function typeGradient(type){
  switch(type.toLowerCase()){
    case 'fire': return 'linear-gradient(135deg,#ff9a9e,#fecfef)';
    case 'water': return 'linear-gradient(135deg,#a1c4fd,#c2e9fb)';
    case 'grass': return 'linear-gradient(135deg,#d4fc79,#96e6a1)';
    case 'electric': return 'linear-gradient(135deg,#fdfbfb,#f5af19)';
    case 'psychic': return 'linear-gradient(135deg,#ff758c,#ff7eb3)';
    case 'fighting': return 'linear-gradient(135deg,#f093fb,#f5576c)';
    default: return 'linear-gradient(135deg,#ffffff,#f3f3f3)';
  }
}

function fetchPokemons(){
  fetch('/api/pokemons/list')
    .then(res=>res.json())
    .then(data=>{
      allPokemons = data;
      renderGrid();
    });
}

function renderGrid(){
  grid.innerHTML='';
  const filtered = typeFilter.value ? allPokemons.filter(p=>p.type.toLowerCase()===typeFilter.value) : allPokemons;
  filtered.forEach(p=>{
    const card = document.createElement('div');
    card.className='card';
    card.style.background = typeGradient(p.type);

    const img = document.createElement('img');
    img.src = p.image || 'https://via.placeholder.com/220x160?text=No+Image';

    const name = document.createElement('h3'); name.textContent=p.name;
    const type = document.createElement('p'); type.textContent=`Type: ${p.type}`;
    const hp = document.createElement('p'); hp.textContent=`HP: ${p.level}`;
    const ability = document.createElement('p'); ability.textContent=`Ability: ${p.ability||'None'}`;

    const btn = document.createElement('button');
    btn.textContent='Delete';
    btn.style.display = currentUser.role==='admin'?'block':'none';
    btn.onclick=()=>deletePokemon(p.id);

    card.append(img,name,type,hp,ability,btn);
    grid.appendChild(card);

    card.onclick=(e)=>{
      if(e.target.tagName!=='BUTTON'){
        modal.style.display='block';
        modalImg.src=p.image || 'https://via.placeholder.com/220x160?text=No+Image';
        modalName.textContent=p.name;
        modalType.textContent=`Type: ${p.type}`;
        modalHP.textContent=`HP: ${p.level}`;
        modalAbility.textContent=`Ability: ${p.ability||'None'}`;
      }
    }
  });
}

spanClose.onclick = ()=>modal.style.display='none';
window.onclick = e=>{ if(e.target==modal) modal.style.display='none'; }

function deletePokemon(id){
  fetch(`/api/pokemons/delete/${id}`,{method:'DELETE'})
    .then(()=>fetchPokemons());
}

form.addEventListener('submit', e=>{
  e.preventDefault();
  const formData = new FormData();
  formData.append('name', document.getElementById('name').value);
  formData.append('type', document.getElementById('type').value);
  formData.append('level', document.getElementById('level').value);
  formData.append('ability', document.getElementById('ability').value);
  const imageFile = document.getElementById('image').files[0];
  if(imageFile) formData.append('image', imageFile);

  fetch('/api/pokemons/add',{method:'POST', body:formData})
    .then(()=>{ form.reset(); fetchPokemons(); });
});

typeFilter.addEventListener('change', renderGrid);
