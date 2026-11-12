let observer, revealObserver, cleanup = [];
const reduced=()=>document.documentElement.dataset.reduced==='true';
export function bindMotion(){observer?.disconnect();revealObserver?.disconnect();cleanup.forEach(fn=>fn());cleanup=[];
  document.querySelectorAll('.reveal').forEach(el=>{if(reduced())el.classList.add('seen');else el.dataset.revealReady='true'});
  revealObserver=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(isIntersecting){target.classList.add('seen');revealObserver.unobserve(target)}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
  observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>target.classList.toggle('is-visible',isIntersecting)),{threshold:.15});
  document.querySelectorAll('[data-motion-art]').forEach(el=>observer.observe(el));
  document.querySelectorAll('[data-sequence]').forEach(el=>{let timer=null,step=-1,started=false,onscreen=false;const paint=()=>el.querySelectorAll('[data-step]').forEach((node,i)=>{node.classList.toggle('arrived',i<=step);node.classList.toggle('current',i===step)});function stop(){clearInterval(timer);timer=null}function finish(){step=3;paint();el.style.setProperty('--sequence-progress','100%')}function advance(){step++;paint();el.style.setProperty('--sequence-progress',Math.max(0,step)/3*100+'%');if(step>=3)stop()}function start(){stop();started=true;if(reduced()){finish();return}step=-1;advance();timer=setInterval(advance,1100)}
    const local=new IntersectionObserver(entries=>entries.forEach(e=>{onscreen=e.isIntersecting;if(!e.isIntersecting||document.hidden)stop();else if(!started)start();else if(step<3&&!reduced())timer??=setInterval(advance,1100)}),{threshold:.3});local.observe(el);
    const replay=el.querySelector('.sequence-replay');replay.onclick=start;
    const hidden=()=>{if(document.hidden)stop();else if(onscreen&&step<3&&!reduced())timer??=setInterval(advance,1100)};document.addEventListener('visibilitychange',hidden);
    const media=new MutationObserver(()=>{if(reduced()){stop();finish()}});media.observe(document.documentElement,{attributes:true,attributeFilter:['data-reduced']});
    cleanup.push(()=>{stop();local.disconnect();media.disconnect();document.removeEventListener('visibilitychange',hidden)});
    if(reduced())finish();
  });
}
