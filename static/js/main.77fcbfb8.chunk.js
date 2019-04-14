(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{153:function(e,a,t){},154:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),i=t(10),l=t.n(i),c=t(13),s=t(12),o=t(15),m=t(14),u=t(16),v=t(30),h=t(18),d=t.n(h),p=t(27),g=t(4),f=t(158),b=t(42),L=t(63),x={CHARACTER_DATA:"character",CRAFTING_CLASS_DATA:"craftingClasses"};function E(e,a){localStorage.setItem(e,JSON.stringify(a))}function C(){var e=Object(g.map)(b,function(e){return e.currentLevel=1,e.currentExperience=0,e.experiencePerItem=1,e.totalExperience=300,e}),a=localStorage.getItem(x.CRAFTING_CLASS_DATA);if(!a)return e;var t=JSON.parse(a),n=[];return e.forEach(function(e){var a=Object(g.find)(t,function(a){return a.abbreviation===e.abbreviation});if(a){var r=Object(g.filter)(Object(L.diff)(a,e),function(e){return"add"===e.type});r.length>0&&Object(L.applyChanges)(a,r),n.push(a)}else n.push(e)}),n}function O(){var e=localStorage.getItem(x.CHARACTER_DATA);if(e)return JSON.parse(e)}var y=t(50),j=t.n(y),D="https://xivapi.com",S=function(){var e=Object(p.a)(d.a.mark(function e(a,t){var n,r,i=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=i.length>2&&void 0!==i[2]?i[2]:1,e.next=3,j.a.get("".concat(D,"/character/search?name=").concat(t,"&server=").concat(a,"&page=").concat(n));case 3:return r=e.sent,e.abrupt("return",Object(g.get)(r,"data",[]));case 5:case"end":return e.stop()}},e)}));return function(a,t){return e.apply(this,arguments)}}(),k=function(){var e=Object(p.a)(d.a.mark(function e(a){var t;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.a.get("".concat(D,"/character/").concat(a,"?extended=1"));case 2:return t=e.sent,Object(g.set)(t,"data.characterId",a),e.abrupt("return",Object(g.get)(t,"data",{}));case 5:case"end":return e.stop()}},e)}));return function(a){return e.apply(this,arguments)}}(),w=t(160),A=t(159),I=t(90),N=t(155),P=t(88),G={characterId:void 0,loading:!1,name:void 0,searchResult:void 0,server:void 0},F=function(e){function a(){var e,t;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(t=Object(o.a)(this,(e=Object(m.a)(a)).call.apply(e,[this].concat(r)))).state=Object(g.cloneDeep)(G),t}return Object(u.a)(a,e),Object(s.a)(a,[{key:"handleHide",value:function(){(0,this.props.onHide)(),this.setState(Object(v.a)({},G))}},{key:"handleSearch",value:function(e){e&&e.preventDefault();var a=this.state,t=a.name,n=a.server;t&&n?this.setState({loading:!0,characterId:void 0},this.findCharacters):alert("Name and Server are required to find your character data.  Please fill out both fields and try again.")}},{key:"handleSelect",value:function(e){this.setState({characterId:e})}},{key:"handleChangePage",value:function(e){this.setState({loading:!0},this.findCharacters.bind(this,e))}},{key:"handleServerSelect",value:function(e){var a=Object(g.get)(e,"target.value",e);this.setState({server:a})}},{key:"handleNameEntry",value:function(e){var a=Object(g.get)(e,"target.value",e);this.setState({name:a})}},{key:"findCharacters",value:function(){var e=Object(p.a)(d.a.mark(function e(){var a,t,n,r,i,l=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=l.length>0&&void 0!==l[0]?l[0]:1,t=this.state,n=t.name,r=t.server,e.next=4,S(r,n,a);case 4:i=e.sent,this.setState({searchResult:i,loading:!1});case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"handleSubmit",value:function(){var e=Object(p.a)(d.a.mark(function e(){var a,t,n;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=this.props.onSelect,t=this.state.characterId,e.next=4,k(t);case 4:n=e.sent,a(n),this.handleHide();case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,a=this.props.show,t=this.state,n=t.characterId,i=t.loading,l=t.name,c=t.searchResult,s=t.server;return r.a.createElement(w.a,{show:a,onHide:this.handleHide.bind(this)},r.a.createElement(w.a.Header,{closeButton:!0},r.a.createElement(w.a.Title,null,"Import Character Data")),r.a.createElement(w.a.Body,null,r.a.createElement(A.a,null,r.a.createElement(A.a.Group,null,r.a.createElement(A.a.Label,null,"Server"),r.a.createElement(A.a.Control,{as:"select",onChange:this.handleServerSelect.bind(this)},r.a.createElement("option",null,"Choose a Server"),Object(g.map)(P,function(e,a){return r.a.createElement("option",{key:a,value:e},e)}))),r.a.createElement(A.a.Group,null,r.a.createElement(A.a.Label,null,"Name"),r.a.createElement(A.a.Control,{type:"text",onChange:this.handleNameEntry.bind(this)})),r.a.createElement(I.a,{type:"submit",onClick:this.handleSearch.bind(this),disabled:!l||!s},"Search")),r.a.createElement("hr",null),!!i&&r.a.createElement("div",{className:"fullWidth text-center"},r.a.createElement(N.a,{animation:"grow",variant:"danger"}),r.a.createElement(N.a,{animation:"grow",variant:"warning"}),r.a.createElement(N.a,{animation:"grow",variant:"success"})),!i&&!c&&r.a.createElement("div",{className:"fullWidth text-center"},"No results to display."),!i&&!!c&&r.a.createElement("div",null,r.a.createElement("div",{className:"results"},r.a.createElement("table",{className:"fullWidth"},r.a.createElement("tbody",null,Object(g.map)(Object(g.get)(c,"Results",[]),function(a,t){return r.a.createElement("tr",{key:t},r.a.createElement("td",{className:"text-left"},r.a.createElement(A.a.Check,{type:"radio",label:a.Name,name:"characterData",value:a.ID,onChange:e.handleSelect.bind(e,a.ID)})),r.a.createElement("td",{className:"text-right"},r.a.createElement("img",{src:a.Avatar,alt:a.Name,width:36,height:36,style:{marginRight:"1em"}})))})))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col text-left"},!!c.Pagination&&!!c.Pagination.PagePrev&&r.a.createElement(I.a,{variant:"dark",onClick:this.handleChangePage.bind(this,c.Pagination.PagePrev)},"Prev Page")),r.a.createElement("div",{className:"col text-right"},!!c.Pagination&&!!c.Pagination.PageNext&&r.a.createElement(I.a,{variant:"dark",onClick:this.handleChangePage.bind(this,c.Pagination.PageNext)},"Next Page"))))),r.a.createElement(w.a.Footer,null,r.a.createElement(I.a,{variant:"danger",onClick:this.handleHide.bind(this)},"Cancel"),r.a.createElement(I.a,{variant:"success",onClick:this.handleSubmit.bind(this),disabled:!n},"Select")))}}]),a}(r.a.Component),R=t(157),T=t(156),M=t(165),B=t(164),H=t(91),_=t(45),U=t(46),J=function(e){function a(e){var t;Object(c.a)(this,a),t=Object(o.a)(this,Object(m.a)(a).call(this,e));var n=e.currentLevel,r=e.currentExperience,i=e.experiencePerItem,l=e.totalExperience;return t.state={currentLevel:n,currentExperience:r,experiencePerItem:i,totalExperience:l},t}return Object(u.a)(a,e),Object(s.a)(a,null,[{key:"validateValue",value:function(e,a,t){return e?(a=parseInt(a),t=parseInt(t),(e=parseInt(e))<a?a:e>t?t:e):0}}]),Object(s.a)(a,[{key:"componentDidUpdate",value:function(e,a,t){var n=this,r={};Object(g.forEach)(["currentLevel","currentExperience","experiencePerItem","totalExperience"],function(a){Object(g.isEqual)(n.props[a],e[a])||Object(g.set)(r,a,n.props[a])}),Object.keys(r).length>0&&this.setState(Object(v.a)({},r))}},{key:"handleFieldUpdate",value:function(e){var t=Object(g.get)(e,"target.name"),n=Object(g.get)(e,"target.value"),r=a.validateValue(n,Object(g.get)(e,"target.min"),Object(g.get)(e,"target.max")),i={};Object(g.set)(i,t,r),"currentLevel"===t&&Object(g.set)(i,"totalExperience",H[r]),this.setState(Object(v.a)({},i))}},{key:"handleLocalStorageUpdate",value:function(e){var a=this.props.updateLocalStorage,t=Object(g.get)(e,"target.name"),n={};n[t]=this.state[t],"currentLevel"===t&&Object(g.set)(n,"totalExperience",Object(g.get)(this.state,"totalExperience")),a(n)}},{key:"getLevelingGuidePageUrl",value:function(){var e=this.props.levelingGuide,a=this.state.currentLevel,t=Object(g.find)(e.pages,function(e){var t=e.maxLevel,n=e.minLevel;if(a>=n&&a<=t)return!0});return t?"".concat(e.url,"/").concat(t.page,"/"):e.url}},{key:"render",value:function(){var e=this.props.name,a=this.state,t=a.currentLevel,n=a.currentExperience,i=a.experiencePerItem,l=a.totalExperience,c=l-n,s=0===l?0:Math.floor(n/l*100),o=r.a.createElement(T.a,{id:"links-".concat(e)},r.a.createElement("a",{href:this.getLevelingGuidePageUrl(),target:"_blank"},"Leveling Guide"));return r.a.createElement("tr",{className:"calculations"},r.a.createElement("td",null,r.a.createElement("div",{className:"flex justify-between items-center"},r.a.createElement("span",null,e),r.a.createElement(M.a,{trigger:"click",placement:"right",overlay:o,rootClose:!0},r.a.createElement(_.a,{icon:U.a,className:"text-primary",onBlur:function(){return console.log("blurreddd")}})))),r.a.createElement("td",null,r.a.createElement(A.a.Control,{type:"number",min:1,max:69,value:t,name:"currentLevel",onChange:this.handleFieldUpdate.bind(this),onBlur:this.handleLocalStorageUpdate.bind(this)})),r.a.createElement("td",null,r.a.createElement(A.a.Control,{type:"number",min:0,max:l,value:n,name:"currentExperience",onChange:this.handleFieldUpdate.bind(this),onBlur:this.handleLocalStorageUpdate.bind(this)})),r.a.createElement("td",null,l),r.a.createElement("td",null,c),r.a.createElement("td",null,r.a.createElement(A.a.Control,{type:"number",min:1,max:l,value:i,name:"experiencePerItem",onChange:this.handleFieldUpdate.bind(this),onBlur:this.handleLocalStorageUpdate.bind(this)})),r.a.createElement("td",null,Math.max(Math.ceil(c/i),0)),r.a.createElement("td",null,r.a.createElement(B.a,{now:s,label:"".concat(n," / ").concat(l," (").concat(s,"%)")})))}}]),a}(r.a.Component),W=function(e){function a(){return Object(c.a)(this,a),Object(o.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(u.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){var e=this.props,a=e.className,t=e.text,n=e.sortField,i=e.updateSorting;return console.log(a),r.a.createElement("th",{className:a,onClick:i.bind(this,n),style:{cursor:"pointer"}},t,r.a.createElement(_.a,{className:"margin-left",icon:U.b}))}}]),a}(r.a.Component);function V(e){return e.totalExperience?e.currentExperience/e.totalExperience:0}var q=function(e){function a(){return Object(c.a)(this,a),Object(o.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(u.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){var e=this,a=this.props,t=a.classData,n=a.updateLocalStorage,i=a.updateSorting;return r.a.createElement("div",null,r.a.createElement(R.a,{hover:!0,striped:!0,className:"calculations"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement(W,{text:"Class",sortField:"name",updateSorting:i}),r.a.createElement(W,{text:"Level",sortField:"currentLevel",updateSorting:i,className:"numeric-entry"}),r.a.createElement("th",{className:"numeric-entry"},"Current Exp."),r.a.createElement("th",null,"Required Exp."),r.a.createElement("th",null,"Remaining Exp."),r.a.createElement("th",{className:"numeric-entry"},"Exp. Per Item"),r.a.createElement("th",null,"Remaining Items"),r.a.createElement(W,{text:"Progress",sortField:V,updateSorting:i}))),r.a.createElement("tbody",null,!!t&&Object(g.map)(t,function(a,t){return r.a.createElement(J,Object.assign({key:t},a,{updateLocalStorage:n.bind(e,a.abbreviation)}))}))))}}]),a}(r.a.Component);q.defaultProps={classData:[]};var Z=q,Y=t(161),K=t(163),X=t(162),z=function(e){function a(){return Object(c.a)(this,a),Object(o.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(u.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){var e=this,a=this.props,t=a.activateLodestoneModal,n=a.characterData,i=a.characterIsLoaded,l=a.clearCharacterData,c=a.clearCraftingClassData,s=a.filterData,o=a.refreshCharacterData,m=a.setFilter;return r.a.createElement(Y.a,{bg:"dark",variant:"dark",sticky:"top"},r.a.createElement(Y.a.Brand,null,"FFXIV Crafting & Gathering Helper"),r.a.createElement(K.a,{className:"mr-auto"},r.a.createElement(X.a,{title:"Showing ".concat(s.label)},r.a.createElement(X.a.Item,{onClick:m.bind(this,"All",void 0)},"Show All"),r.a.createElement(X.a.Divider,null),r.a.createElement(X.a.Item,{onClick:m.bind(this,"Crafting Classes",function(e){return"crafting"===e.type})},"Crafting Classes"),r.a.createElement(X.a.Item,{onClick:m.bind(this,"Gathering Classes",function(e){return"gathering"===e.type})},"Gathering Classes"),r.a.createElement(X.a.Divider,null),Object(g.map)(Object(g.orderBy)(b,"name"),function(a,t){return r.a.createElement(X.a.Item,{key:t,onClick:m.bind(e,a.name,function(e){return a.abbreviation===e.abbreviation})},a.name)}))),r.a.createElement(K.a,null,!i&&r.a.createElement(r.a.Fragment,null,r.a.createElement(K.a.Link,{onClick:t.bind(this)},"Import Character Data"),r.a.createElement(K.a.Link,{onClick:c.bind(this)},"Clear Crafting Class Data")),i&&r.a.createElement(X.a,{title:r.a.createElement("span",null,n.Character.Name,r.a.createElement("img",{src:n.Character.Avatar,alt:n.Character.Name,className:"character-icon"})),className:"dropleft"},r.a.createElement(X.a.Item,{onClick:o.bind(this)},"Refresh Character Class Data"),r.a.createElement(X.a.Divider,null),r.a.createElement(X.a.Item,{onClick:t.bind(this)},"Import Different Character Data"),r.a.createElement(X.a.Item,{onClick:l.bind(this)},"Clear Character Data"),r.a.createElement(X.a.Divider,null),r.a.createElement(X.a.Item,{onClick:c.bind(this)},"Clear Crafting Class Data"))))}}]),a}(r.a.Component),Q=function(e){function a(){return Object(c.a)(this,a),Object(o.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(u.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){var e=this.props,a=e.characterIsLoaded,t=e.characterData,n=e.refreshCharacterData;return r.a.createElement(r.a.Fragment,null,!a&&!!t&&r.a.createElement("div",{className:"alert alert-info text-center"},r.a.createElement("div",null,"Your character is being imported for the first time. Congratulations!",r.a.createElement("br",null),"Please wait a few minutes and try your import again."),r.a.createElement("div",null,!!t.characterId&&r.a.createElement(I.a,{variant:"info",onClick:n.bind(this,t.characterId)},"Try Again"))))}}]),a}(r.a.Component),$=function(e){function a(){var e,t;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(t=Object(o.a)(this,(e=Object(m.a)(a)).call.apply(e,[this].concat(r)))).state={lodestoneModalIsOpen:!1,sortData:{field:"name",direction:"asc"},filterData:{label:"All",criteria:void 0}},t}return Object(u.a)(a,e),Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=O(),a=C();this.setState({characterData:e,classData:a})}},{key:"activateLodestoneModal",value:function(){this.setState({lodestoneModalIsOpen:!0})}},{key:"deactivateLodestoneModal",value:function(){this.setState({lodestoneModalIsOpen:!1})}},{key:"clearCharacterData",value:function(){localStorage.getItem(x.CHARACTER_DATA)&&localStorage.removeItem(x.CHARACTER_DATA),this.setState({characterData:void 0})}},{key:"clearCraftingClassData",value:function(){localStorage.getItem(x.CRAFTING_CLASS_DATA)&&localStorage.removeItem(x.CRAFTING_CLASS_DATA),this.setState({classData:C()})}},{key:"refreshCharacterData",value:function(){var e=Object(p.a)(d.a.mark(function e(a){var t,n;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=Object(g.get)(this.state,"characterData.Character.ID",a),e.next=3,k(t);case 3:n=e.sent,this.updateCharacterData(n);case 5:case"end":return e.stop()}},e,this)}));return function(a){return e.apply(this,arguments)}}()},{key:"updateCharacterData",value:function(e){!function(e){E(x.CHARACTER_DATA,e)}(e),this.setState({characterData:e},this.updateStoredDataWithLodestoneData.bind(this))}},{key:"updateClassData",value:function(e){var a;a=e,E(x.CRAFTING_CLASS_DATA,a),this.setState({classData:e})}},{key:"updateStoredDataWithLodestoneData",value:function(){this.updateClassData(function(){var e=["Disciple of the Land","Disciple of the Hand"],a=C(),t=Object(g.filter)(Object(g.values)(Object(g.get)(O(),"Character.ClassJobs")),function(a){return Object(g.includes)(e,Object(g.get)(a,"Class.ClassJobCategory.Name"))});return Object(g.map)(a,function(e){var a=Object(g.find)(t,function(a){return Object(g.get)(a,"Class.Abbreviation")===Object(g.get)(e,"abbreviation")});return Object(g.set)(e,"currentLevel",Object(g.get)(a,"Level",1)),Object(g.set)(e,"currentExperience",Object(g.get)(a,"ExpLevel",0)),Object(g.set)(e,"totalExperience",Object(g.get)(a,"ExpLevelMax",e.totalExperience)),e})}())}},{key:"updateLocalStorage",value:function(e,a){var t=this.state.classData,n=Object(g.cloneDeep)(t),r=Object(g.find)(n,function(a){return a.abbreviation===e});if(r){var i=Object(v.a)({},r,a),l=Object(g.uniqBy)(Object(g.concat)(i,n),function(e){return e.abbreviation});this.updateClassData(l)}}},{key:"applySorting",value:function(e){var a=this.state.sortData;return Object(g.orderBy)(Object(g.cloneDeep)(e),a.field,a.direction)}},{key:"setSorting",value:function(e){var a=this.state.sortData,t=Object(v.a)({},a);Object(g.isEqual)(JSON.stringify(a.field),JSON.stringify(e))?t.direction="asc"===a.direction?"desc":"asc":(t.field=e,t.direction="asc"),this.setState({sortData:t})}},{key:"applyFilter",value:function(e){var a=this.state.filterData;return Object(g.filter)(Object(g.cloneDeep)(e),a.criteria)}},{key:"setFilter",value:function(e,a){this.setState({filterData:{label:e,criteria:a}})}},{key:"render",value:function(){var e=this.state,a=e.characterData,t=e.classData,n=e.filterData,i=e.lodestoneModalIsOpen,l=!!a&&!!a.Character;return r.a.createElement(r.a.Fragment,null,r.a.createElement(z,{activateLodestoneModal:this.activateLodestoneModal.bind(this),characterData:a,characterIsLoaded:l,clearCharacterData:this.clearCharacterData.bind(this),clearCraftingClassData:this.clearCraftingClassData.bind(this),filterData:n,refreshCharacterData:this.refreshCharacterData.bind(this),setFilter:this.setFilter.bind(this)}),r.a.createElement(f.a,{fluid:!0},r.a.createElement(Q,{characterData:a,characterIsLoaded:l,refreshCharacterData:this.refreshCharacterData.bind(this)}),r.a.createElement(Z,{classData:this.applyFilter(this.applySorting(t)),updateLocalStorage:this.updateLocalStorage.bind(this),updateSorting:this.setSorting.bind(this)}),r.a.createElement("hr",null),r.a.createElement("div",{className:"text-center text-muted"},"Version ","0.2.4")),r.a.createElement(F,{show:i,onHide:this.deactivateLodestoneModal.bind(this),onSelect:this.updateCharacterData.bind(this)}))}}]),a}(r.a.Component),ee=function(e){function a(){return Object(c.a)(this,a),Object(o.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(u.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement($,null)}}]),a}(r.a.Component);t(153);l.a.render(r.a.createElement(ee,null),document.getElementById("root"))},42:function(e){e.exports=[{name:"Alchemist",abbreviation:"ALC",type:"crafting",levelingGuide:{url:"https://www.ffxivguild.com/ffxiv-alc-alchemist-leveling-guide-ffxivarr",pages:[{page:1,minLevel:1,maxLevel:14},{page:2,minLevel:15,maxLevel:34},{page:3,minLevel:35,maxLevel:49},{page:4,minLevel:50,maxLevel:59},{page:5,minLevel:60,maxLevel:64},{page:6,minLevel:65,maxLevel:69}]}},{name:"Armorer",abbreviation:"ARM",type:"crafting",levelingGuide:{url:"https://www.ffxivguild.com/ffxiv-arm-armorsmith-leveling-guide-ffxivarr",pages:[{page:1,minLevel:1,maxLevel:14},{page:2,minLevel:15,maxLevel:34},{page:3,minLevel:35,maxLevel:49},{page:4,minLevel:50,maxLevel:59},{page:5,minLevel:60,maxLevel:64},{page:6,minLevel:65,maxLevel:69}]}},{name:"Blacksmith",abbreviation:"BSM",type:"crafting",levelingGuide:{url:"https://www.ffxivguild.com/ffxiv-bsm-blacksmith-leveling-guide-ffxivarr",pages:[{page:1,minLevel:1,maxLevel:14},{page:2,minLevel:15,maxLevel:34},{page:3,minLevel:35,maxLevel:49},{page:4,minLevel:50,maxLevel:59},{page:5,minLevel:60,maxLevel:64},{page:6,minLevel:65,maxLevel:69}]}},{name:"Carpenter",abbreviation:"CRP",type:"crafting",levelingGuide:{url:"https://www.ffxivguild.com/ffxiv-crp-carpenter-leveling-guide-ffxivarr",pages:[{page:1,minLevel:1,maxLevel:14},{page:2,minLevel:15,maxLevel:34},{page:3,minLevel:35,maxLevel:49},{page:4,minLevel:50,maxLevel:59},{page:5,minLevel:60,maxLevel:64},{page:6,minLevel:65,maxLevel:69}]}},{name:"Culinarian",abbreviation:"CUL",type:"crafting",levelingGuide:{url:"https://www.ffxivguild.com/ffxiv-cul-culinarian-leveling-guide-ffxivarr",pages:[{page:1,minLevel:1,maxLevel:14},{page:2,minLevel:15,maxLevel:34},{page:3,minLevel:35,maxLevel:49},{page:4,minLevel:50,maxLevel:59},{page:5,minLevel:60,maxLevel:64},{page:6,minLevel:65,maxLevel:69}]}},{name:"Goldsmith",abbreviation:"GSM",type:"crafting",levelingGuide:{url:"https://www.ffxivguild.com/ffxiv-gsm-goldsmith-leveling-guide-ffxivarr",pages:[{page:1,minLevel:1,maxLevel:14},{page:2,minLevel:15,maxLevel:34},{page:3,minLevel:35,maxLevel:49},{page:4,minLevel:50,maxLevel:59},{page:5,minLevel:60,maxLevel:64},{page:6,minLevel:65,maxLevel:69}]}},{name:"Leatherworker",abbreviation:"LTW",type:"crafting",levelingGuide:{url:"https://www.ffxivguild.com/ffxiv-ltw-leatherworker-leveling-guide-ffxivarr",pages:[{page:1,minLevel:1,maxLevel:14},{page:2,minLevel:15,maxLevel:34},{page:3,minLevel:35,maxLevel:49},{page:4,minLevel:50,maxLevel:59},{page:5,minLevel:60,maxLevel:64},{page:6,minLevel:65,maxLevel:69}]}},{name:"Weaver",abbreviation:"WVR",type:"crafting",levelingGuide:{url:"https://www.ffxivguild.com/ffxiv-wvr-weaver-leveling-guide-ffxivarr",pages:[{page:1,minLevel:1,maxLevel:14},{page:2,minLevel:15,maxLevel:34},{page:3,minLevel:35,maxLevel:49},{page:4,minLevel:50,maxLevel:59},{page:5,minLevel:60,maxLevel:64},{page:6,minLevel:65,maxLevel:69}]}},{name:"Botanist",abbreviation:"BTN",type:"gathering",levelingGuide:{url:"https://www.ffxivguild.com/ff14-botany-botanist-leveling-guide-a-realm-reborn",pages:[{page:1,minLevel:1,maxLevel:15},{page:2,minLevel:16,maxLevel:35},{page:3,minLevel:36,maxLevel:49},{page:4,minLevel:50,maxLevel:59},{page:6,minLevel:60,maxLevel:69}]}},{name:"Miner",abbreviation:"MIN",type:"gathering",levelingGuide:{url:"https://www.ffxivguild.com/ff14-mining-miner-leveling-guide-a-realm-reborn",pages:[{page:1,minLevel:1,maxLevel:15},{page:2,minLevel:16,maxLevel:35},{page:3,minLevel:36,maxLevel:49},{page:4,minLevel:50,maxLevel:59},{page:6,minLevel:60,maxLevel:69}]}},{name:"Fisherman",abbreviation:"FSH",type:"gathering",levelingGuide:{url:"https://www.ffxivguild.com/ff14-fishing-fisher-leveling-guide-a-realm-reborn",pages:[{page:1,minLevel:1,maxLevel:14},{page:2,minLevel:15,maxLevel:34},{page:3,minLevel:34,maxLevel:49},{page:4,minLevel:50,maxLevel:54},{page:5,minLevel:55,maxLevel:59},{page:6,minLevel:60,maxLevel:69}]}}]},88:function(e){e.exports=["Adamantoise","Aegis","Alexander","Anima","Asura","Atomos","Bahamut","Balmung","Behemoth","Belias","Brynhildr","Cactuar","Carbuncle","Cerberus","Chocobo","Coeurl","Diabolos","Durandal","Excalibur","Exodus","Faerie","Famfrit","Fenrir","Garuda","Gilgamesh","Goblin","Gungnir","Hades","Hyperion","Ifrit","Ixion","Jenova","Kujata","Lamia","Leviathan","Lich","Louisoix","Malboro","Mandragora","Masamune","Mateus","Midgardsormr","Moogle","Odin","Omega","Pandaemonium","Phoenix","Ragnarok","Ramuh","Ridill","Sargatanas","Shinryu","Shiva","Siren","Tiamat","Titan","Tonberry","Typhon","Ultima","Ultros","Unicorn","Valefor","Yojimbo","Zalera","Zeromus","Zodiark"]},91:function(e){e.exports={1:300,2:600,3:1100,4:1700,5:2300,6:4200,7:6e3,8:7350,9:9930,10:11800,11:15600,12:19600,13:23700,14:26400,15:30500,16:35400,17:40500,18:45700,19:51e3,20:56600,21:63900,22:71400,23:79100,24:87100,25:95200,26:109800,27:124800,28:140200,29:155900,30:162500,31:175900,32:189600,33:203500,34:217900,35:232320,36:249900,37:267800,38:286200,39:304900,40:324e3,41:340200,42:356800,43:373700,44:390800,45:408200,46:437600,47:467500,48:498e3,49:529e3,50:864e3,51:1058400,52:1267200,53:1555200,54:1872e3,55:2217600,56:2592e3,57:2995200,58:3427200,59:3888e3,60:447e4,61:4873e3,62:5316e3,63:5809e3,64:6364e3,65:6995e3,66:7722e3,67:8575e3,68:9593e3,69:10826e3}},97:function(e,a,t){e.exports=t(154)}},[[97,1,2]]]);
//# sourceMappingURL=main.77fcbfb8.chunk.js.map