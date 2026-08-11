const scenes=[...document.querySelectorAll(".scene")];
const progressBar=document.getElementById("progressBar");
const music=document.getElementById("music");
const musicToggle=document.getElementById("musicToggle");
let current=0,musicStarted=false;

const letterText=`Іноді мені здається, що дев'ять років пролетіли, мов одна мить.

Але якщо озирнутися назад, то за цією миттю — ціле життя.

Ми разом сміялися. Разом переживали непрості часи. Разом вчилися бути сильнішими. Разом будували наше майбутнє.

Були моменти, коли життя випробовувало нас. Були зміни, хвилювання, нові початки й речі, до яких ми не завжди були готові.

Але знаєш, що залишалося незмінним?

Ми.

І саме це для мене найцінніше.

За всі ці роки я ще більше переконався, що одного разу зробив найкращий вибір у своєму житті.

Бо обрав тебе.

І якби мені дали можливість прожити життя ще раз — я без вагань закохався б у тебе знову.

Дякую тобі за любов. За терпіння. За підтримку. За тепло, яке ти даруєш навіть у найскладніші дні.

За те, що поруч із тобою слово «дім» перестало бути місцем і стало людиною.

Ти — мій дім. Моє щастя. Моє натхнення. Моє життя.

І я хочу пройти поруч із тобою ще десятки років. Тримати тебе за руку. Обіймати. Сміятися. Подорожувати. Старіти.

І так само дивитися на тебе закоханими очима.

Я люблю тебе більше, ніж можуть передати слова.

І, мабуть, любитиму все життя. ❤️`;

const reasons=[
"Бо поруч із тобою навіть звичайний день стає щасливим.",
"Бо твоя усмішка завжди знаходить шлях до мого серця.",
"Бо ти підтримуєш мене навіть тоді, коли я сам у себе не дуже вірю.",
"Бо з тобою я можу бути собою.",
"Бо ти стала моєю сім'єю, моїм домом і моїм найближчим другом.",
"Бо після стількох років я все одно хочу прокидатися саме поруч із тобою.",
"Бо ми пройшли через різне — і все одно залишилися разом.",
"Бо ти робиш моє життя теплішим, добрішим і щасливішим.",
"Бо ти — саме ти. І після 9 років я все одно обираю тебе. ❤️"
];

function updateUI(){
  progressBar.style.width=`${(current/(scenes.length-1))*100}%`;
  const count=document.getElementById("slideCount");
  if(count)count.textContent=`${current+1} / ${scenes.length}`;
  const prev=document.getElementById("prevSlide"),next=document.getElementById("nextSlide");
  if(prev)prev.disabled=current===0;
  if(next)next.disabled=current===scenes.length-1;
  document.querySelectorAll("#slideDots button").forEach((d,i)=>d.classList.toggle("active",i===current));
}
function showScene(id){
  const idx=scenes.findIndex(s=>s.id===id);
  if(idx<0)return;
  scenes.forEach(s=>s.classList.remove("active"));
  scenes[idx].classList.add("active");
  current=idx;
  updateUI();
  if(id==="scene-4")startLetter();
  if(id==="scene-9")launchFinale();
}
function nextScene(){if(current<scenes.length-1)showScene(scenes[current+1].id)}
function prevScene(){if(current>0)showScene(scenes[current-1].id)}
document.querySelectorAll("[data-next]").forEach(b=>b.addEventListener("click",()=>{startMusic();showScene(b.dataset.next)}));
const prevSlide=document.getElementById("prevSlide"),nextSlide=document.getElementById("nextSlide"),slideDots=document.getElementById("slideDots");
if(prevSlide)prevSlide.addEventListener("click",prevScene);
if(nextSlide)nextSlide.addEventListener("click",nextScene);
if(slideDots){scenes.forEach((_,i)=>{const d=document.createElement("button");d.type="button";d.setAttribute("aria-label",`Перейти до слайду ${i+1}`);d.addEventListener("click",()=>showScene(scenes[i].id));slideDots.appendChild(d)})}
document.addEventListener("keydown",e=>{if(e.key==="ArrowRight")nextScene();if(e.key==="ArrowLeft")prevScene()});
let touchStartX=0;
document.addEventListener("touchstart",e=>{touchStartX=e.changedTouches[0].clientX},{passive:true});
document.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-touchStartX;if(Math.abs(dx)>60){if(dx<0)nextScene();else prevScene()}},{passive:true});
function updateMusicButton(){if(!musicToggle)return;musicToggle.textContent=music.paused?"♪":"♫";musicToggle.title=music.paused?"Увімкнути музику":"Вимкнути музику";musicToggle.setAttribute("aria-label",musicToggle.title)}
function startMusic(){
  if(!music.paused)return;
  music.volume=0.65;
  const p=music.play();
  if(p&&p.then)p.then(()=>{musicStarted=true;updateMusicButton()}).catch(()=>{});
}
if(musicToggle)musicToggle.addEventListener("click",e=>{e.stopPropagation();if(music.paused){music.volume=0.65;const p=music.play();if(p&&p.then)p.then(()=>{musicStarted=true;updateMusicButton()}).catch(()=>{})}else{music.pause();musicStarted=false;updateMusicButton()}});
music.addEventListener("play",updateMusicButton);music.addEventListener("pause",updateMusicButton);

let letterStarted=false;
function startLetter(){
  if(letterStarted)return;
  letterStarted=true;
  const el=document.getElementById("letter"),cursor=document.getElementById("typingCursor");
  let i=0;
  const timer=setInterval(()=>{
    el.textContent+=letterText[i++];
    if(i>=letterText.length){
      clearInterval(timer);cursor.style.display="none";
      document.getElementById("letterNext").classList.remove("hidden");
    }
  },16);
}

const dots=document.getElementById("reasonDots");
reasons.forEach((_,i)=>{const d=document.createElement("i");d.dataset.i=i;dots.appendChild(d)});
let reasonIndex=0;
function updateDots(){
  [...dots.children].forEach((d,i)=>d.classList.toggle("active",i<reasonIndex));
}
document.getElementById("reasonButton").addEventListener("click",()=>{
  if(reasonIndex >= reasons.length){
    document.getElementById("reasonButton").disabled=true;
    return;
  }
  const box=document.getElementById("reasonBox");
  box.style.transform="scale(.97)";
  setTimeout(()=>box.style.transform="scale(1)",120);
  box.textContent=reasons[reasonIndex];
  reasonIndex++;
  document.getElementById("reasonNumber").textContent=reasonIndex;
  updateDots();
  burstHearts(9);
  if(reasonIndex >= reasons.length){
    document.getElementById("reasonButton").disabled=true;
    document.getElementById("reasonButton").setAttribute("aria-label","Усі 9 причин відкрито");
    document.getElementById("reasonsNext").classList.remove("hidden");
  }
});

const giftContents={
1:{emoji:"📸",title:"Подарунок №1 — наші спогади",text:"Найцінніше, що в мене є, — це наші спогади. За 9 років ми створили стільки моментів, які я ніколи не хочу забути. І я хочу, щоб попереду їх було ще тисячі. ❤️"},
2:{emoji:"❤️",title:"Подарунок №2 — моє серце",text:"Тут заховано дещо, що вже 9 років належить тобі. Моє серце. І я навіть не планую забирати його назад. 😄❤️"},
3:{emoji:"🎆",title:"Подарунок №3 — найголовніший",text:"Ще один рік поруч із тобою. Ще одна річниця. Ще один день народження. І ще тисяча моментів, які ми проживемо разом. Ти — найкращий подарунок у моєму житті. ❤️"}
};
const giftModal=document.getElementById("giftModal"),giftContent=document.getElementById("giftContent"),opened=new Set();
document.querySelectorAll(".gift").forEach(g=>{
  g.addEventListener("click",()=>{
    const id=Number(g.dataset.gift);opened.add(id);g.classList.add("opened");
    const d=giftContents[id];
    giftContent.innerHTML=`<div class="modal-emoji">${d.emoji}</div><h3>${d.title}</h3><p>${d.text}</p>`;
    giftModal.classList.add("show");
    document.getElementById("openedCount").textContent=opened.size;
    if(opened.size===3)document.getElementById("giftsNext").classList.remove("hidden");
    burstHearts(18);
  });
});
document.getElementById("closeModal").addEventListener("click",()=>giftModal.classList.remove("show"));
giftModal.addEventListener("click",e=>{if(e.target===giftModal)giftModal.classList.remove("show")});

const lightbox=document.getElementById("lightbox"),lightboxImage=document.getElementById("lightboxImage");
document.querySelectorAll(".gallery img").forEach(img=>img.addEventListener("click",()=>{
  if(img.dataset.missing)return;
  lightboxImage.src=img.src;lightbox.classList.add("show");
}));
document.getElementById("closeLightbox").addEventListener("click",()=>lightbox.classList.remove("show"));
lightbox.addEventListener("click",e=>{if(e.target===lightbox)lightbox.classList.remove("show")});

document.getElementById("bigHeart").addEventListener("click",()=>burstHearts(35));

function markMissingImages(){
  document.querySelectorAll("img").forEach(img=>{
    const fallback=()=>{
      img.classList.add("missing");
      img.dataset.missing="true";
      if(img.nextElementSibling?.classList.contains("photo-placeholder"))img.nextElementSibling.style.display="flex";
      if(img.nextElementSibling?.classList.contains("history-placeholder"))img.nextElementSibling.style.display="flex";
    };
    img.addEventListener("error",fallback);
    if(!img.complete || img.naturalWidth===0)img.src=img.src;
  });
}
function createStars(){
  const c=document.getElementById("stars");
  for(let i=0;i<115;i++){
    const s=document.createElement("span");s.className="star";
    s.style.left=Math.random()*100+"%";s.style.top=Math.random()*100+"%";
    s.style.animationDelay=Math.random()*3+"s";s.style.animationDuration=2+Math.random()*4+"s";c.appendChild(s);
  }
}
function burstHearts(count=12){
  const c=document.getElementById("hearts");
  for(let i=0;i<count;i++){
    const h=document.createElement("span");h.className="heart-particle";
    h.textContent=Math.random()>.45?"✦":"✧";
    h.style.left=15+Math.random()*70+"%";h.style.top=45+Math.random()*20+"%";
    h.style.color=Math.random()>.3?"#f0d58b":"#d6b46a";
    h.style.fontSize=10+Math.random()*22+"px";
    h.style.animationDuration=1.5+Math.random()*2.7+"s";
    c.appendChild(h);setTimeout(()=>h.remove(),4500);
  }
}
setInterval(()=>{if(Math.random()>.35)burstHearts(1)},1000);
function launchFinale(){burstHearts(100);setTimeout(()=>burstHearts(80),1000);setTimeout(()=>burstHearts(80),2200)}
createStars();markMissingImages();updateDots();updateUI();updateMusicButton();
