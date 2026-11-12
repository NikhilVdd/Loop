import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {pricingConfig,estimateMonthly} from '../dist/pricing-config.js';

test('monthly totals reflect proposed plan price and member count',()=>{
 assert.equal(estimateMonthly('team',10).total,120);
 assert.equal(estimateMonthly('business',25).total,600);
 assert.equal(estimateMonthly('starter',50).total,0);
 assert.equal(estimateMonthly('enterprise',50).total,null);
 for(const seats of [0,-1,1.5,1001,NaN,Infinity])assert.ok(estimateMonthly('team',seats).error);
 assert.ok(estimateMonthly('unknown',10).error);
});
test('every proposed feature has explicit current availability',()=>{
 for(const plan of pricingConfig.plans)for(const id of plan.features){const feature=pricingConfig.features.find(f=>f.id===id);assert.ok(feature);assert.ok(pricingConfig.availability[feature.availability]);assert.ok(feature.detail)}
 for(const id of ['permissions','admin','governance','support'])assert.equal(pricingConfig.features.find(f=>f.id===id).availability,'planned');
});
const boot=readFileSync(new URL('../dist/appearance-boot.js',import.meta.url),'utf8');
function resolve({preference={},systemDark=false,systemReduced=false,workspace={},broken=false}={}){
 const root={dataset:{}};
 const localStorage={getItem:key=>{if(broken)throw Error('Storage unavailable');return JSON.stringify(key==='loop.appearance.v1'?preference:workspace)}};
 vm.runInNewContext(boot,{document:{documentElement:root},localStorage,matchMedia:q=>({matches:q.includes('color-scheme')?systemDark:systemReduced})});
 return root.dataset;
}
test('first paint follows system color, explicit choices take precedence',()=>{
 assert.equal(resolve({systemDark:true}).theme,'dark');assert.equal(resolve({systemDark:false}).theme,'light');
 assert.deepEqual({...resolve({preference:{theme:'light',material:'solid'},systemDark:true})},{theme:'light',material:'solid',reduced:'false'});
 assert.equal(resolve({preference:{theme:'invalid',material:'invalid'},systemDark:true}).material,'glass');
 assert.equal(resolve({broken:true,systemDark:false}).theme,'light');
});
test('motion respects both system accessibility and existing workspace preference',()=>{
 assert.equal(resolve({systemReduced:true}).reduced,'true');assert.equal(resolve({workspace:{reduced:true}}).reduced,'true');
});
test('direct pricing entry includes identical boot and app assets',()=>{
 const root=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
 const pricing=readFileSync(new URL('../dist/pricing/index.html',import.meta.url),'utf8');
 for(const asset of ['/appearance-boot.js','/tokens.css','/styles.css','/marketing.css','/motion.css','/app.js']){assert.ok(root.includes(asset));assert.ok(pricing.includes(asset))}
 assert.ok(pricing.indexOf('/appearance-boot.js')<pricing.indexOf('/tokens.css'));
});
