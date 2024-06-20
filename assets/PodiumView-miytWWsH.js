import{B as w,s as C,o as a,c as s,m as o,r as c,a as r,b as m,d as u,e as g,w as h,f as B,t as y,u as p,g as F,F as b,h as v,i as N,j as V,k as S,l as j}from"./index-pB6ys1aV.js";var G=function(n){var t=n.dt;return`
.p-card {
    background: `.concat(t("card.background"),`;
    color: `).concat(t("card.color"),`;
    box-shadow: `).concat(t("card.shadow"),`;
    border-radius: `).concat(t("card.border.radius"),`;
    display: flex;
    flex-direction: column;
}

.p-card-caption {
    display: flex;
    flex-direction: column;
    gap: `).concat(t("card.caption.gap"),`;
}

.p-card-body {
    padding: `).concat(t("card.body.padding"),`;
    display: flex;
    flex-direction: column;
    gap: `).concat(t("card.body.gap"),`;
}

.p-card-title {
    font-size: `).concat(t("card.title.font.size"),`;
    font-weight: `).concat(t("card.title.font.weight"),`;
}

.p-card-subtitle {
    color: `).concat(t("card.subtitle.color"),`;
}
`)},M={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},T=w.extend({name:"card",theme:G,classes:M}),z={name:"BaseCard",extends:C,style:T,provide:function(){return{$pcCard:this,$parentInstance:this}}},$={name:"Card",extends:z,inheritAttrs:!1};function A(e,n,t,i,d,k){return a(),s("div",o({class:e.cx("root")},e.ptmi("root")),[e.$slots.header?(a(),s("div",o({key:0,class:e.cx("header")},e.ptm("header")),[c(e.$slots,"header")],16)):r("",!0),m("div",o({class:e.cx("body")},e.ptm("body")),[e.$slots.title||e.$slots.subtitle?(a(),s("div",o({key:0,class:e.cx("caption")},e.ptm("caption")),[e.$slots.title?(a(),s("div",o({key:0,class:e.cx("title")},e.ptm("title")),[c(e.$slots,"title")],16)):r("",!0),e.$slots.subtitle?(a(),s("div",o({key:1,class:e.cx("subtitle")},e.ptm("subtitle")),[c(e.$slots,"subtitle")],16)):r("",!0)],16)):r("",!0),m("div",o({class:e.cx("content")},e.ptm("content")),[c(e.$slots,"content")],16),e.$slots.footer?(a(),s("div",o({key:1,class:e.cx("footer")},e.ptm("footer")),[c(e.$slots,"footer")],16)):r("",!0)],16)],16)}$.render=A;const D={class:"d-flex d-col"},E=u({__name:"GameClassement",props:["game"],setup(e){const n=e,t=["🤯","🤔","👹","🤯","😬"];let i=["🥇","🥈","🥉"].concat(Array(n.game.scores.length-3).fill(t[Math.floor(Math.random()*6)]));return(d,k)=>e.game?(a(),g(p($),{key:0},{title:h(()=>[B(y(p(F)(n.game.date)+" - "+n.game.gameName),1)]),content:h(()=>[m("div",D,[(a(!0),s(b,null,v(n.game.scores,(l,f)=>(a(),s("span",{key:f},y(p(i)[f]+" "+l.name+" : "+l.total+" point"+(l.total<-1||l.total>1?"s":"")),1))),128))])]),_:1})):r("",!0)}}),L={key:0,class:"d-flex",style:{"{flex-wrap":"wrap}"}},P=u({__name:"RecentGames",setup(e){const n=N([]);return V(async()=>{n.value=await S()}),(t,i)=>n.value.length>0?(a(),s("div",L,[(a(!0),s(b,null,v(n.value,d=>(a(),g(E,{game:d,key:d.date},null,8,["game"]))),128))])):r("",!0)}}),_={class:"about"},R=u({__name:"PodiumView",setup(e){return(n,t)=>(a(),s("div",_,[j(P)]))}});export{R as default};
