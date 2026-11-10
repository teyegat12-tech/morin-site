/* MORIN — общий код всех страниц: шапка, меню-свиток, подвал, корзина, данные вещей */
(function(){
const DEFS=`<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <filter id="ink" x="-3%" y="-10%" width="106%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="3" seed="3" result="w"/>
    <feDisplacementMap in="SourceGraphic" in2="w" scale="3.5" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feTurbulence type="fractalNoise" baseFrequency=".35" numOctaves="2" seed="11" result="g"/>
    <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.5 0 0 0 1.72" result="ga"/>
    <feComposite in="d" in2="ga" operator="in"/>
  </filter>
  <filter id="ink-sm" x="-2%" y="-10%" width="104%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="2" seed="5" result="w"/>
    <feDisplacementMap in="SourceGraphic" in2="w" scale="1" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="wear" x="-2%" y="-10%" width="104%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="4" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -11 0 0 0 8.5" result="a"/>
    <feComposite in="SourceGraphic" in2="a" operator="in"/>
  </filter>
<filter id="wear-fill" x="-2%" y="-10%" width="104%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="7" result="e"/>
    <feDisplacementMap in="SourceGraphic" in2="e" scale="1.6" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feTurbulence type="fractalNoise" baseFrequency=".14" numOctaves="3" seed="12" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -18 0 0 0 15.1" result="a"/>
    <feComposite in="d" in2="a" operator="in"/>
  </filter>
<filter id="hand" x="-5%" y="-1%" width="110%" height="102%">
    <feTurbulence type="fractalNoise" baseFrequency=".06" numOctaves="2" seed="21" result="w"/>
    <feDisplacementMap in="SourceGraphic" in2="w" scale="2.2" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
<filter id="print" x="-2%" y="-10%" width="104%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="11" result="g"/>
    <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.4 0 0 0 2.9" result="ga"/>
    <feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="4" result="b"/>
    <feColorMatrix in="b" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2.4 0 0 0 2.25" result="ba"/>
    <feComposite in="ga" in2="ba" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" result="a"/>
    <feComposite in="SourceGraphic" in2="a" operator="in"/>
  </filter>
  <symbol id="reg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5.5" fill="none" stroke="#F6F4EF" stroke-width="1"/><path d="M12 0v24M0 12h24" stroke="#F6F4EF" stroke-width="1"/></symbol>
</svg>`;
const BAG='<path d="M8.5 11.5h13l-1.2 10.5h-10.6z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M11.8 12.5V10a3.2 3.2 0 0 1 6.4 0v2.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>';
const CLOCK='<circle cx="15" cy="15" r="6.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M15 11.2V15l2.6 1.8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';
const USER='<circle cx="15" cy="12.3" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7.5 23c1.3-4 4-6.2 7.5-6.2s6.2 2.2 7.5 6.2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>';
const NAV=[['catalog.html','一','Коллекция'],['index.html#silhouette','二','Силуэт'],['releases.html','三','Релизы'],['index.html#people','四','Люди'],['index.html#backstage','五','Бэкстейдж']];
const LOGO='M<img class="logo__o" src="img/logo-enso-o.webp" alt="O">RIN';
const navHTML=()=>NAV.map(([h,i,t])=>`<a href="${h}"><i>${i}</i>${t}</a>`).join('');
const seal=(id,cut)=>`<svg class="seal-ico" viewBox="0 0 30 30" aria-hidden="true"><defs><mask id="${id}"><rect width="30" height="30" rx="4.5" fill="#fff"/><path d="${cut}" stroke="#000" stroke-width="2.2" stroke-linecap="round"/></mask></defs><rect width="30" height="30" rx="4.5" fill="currentColor" mask="url(#${id})"/></svg>`;

const CHROME=`${DEFS}
<header class="hdr">
  <div class="wrap">
    <a class="logo" href="index.html" aria-label="MORIN, на главную">${LOGO}</a>
    <nav class="nav" aria-label="Разделы">${navHTML()}</nav>
    <div class="hdr-cta">
      <a class="btn btn--light hdr-wait" href="index.html#drop">Лист ожидания<small>до релиза ENSO</small></a>
      <a class="txtbtn acct" href="account.html" aria-label="Личный кабинет"><svg class="acct__ico" viewBox="5 5 20 20" aria-hidden="true">${USER}</svg></a>
      <a class="txtbtn cart" href="cart.html" id="cartBtn" aria-label="Корзина"><svg class="cart__ico" viewBox="5 5 20 20" aria-hidden="true">${BAG}</svg><span class="cart__n" id="cartCount">0</span></a>
      <button class="txtbtn menu-btn" type="button" id="menuBtn" aria-expanded="false" aria-controls="menu" aria-label="Меню">${seal('menuCut','M8 10.5h14M8 15h14M8 19.5h9')}</button>
    </div>
  </div>
</header>
<div class="menu" id="menu" hidden>
  <div class="scroll" role="dialog" aria-modal="true" aria-label="Меню">
    <img class="rod" src="img/scroll-rod.webp" alt="">
    <img class="tassel" src="img/tassel.webp" alt="">
    <div class="scroll__body">
      <div class="scroll__paper"><div class="sheet">
        <div class="scroll__inner">
          <div class="scroll__top"><span class="logo">${LOGO}</span><button class="scroll__close" type="button" id="menuClose" aria-label="Закрыть">${seal('closeCut','M10 10l10 10M20 10L10 20')}</button></div>
          <nav aria-label="Разделы">${navHTML()}</nav>
          <a class="btn btn--ink" href="index.html#drop">Лист ожидания</a>
          <div class="scroll__foot">
            <div class="scroll__count">до релиза ENSO<svg id="menuCount" aria-hidden="true"></svg></div>
            <img src="img/seal-moriform.webp" alt="">
          </div>
        </div>
      </div></div>
    </div>
    <img class="rod" src="img/scroll-rod.webp" alt="">
  </div>
</div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>`;

const FOOT=`<div class="wrap foot__in">
  <a class="logo" href="index.html" aria-label="MORIN, на главную">${LOGO}</a>
  <nav class="foot__links" aria-label="Контакты и документы"><a href="#" data-demo>Telegram</a><a href="#" data-demo>Instagram</a><a href="#" data-demo>Email</a><a href="privacy.html">Политика конфиденциальности</a><a href="privacy.html#offer">Оферта</a></nav>
  <p class="foot__sign">MORIN — бренд, которого нет. Придумала и собрала Надежда Короткевич</p>
</div>`;

/* ---------- семисегментные цифры ---------- */
const SEG={0:'abcdef',1:'bc',2:'abged',3:'abgcd',4:'fgbc',5:'afgcd',6:'afgedc',7:'abc',8:'abcdefg',9:'abcdfg'};
function seg7(el,str){
  if(!el)return;
  const w=12,h=22,t=2.6,g=.6;
  const seg={a:[g+1,0,w-2*g-2,t],d:[g+1,h-t,w-2*g-2,t],g:[g+1,h/2-t/2,w-2*g-2,t],f:[0,g+1,t,h/2-g-2],b:[w-t,g+1,t,h/2-g-2],e:[0,h/2+g,t,h/2-g-2],c:[w-t,h/2+g,t,h/2-g-2]};
  let x=0,out='';
  for(const ch of String(str)){
    if(ch===' '){x+=8;continue}
    if(ch==="'"){out+=`<rect x="${x}" y="0" width="${t}" height="6" transform="skewX(-8)"/>`;x+=6;continue}
    if(ch===':'){out+=`<rect x="${x}" y="5" width="${t}" height="${t}"/><rect x="${x-1}" y="${h-8}" width="${t}" height="${t}"/>`;x+=6;continue}
    if(!SEG[ch])continue;
    for(const s of SEG[ch])out+=`<rect x="${x+seg[s][0]}" y="${seg[s][1]}" width="${seg[s][2]}" height="${seg[s][3]}" rx="1" transform="skewX(-8)"/>`;
    x+=w+4;
  }
  el.setAttribute('viewBox',`-2 0 ${x+4} ${h}`);el.innerHTML=`<g fill="#C8102E">${out}</g>`;
}
const RELEASE=new Date('2026-12-12T12:00:00+03:00').getTime();
function left(){const d=Math.max(0,RELEASE-Date.now())/1000;return [Math.floor(d/86400),Math.floor(d%86400/3600),Math.floor(d%3600/60),Math.floor(d%60)].map(n=>String(n).padStart(2,'0'))}
function countdown(box){
  if(!box)return;
  const units=['дни','часы','минуты','секунды'];
  box.innerHTML=units.map(u=>`<div><svg aria-hidden="true"></svg><span>${u}</span></div>`).join('');
  const svgs=box.querySelectorAll('svg');let last='';
  const tick=()=>{const v=left();v.forEach((n,i)=>seg7(svgs[i],n));const l=`До релиза ${+v[0]} дн. ${+v[1]} ч.`;if(l!==last){box.setAttribute('aria-label',l);last=l}};
  tick();setInterval(tick,1000);
}

/* ---------- вещи (цены, составы, размеры — условные данные концепта) ---------- */
const CLOTH=['XS','S','M','L','XL'];
const PRODUCTS=[
 {id:'palto-02',n:1,name:'Пальто MORIN 02',mat:'Шерсть, воротник-стойка',cat:'Верхняя одежда',color:'Чёрный',price:56400,img:'corridor-coat',drop:true,sizes:CLOTH,
  desc:'Длинное, с воротником-стойкой. Снаружи строго, а под ним можно что угодно.',
  spec:{'Силуэт':'Прямой, длина ниже колена','Ткань':'Плотное пальтовое сукно','Посадка':'Свободная, плечо по своей линии','Состав':'Шерсть 92%, кашемир 8%','Уход':'Только сухая чистка'}},
 {id:'plate-07',n:2,name:'Платье-корсет MORIN 07',mat:'Кожа, фатин',cat:'Платья',color:'Коричневый',price:64800,img:'corset',drop:true,w:true,sizes:CLOTH,
  desc:'Кожаный корсет и юбка из фатина. Броня сверху, облако снизу — весь MORIN в одной вещи.',
  spec:{'Силуэт':'Корсет по фигуре, пышная юбка в пол','Ткань':'Гладкая кожа, многослойный фатин','Посадка':'Корсет на шнуровке, по фигуре','Состав':'Кожа натуральная; фатин — полиамид 100%','Уход':'Только сухая чистка'}},
 {id:'palto-01',n:3,name:'Пальто MORIN 01',mat:'Шерсть, плечо 46 см',cat:'Верхняя одежда',color:'Тёмно-синий',price:48900,img:'coat-long',drop:true,sizes:CLOTH,
  desc:'Длинное пальто с широким плечом. Плечо задаёт линию, остальное просто падает вниз.',
  spec:{'Силуэт':'Прямой, широкое плечо, длина макси','Ткань':'Шерстяное сукно','Посадка':'Свободная, плечо 46 см','Состав':'Шерсть 90%, полиамид 10%','Уход':'Только сухая чистка'}},
 {id:'plate-04',n:4,name:'Платье MORIN 04',mat:'Шёлк',cat:'Платья',color:'Чёрный',price:29600,img:'dress',drop:true,w:true,sizes:CLOTH,
  desc:'Длинное шёлковое платье с открытыми плечами. Ткань двигается раньше тебя.',
  spec:{'Силуэт':'Длинное, открытые плечи','Ткань':'Шёлковый атлас','Посадка':'По фигуре сверху, свободно книзу','Состав':'Шёлк 100%','Уход':'Деликатная ручная стирка или сухая чистка'}},
 {id:'kombinezon-03',n:5,name:'Комбинезон MORIN 03',mat:'Плотный хлопок',cat:'Комбинезоны',color:'Графит',price:32700,img:'jumpsuit',drop:false,sizes:CLOTH,
  desc:'Рабочий комбинезон из плотного хлопка, на размер свободнее. В нём таскают свет на съёмке, а потом идут ужинать.',
  spec:{'Силуэт':'Рабочий, прямые брюки','Ткань':'Плотный хлопковый твил','Посадка':'На размер свободнее','Состав':'Хлопок 100%','Уход':'Стирка при 30°, не отбеливать'}},
 {id:'tout-05',n:6,name:'Тоут MORIN 05',mat:'Кожа, металл',cat:'Аксессуары',color:'Серый',price:27800,img:'bag',drop:false,sizes:['One size'],
  desc:'Кожаный тоут на металлической рамке. Держит углы, даже когда пустой.',
  spec:{'Силуэт':'Жёсткий тоут на рамке','Ткань':'Гладкая кожа','Посадка':'На плечо и в руку','Состав':'Кожа натуральная, металлическая рамка','Уход':'Сухая мягкая ткань, без воды'}},
 {id:'bodi-06',n:7,name:'Боди MORIN 06',mat:'Джерси',cat:'Боди',color:'Чёрный',price:12900,img:'body',drop:false,w:true,sizes:CLOTH,
  desc:'Боди из джерси с длинными рукавами и открытой спиной. Спереди закрыто, сзади — сюрприз.',
  spec:{'Силуэт':'Длинные рукава, открытая спина','Ткань':'Плотное джерси','Посадка':'Облегающая','Состав':'Вискоза 92%, эластан 8%','Уход':'Стирка при 30°'}},
];
const byId=id=>PRODUCTS.find(p=>p.id===id);
const rub=n=>n.toLocaleString('ru-RU')+' ₽';
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

/* ---------- корзина: [{id,size,qty}] ---------- */
function load(){let c=[];try{c=JSON.parse(localStorage.getItem('morin-cart')||'[]')}catch(e){}
  if(!Array.isArray(c))c=[];
  // старый формат — массив id
  const out=[];c.forEach(x=>{const o=typeof x==='string'?{id:x,size:null,qty:1}:x;const p=byId(o.id);if(!p)return;if(!o.size)o.size=p.sizes.includes('M')?'M':p.sizes[0];const same=out.find(y=>y.id===o.id&&y.size===o.size);same?same.qty+=o.qty||1:out.push({id:o.id,size:o.size,qty:o.qty||1})});
  return out}
let cart=load();
function save(){try{localStorage.setItem('morin-cart',JSON.stringify(cart))}catch(e){}count()}
function count(){const n=cart.reduce((s,x)=>s+x.qty,0);const el=$('#cartCount');if(el)el.textContent=n;return n}
function add(id,size){const p=byId(id);if(!p)return;size=size||(p.sizes.includes('M')?'M':p.sizes[0]);const it=cart.find(x=>x.id===id&&x.size===size);it?it.qty++:cart.push({id,size,qty:1});save();toast(p.name+' — в корзине')}
let tt;function toast(t){const el=$('#toast');if(!el)return;el.textContent=t;el.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>el.classList.remove('on'),2400)}

/* ---------- карточка вещи ---------- */
function card(p){
  const act=p.drop
    ?`<a class="add" href="index.html#drop" aria-label="В лист ожидания"><span class="add__t">В лист ожидания</span><svg class="add__i" viewBox="5 5 20 20" aria-hidden="true">${CLOCK.replace(/15/g,'15')}</svg></a>`
    :`<button class="add" type="button" data-add="${p.id}" aria-label="В корзину"><span class="add__t">В корзину</span><svg class="add__i" viewBox="5 5 20 20" aria-hidden="true">${BAG}</svg></button>`;
  return `<article class="card">
     ${p.drop?'<img class="gentei" src="img/seal-gentei.webp" alt="Печать 限定: вещь из Drop 01 ENSO">':''}
     <a class="card__img" href="product.html?id=${p.id}" aria-label="${p.name}">
       <span class="film" aria-hidden="true"><i></i><i></i><i></i></span>
       <img src="img/${p.img}.jpg" alt="${p.name}" loading="lazy">
       <img src="img/${p.img}-d1.jpg" alt="" loading="lazy">
     </a>
     <h3><a href="product.html?id=${p.id}">${p.name}</a></h3><p class="mat">${p.mat}</p>
     <div class="card__buy"><span class="price">${rub(p.price)}</span>${act}</div>
   </article>`}
document.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(b&&!b.closest('form')){e.preventDefault();add(b.dataset.add,b.dataset.size)}});

/* ---------- сборка страницы ---------- */
const ch=document.getElementById('chrome');
if(ch)ch.outerHTML=CHROME;else document.body.insertAdjacentHTML('afterbegin',CHROME);
$$('[data-foot]').forEach(f=>f.innerHTML=FOOT);
count();

/* ---------- меню-свиток ---------- */
const menu=$('#menu'),mb=$('#menuBtn');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function menuCount(){const v=left();seg7($('#menuCount'),v.slice(0,3).join(':'))}
function openMenu(){menuCount();menu.hidden=false;mb.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';requestAnimationFrame(()=>requestAnimationFrame(()=>menu.classList.add('is-open')));setTimeout(()=>$('#menuClose').focus(),reduce?0:500)}
function closeMenu(){menu.classList.remove('is-open');mb.setAttribute('aria-expanded','false');document.body.style.overflow='';setTimeout(()=>{menu.hidden=true;mb.focus({preventScroll:true})},reduce?0:650)}
mb.addEventListener('click',openMenu);
$('#menuClose').addEventListener('click',closeMenu);
menu.addEventListener('click',e=>{const a=e.target.closest('nav a,.btn');if(e.target!==menu&&!a)return;
  let t=null;if(a){const u=new URL(a.href,location.href);if(u.pathname===location.pathname&&u.hash)t=document.getElementById(u.hash.slice(1))}
  if(t){e.preventDefault();closeMenu();history.replaceState(null,'',a.getAttribute('href').replace(/^[^#]*/,''));requestAnimationFrame(()=>t.scrollIntoView({behavior:reduce?'auto':'smooth'}))}else closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden)closeMenu()});

document.addEventListener('click',e=>{const a=e.target.closest('[data-demo]');if(a){e.preventDefault();toast('MORIN — демо-магазин, контакты не подключены')}});
window.MORIN={seg7,countdown,left,PRODUCTS,byId,rub,$,$$,card,add,toast,save,count,get cart(){return cart},set cart(v){cart=v;save()},BAG,CLOCK};
})();
