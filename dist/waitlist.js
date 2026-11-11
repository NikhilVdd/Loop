// Personal information is sent only to the explicitly configured endpoint.
export async function submitWaitlist(data,{endpoint='',storage=localStorage,request=fetch}={}){
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) throw new Error('Enter a valid work email address.');
  if(!data.consent) throw new Error('Please confirm the consent statement.');
  if(endpoint){
    const url=new URL(endpoint);
    if(url.protocol!=='https:') throw new Error('The configured form endpoint must use HTTPS.');
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),12000);
    try{
      const response=await request(url.href,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:controller.signal});
      if(response.status===409)return {status:'duplicate',message:'This email is already registered.'};
      if(!response.ok)throw new Error('The form could not be submitted. Please try again.');
      return {status:'success',message:'You’re on the waitlist. Thanks for your interest in Loop.'};
    }catch(error){if(error.name==='AbortError')throw new Error('The request timed out. Please try again.');throw error}finally{clearTimeout(timer)}
  }
  let entries=[];
  try{let stored=JSON.parse(storage.getItem('loop.waitlist.v1')||'[]');if(Array.isArray(stored))entries=stored}catch{}
  if(entries.some(x=>x.email===data.email))return {status:'duplicate',message:'This email already has a preview entry in this browser.'};
  entries.push({...data,createdAt:new Date().toISOString()});
  try{storage.setItem('loop.waitlist.v1',JSON.stringify(entries))}catch{throw new Error('This browser could not save your preview entry. Check available browser storage and try again.')}
  return {status:'preview',message:'Preview saved in this browser only. You have not joined a real waitlist.'};
}
