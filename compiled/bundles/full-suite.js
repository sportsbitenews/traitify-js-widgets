this.Traitify=new function(){var e;return e=function(e){var t;return t=Object(),t.then=function(e){return t.resolved?e(t.data):t.thenCallback=e,t},t.resolved=!1,t.resolve=function(e){return t.data=e,t.thenCallback?t.thenCallback(e):t.resolved=!0,t},t["catch"]=function(e){return t.rejected?e(t.error):t.rejectCallback=e,t},t.rejected=!1,t.reject=function(e){return t.error=e,t.rejectCallback?t.rejectCallback(data):t.rejected=!0,t},e(t.resolve,t.reject),t},this.host="https://api.traitify.com",this.version="v1",this.testMode=!1,this.setTestMode=function(e){return this.testMode=e,this},this.setHost=function(e){return e=e.replace("http://","").replace("https://",""),e="https://"+e,this.host=e,this},this.setPublicKey=function(e){return this.publicKey=e,this},this.setVersion=function(e){return this.version=e,this},this.ajax=function(e,t,n,i){var a;return e=""+this.host+"/"+this.version+e,a=new XMLHttpRequest,"withCredentials"in a?a.open(t,e,!0):"undefined"!=typeof XDomainRequest?(a=new XDomainRequest,a.open(t,e)):(console.log("There was an error making the request."),a=null),a.open(t,e,!0),a.setRequestHeader("Authorization","Basic "+btoa(this.publicKey+":x")),a.setRequestHeader("Content-type","application/json"),a.setRequestHeader("Accept","application/json"),a.onload=function(){var e;return e=JSON.parse(a.response),n(e),!1},a.send(i),this},this.put=function(e,t,n){return this.ajax(e,"PUT",n,t),this},this.get=function(e,t){return this.ajax(e,"GET",t,""),this},this.getDecks=function(t){var n;return n=new e(function(e,n){var i;try{return Traitify.get("/decks",function(n){return t&&t(n),e?e(n):void 0})}catch(a){if(i=a,n)return n(i)}})},this.getSlides=function(t,n){var i;return i=new e(function(e,i){var a;try{return Traitify.get("/assessments/"+t+"/slides",function(t){return n&&n(t),e?e(t):void 0})}catch(s){if(a=s,i)return i(a)}})},this.addSlide=function(t,n,i,a,s){var r;return r=new e(function(e,r){var d;try{return Traitify.put("/assessments/"+t+"/slides/"+n,JSON.stringify({response:i,time_taken:a}),function(t){return s&&s(t),e?e(t):void 0})}catch(l){if(d=l,r)return r(d)}})},this.addSlides=function(t,n,i){var a;return a=new e(function(e,a){var s;try{return Traitify.put("/assessments/"+t+"/slides",JSON.stringify(n),function(t){return i&&i(t),e?e(t):void 0})}catch(r){if(s=r,a)return a(s)}})},this.getPersonalityTypes=function(t,n,i){var a;return a=new e(function(e,a){var s,r,d,l,o,c;try{for(null==n&&(n=Object()),d=Array(),c=Object.keys(n),l=0,o=c.length;o>l;l++)r=c[l],d.push(""+r+"="+n[r]);return Traitify.get("/assessments/"+t+"/personality_types?"+d.join("&"),function(t){return i&&i(t),e?e(t):void 0})}catch(u){if(s=u,a)return a(s)}})},this.getPersonalityTraits=function(t,n,i){var a;return a=new e(function(e,n){var a;try{return Traitify.get("/assessments/"+t+"/personality_traits",function(t){return i&&i(t),e?e(t):void 0})}catch(s){if(a=s,n)return n(a)}})},this.getPersonalityTypesTraits=function(t,n,i){var a;return a=new e(function(e,a){var s;try{return Traitify.get("/assessments/"+t+"/personality_types/"+n+"/personality_traits",function(t){return i&&i(t),e?e(t):void 0})}catch(r){if(s=r,a)return a(s)}})},this.ui=Object(),this},Traitify.ui.load=function(e,t,n){var i,a;return i=Object(),null==n&&(n=Object()),i.slideDeck=Traitify.ui.slideDeck(Bldr(t),n),i.slideDeck.data.assessmentId=e,Traitify.ui.results&&(i.results=Traitify.ui.results(Bldr(t),n.results)),a=n.personalityTypes?n.personalityTypes.target:Object(),Traitify.ui.resultsPersonalityTypes&&(i.resultsPersonalityTypes=Traitify.ui.resultsPersonalityTypes(Bldr(a),n.personalityTypes)),null==n.personalityTypes&&(n.personalityTypes=Object()),i.slideDeck.nodes.main.innerHTML=Traitify.ui.styles,null==n&&(n=Object()),null==n.results&&(n.results=Object()),null==n.slideDeck&&(n.slideDeck=Object()),null==n.personalityTypes&&(n.personalityTypes=Object()),n.results.logging&&i.results.states.logging(!0),n.slideDeck.logging&&i.slideDeck.states.logging(!0),Traitify.getSlides(e).then(function(t){var a;return a=Object(),a.notCompleted=t.filter(function(e){return!e.completed_at}),0!==a.notCompleted.length?(i.slideDeck.data.assessmentId=e,i.slideDeck.data.slides=Object(),i.slideDeck.data.slides.notCompleted=a.notCompleted,i.slideDeck.data.slides.completed=t.filter(function(e){return e.completed_at}),i.slideDeck.initialize()):Traitify.getPersonalityTypes(e,n.results.params||{image_pack:"linear"}).then(function(e){return i.slideDeck.callbacks.trigger("Finished"),i.results&&(i.results.data=e,i.results.initialize()),i.resultsPersonalityTypes?(i.resultsPersonalityTypes.data=e,i.resultsPersonalityTypes.initialize()):void 0})}),i},Traitify.ui.loadSlideDeck=function(e,t,n){var i,a;return i=Bldr(t),null==n&&(n=Object()),Traitify.ui.slideDeck?(a=Traitify.ui.results(Bldr(t),n),Traitify.getSlides(e,function(e){return a.data=e,a.initialize()})):console.log("BAD BUNDLE, RESULTS AREN'T AVAILABLE")},Traitify.ui.loadResults=function(e,t,n){var i;return null==n&&(n=Object()),Traitify.ui.results?(i=Traitify.ui.results(Bldr(t),n),i.nodes.main.innerHTML=Traitify.ui.styles,Traitify.getPersonalityTypes(e,n.params||{image_pack:"linear"}).then(function(e){return i.data=e,i.initialize()})):console.log("BAD BUNDLE, RESULTS AREN'T AVAILABLE")};var Bldr;Bldr=function(e,t){var n,i;return n=Object(),n.nodes=Object(),n.nodes.add=function(e,t){return n.nodes[e]=t},n.nodes.addDiv=function(e,t,i){return n.nodes.addTag("div",e,t,i)},n.nodes.addImg=function(e,t){return n.nodes.addTag("img",e,t)},n.nodes.addTag=function(e,t,i,a){return null==i&&(i=Object()),i["class"]||(i["class"]=n.helpers.toDash(t)),n.nodes[t]=n.partials[e](i),a&&(n.nodes[t].innerHTML=a),n.nodes[t]},n.states=Object(),n.data=Object(),n.states.values=Object(),n.states.add=function(e,t){return n.states.values[e]=null!=t?t:!1,n.states[e]=function(t){return null!=t?n.states.values[e]=t:n.states.values[e]}},n.states.add("logging"),"undefined"==typeof t&&(t=Object()),navigator.userAgent.match(/iPad/i)&&(n.device="ipad"),navigator.userAgent.match(/iPhone/i)&&(n.device="iphone"),navigator.userAgent.match(/Android/i)&&(n.device="android"),navigator.userAgent.match(/BlackBerry/i)&&(n.device="blackberry"),navigator.userAgent.match(/webOS/i)&&(n.device="webos"),"string"!=typeof e?(n.nodes.main=document.createElement("div"),document.getElementsByTagName("body")[0].appendChild(n.nodes.main)):-1!==e.indexOf("#")?(e=e.replace("#",""),n.nodes.main=document.getElementById(e)):(e=e.replace(".",""),i=document.getElementsByClassName(e),n.nodes.main=i?i[0]:null),n.data.selector=e,n.nodes.main?(n.data=Object(),n.partials=Object(),n.partials.make=function(e,t){var n,i;i=document.createElement(e);for(n in t)i.setAttribute(n,t[n]);return i},n.partials.div=function(e){return this.make("div",e)},n.partials.img=function(e){return this.make("img",e)},n.partials.i=function(e){return this.make("i",e)},n.partials.add=function(e,t){return n.partials[e]=t},n.partials.render=function(e,t){return n.partials[e](t)},n.callbacks=Object(),n.callbacks.triggered=Object(),n.callbacks.trigger=function(e){return n.callbacks[e]?n.callbacks[e](n):n.callbacks.triggered[e]=!0},n.callbacks.add=function(e){return n["on"+e]=function(t){return n.callbacks.triggered[e]?t():n.callbacks[e]=t}},n.render=function(e){return n.nodes.main.appendChild(e)},n.helpers=Object(),n.helpers.toDash=function(e){return e?e.replace(/([A-Z])/g,function(e){return"-"+e.toLowerCase()}):void 0},n.events=Object(),n.events.stack=Array(),n.events.add=function(e){return n.events.stack.push(e)},n.initializationEvents=Array(),n.initialization=Object(),n.initialization.events=Object(),n.initialization.events.stack=Array(),n.initialization.events.add=function(e,t){return t?n.initialization.events.stack.push({description:e,callback:t}):void 0},n.initialize=function(){var e,t,i,a,s,r,d,l,o;for(i=n.initialization.events.stack,a=0,r=i.length;r>a;a++)if(t=i[a],n.states.logging()){n.log(t.description);try{t.callback()}catch(c){e=c,n.log(e.message)}}else t.callback();for(l=n.events.stack,o=[],s=0,d=l.length;d>s;s++)t=l[s],o.push(t());return o},n):(console.log("YOU MUST HAVE A TAG WITH A SELECTOR FOR THIS TO WORK"),!1)},Traitify.ui.slideDeck=function(e,t){var n;return e.data.slideResponses=Object(),e.states.add("animating"),e.states.add("finished"),e.states.add("initialized"),e.callbacks.add("Initialize"),e.callbacks.add("Finished"),e.callbacks.add("AddSlide"),e.callbacks.add("Me"),e.callbacks.add("NotMe"),e.callbacks.add("AdvanceSlide"),e.callbacks.add("finished"),e.data.slidesLeft=function(){return e.data.slides.all.length-e.data.currentSlide},e.data.slideValues=Array(),e.data.addSlide=function(n,i){return e.data.lastSlideTime=e.data.currentSlideTime,e.data.currentSlideTime=(new Date).getTime(),e.data.slideValues.push({id:n,response:i,time_taken:e.data.currentSlideTime-e.data.lastSlideTime}),e.data.sentSlides+=1,e.data.slideValues.length%10===0||e.data.sentSlides===e.data.slidesToPlayLength?Traitify.addSlides(e.data.assessmentId,e.data.slideValues,function(){return e.callbacks.addSlide&&e.callbacks.addSlide(e),e.data.sentSlides===e.data.slidesToPlayLength&&(e.nodes.main.innerHTML="",t.showResults!==!1&&(e.nodes.main.innerHTML=Traitify.ui.styles,Traitify.ui.loadResults(e.data.assessmentId,e.data.selector,t.results)),e.callbacks.finished)?e.callbacks.finished(e):void 0}):void 0},e.data.getProgressBarNumbers=function(t){var n,i,a,s;return a=e.data.totalSlideLength,n=e.data.slides.all.length,i=e.data.sentSlides,"initializing"!==t&&(i+=1),s=a-n+i,s/e.data.totalSlideLength*100},e.partials.slideDeckContainer=function(){var t,n,i;return n=this.div({"class":"tf-slide-deck-container"}),t=this.div({"class":"cover"}),t.innerHTML="Landscape mode is not currently supported",n.appendChild(t),i=e.data.getProgressBarNumbers("initializing"),n.appendChild(e.partials.progressBar(i)),n.appendChild(this.slides(e.data.slides.all)),n.appendChild(this.meNotMe()),n},e.partials.meNotMe=function(){var t;return t=this.div({"class":"me-not-me-container"}),e.nodes.me=this.div({"class":"me"}),e.nodes.notMe=this.div({"class":"not-me"}),e.nodes.notMe.innerHTML="Not Me",e.nodes.me.innerHTML="Me",t.appendChild(e.nodes.me),t.appendChild(e.nodes.notMe),e.nodes.meNotMeContainer=t,t},e.partials.slides=function(t){var n,i;return i=this.div({"class":"slides"}),n=e.partials.slide(t[0]),n.className+=" placeholder",i.appendChild(n),e.nodes.currentSlide=e.partials.slide(t[0]),e.nodes.currentSlide.className+=" active",i.appendChild(e.nodes.currentSlide),t[1]?(e.nodes.nextSlide=e.partials.slide(t[1]),i.appendChild(e.nodes.nextSlide)):e.nodes.nextSlide=!1,e.nodes.slides=i,i},e.partials.slide=function(t){var n,i,a;return n=this.div({"class":"slide"}),i=this.div({"class":"caption"}),i.innerHTML=t.caption,e.device?(a=this.div({style:"background-image:url('"+t.image_desktop_retina+"'); background-position:"+t.focus_x+"% "+t.focus_y+"%;'","class":"image"}),a.appendChild(i)):(a=this.img({src:t.image_desktop_retina}),n.appendChild(i)),n.appendChild(a),n},e.partials.progressBar=function(t){var n,i;return n=this.div({"class":"progress-bar"}),i=this.div({"class":"progress-bar-inner"}),i.style.width=t+"%",n.appendChild(i),e.nodes.progressBar=n,e.nodes.progressBarInner=i,n},e.partials.loadingAnimation=function(){var e,t,n,i;return t=this.div({"class":"loading"}),e=this.i(Object()),i=this.i(Object()),n=this.div({"class":"symbol"}),n.appendChild(e),n.appendChild(i),t.appendChild(n),t},n=Object(),e.helpers.touch=function(e,t){return e.addEventListener("touchstart",function(e){var t;return t=e.changedTouches[0],n.startx=parseInt(t.clientX),n.starty=parseInt(t.clientY)}),e.addEventListener("touchend",function(e){var i,a,s;return s=e.changedTouches[0],i=Math.abs(n.startx-parseInt(s.clientX)),a=Math.abs(n.starty-parseInt(s.clientY)),2>i&&2>i?t():void 0})},e.helpers.onload=function(e){return window.addEventListener?window.addEventListener("load",e):window.attachEvent?window.attachEvent("onload",e):void 0},e.events.me=function(){var t;return!e.states.animating()&&1!==!e.data.slidesLeft()&&(e.data.slides.all[e.data.currentSlide]||e.events.loadingAnimation(),e.states.animating(!0),e.events.advanceSlide(),t=e.data.slides.all[e.data.currentSlide-1],e.data.addSlide(t.id,!0),e.data.currentSlide+=1,e.callbacks.me)?e.callbacks.me(e):void 0},e.events.notMe=function(){var t;return!e.states.animating()&&e.nodes.nextSlide&&(e.data.slides.all[e.data.currentSlide]||e.events.loadingAnimation(),e.states.animating(!0),e.events.advanceSlide(),t=e.data.slides.all[e.data.currentSlide-1],e.data.addSlide(t.id,!1),e.data.currentSlide+=1,e.callbacks.notMe)?e.callbacks.notMe(e):void 0},e.events.advanceSlide=function(){var t;return e.prefetchSlides(),e.nodes.progressBarInner.style.width=e.data.getProgressBarNumbers()+"%",e.nodes.playedSlide&&e.nodes.slides.removeChild(e.nodes.playedSlide),e.nodes.playedSlide=e.nodes.currentSlide,e.nodes.currentSlide=e.nodes.nextSlide,e.nodes.currentSlide.addEventListener("webkitTransitionEnd",function(){return e.events.advancedSlide&&e.events.advancedSlide(),e.states.animating(!1)},!1),e.nodes.currentSlide.addEventListener("transitionend",function(){return e.events.advancedSlide&&e.events.advancedSlide(),e.states.animating(!1)},!1),e.nodes.currentSlide.addEventListener("oTransitionEnd",function(){return e.events.advancedSlide&&e.events.advancedSlide(),e.states.animating(!1)},!1),e.nodes.currentSlide.addEventListener("otransitionend",function(){return e.events.advancedSlide&&e.events.advancedSlide(),e.states.animating(!1)},!1),e.nodes.playedSlide.className+=" played",e.nodes.currentSlide.className+=" active",t=e.data.slides.all[e.data.currentSlide+1],t&&(e.nodes.nextSlide=e.partials.slide(t),e.nodes.slides.appendChild(e.nodes.nextSlide)),e.callbacks.advanceSlide?e.callbacks.advanceSlide(e):void 0},e.events.loadingAnimation=function(){return e.nodes.meNotMeContainer.className+=" hide",e.nodes.slides.removeChild(e.nodes.currentSlide),e.nodes.slides.insertBefore(e.partials.loadingAnimation(),e.nodes.slides.firstChild)},e.imageCache=Object(),e.prefetchSlides=function(){var t,n,i,a,s,r,d;for(i=e.data.currentSlide-1,t=e.data.currentSlide+9,r=e.data.slides.all.slice(i,t),d=[],a=0,s=r.length;s>a;a++)n=r[a],e.imageCache[n.image_desktop_retina]?d.push(void 0):(e.imageCache[n.image_desktop_retina]=new Image,d.push(e.imageCache[n.image_desktop_retina].src=n.image_desktop_retina));return d},e.events.setContainerSize=function(){var t;return t=e.nodes.main.scrollWidth,e.nodes.container.className=e.nodes.container.className.replace(" medium",""),e.nodes.container.className=e.nodes.container.className.replace(" large",""),e.nodes.container.className=e.nodes.container.className.replace(" small",""),480>t?e.nodes.container.className+=" small":768>t?e.nodes.container.className+=" medium":void 0},e.events.onRotate=function(e){var t,n;return n="onorientationchange"in window,t=n?"orientationchange":"resize",window.addEventListener(t,function(t){return e(t)},!1)},e.initialization.events.add("Setup Data",function(){return e.data.currentSlide=1,e.data.slides.all=e.data.slides.notCompleted.concat(e.data.slides.completed),e.data.sentSlides=0,e.data.totalSlideLength=e.data.totalSlideLength,e.data.slidesToPlayLength=e.data.slides.all.length}),e.initialization.events.add("Handle device type",function(){return e.nodes.container=e.partials.slideDeckContainer(),e.device&&(e.nodes.container.className+=" "+e.device,e.nodes.container.className+=" mobile phone",t&&t.nonTouch&&(e.nodes.container.className+=" non-touch")),t&&t.size&&(e.nodes.container.className+=" "+t.size),e.nodes.main.appendChild(e.nodes.container)}),e.initialization.events.add("Actions",function(){return"iphone"===e.device||"ipad"===e.device?(e.helpers.touch(e.nodes.notMe,function(){return e.events.notMe()}),e.helpers.touch(e.nodes.me,function(){return e.events.me()})):(e.nodes.notMe.onclick=function(){return e.events.notMe()},e.nodes.me.onclick=function(){return e.events.me()})}),e.initialization.events.add("Prefetch Slides",function(){return e.prefetchSlides()}),e.initialization.events.add("Setup Screen",function(){var t;return e.events.setContainerSize(),window.onresize=function(){return e.device?void 0:e.events.setContainerSize()},e.device&&e.device?(t=function(){var t;return(t=function(){return e.nodes.main.style.height=window.innerHeight+"px"})()},e.events.onRotate(function(){return windowOrienter()}),e.helpers.onload(function(){return t()}),t()):void 0}),e.initialization.events.add("initializated",function(){return e.states.initialized(!0),e.data.currentSlideTime=(new Date).getTime()}),e},Traitify.ui.results=function(e){return e.states.add("initialized"),e.callbacks.add("Initialize"),e.initialization.events.add("Setup Data",function(){return e.nodes.main.appendChild(e.partials.render("Results"))}),e.partials.add("Results",function(){var t;return t=e.nodes.addDiv("tf-results",Object()),t.appendChild(this.render("Personality Blend")),e.callbacks.trigger("Initialize"),t}),e.partials.add("Personality Blend",function(){var t,n;return n=e.data.personality_blend,t=e.nodes.addDiv("personalityBlend",Object()),t.appendChild(this.render("Personality Blend Badges")),t.appendChild(e.nodes.addDiv("name",Object(),n.name)),t.appendChild(e.nodes.addDiv("blendDescription",Object(),n.description)),t}),e.partials.add("Personality Blend Badges",function(){var t,n,i,a;return i=e.data.personality_blend,n=e.nodes.addDiv("leftBadge"),n.style.backgroundImage="url("+i.personality_type_1.badge.image_medium+")",n.style.borderColor="#"+i.personality_type_1.badge.color_1,a=e.nodes.addDiv("rightBadge"),a.style.backgroundImage="url("+i.personality_type_2.badge.image_medium+")",a.style.borderColor="#"+i.personality_type_2.badge.color_1,t=e.nodes.addDiv("badgesContainer",Object()),t.appendChild(n),t.appendChild(a),t}),e},Traitify.ui.resultsPersonalityTypes=function(e){return e.states.add("initialized"),e.callbacks.add("Initialize"),e.initialization.events.add("Setup Data",function(){var t;return t=e.partials.render("Personality Types Container"),e.nodes.main.appendChild(t)}),e.partials.add("Personality Types Container",function(){var t,n,i,a;return a=e.nodes.addDiv("tfPersonalityTypes",Object()),i=e.nodes.addDiv("personalityTypesContainer",Object()),n=this.render("Personality Types"),t=e.nodes.addDiv("description"),t.innerHTML=e.data.personality_types[0].personality_type.description,e.callbacks.trigger("Initialize"),i.appendChild(n),a.appendChild(i),a.appendChild(t),a}),e.partials.add("Personality Types",function(){var t,n,i,a,s,r,d,l,o,c;d=e.nodes.addDiv("personalityTypes",Object()),o=Array(),n=e.nodes.addDiv("icon"),t=e.nodes.addDiv("arrow"),t.appendChild(n),d.appendChild(t);for(a in e.data.personality_types)l=e.data.personality_types[a],r=e.nodes.addDiv("personalityType",{"data-index":a}),s=e.nodes.addDiv("name",Object(),l.personality_type.name),s.style.color=l.personality_type.badge.color_1,r.appendChild(s),i=e.nodes.addImg("badge",{src:l.personality_type.badge.image_medium}),r.appendChild(i),c=e.nodes.addDiv("score",Object(),""+Math.round(l.score)+" / 100"),r.appendChild(c),d.appendChild(r);return d}),e.events.add(function(){var t,n,i,a,s;for(n=document.querySelectorAll(".tf-personality-types .personality-type"),s=[],i=0,a=n.length;a>i;i++)t=n[i],s.push(t.onclick=function(){var t,n,i,a;return n=document.querySelector(".tf-personality-types .description"),a=this.getAttribute("data-index"),t=document.querySelector(".tf-personality-types .arrow"),t.style.left=130*a+"px",i=e.data.personality_types[a].personality_type.description,n.innerHTML=i});return s}),e};Traitify.ui.styles = '<style>@font-face{font-family:proxima_nova_light;font-style:normal;font-weight:100;src:local("proxima_nova_light"),local("proxima_nova_light"),url(https://s3.amazonaws.com/traitify-cdn/assets/fonts/proxima_nova_light.woff) format("woff")}.tf-slide-deck-container{margin:0 auto;max-width:1200px;font-family:proxima_nova_light,"Helvetica Neue",Helvetica,Arial,sans-serif;overflow:hidden;color:#fff;width:100%;position:relative;font-size:22px;-webkit-font-smoothing:antialised;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-box-sizing:initial;-moz-box-sizing:initial;box-sizing:initial}.tf-slide-deck-container .cover{display:none;background-color:#aaa}.tf-slide-deck-container .slides{position:relative}.tf-slide-deck-container .slide .image{height:400px;background-size:cover}.tf-slide-deck-container .slides .loading{color:#000;text-align:center;position:absolute;width:100%;top:40%}.tf-slide-deck-container .slides .loading .left-dot,.tf-slide-deck-container .slides .loading .right-dot{background-color:#000;width:20px;height:20px}.tf-slide-deck-container .slides .slide{padding:0;margin:0;box-sizing:initial;-webkit-transition:left .3s linear;-moz-transition:left .3s linear;-o-transition:left .3s linear;transition:left .3s linear;position:absolute;left:100%;top:0;width:100%}.tf-slide-deck-container .slides .slide.active{left:0}.tf-slide-deck-container .slides .slide.played{left:-100%}.tf-slide-deck-container .slides .slide img{width:100%}.tf-slide-deck-container .slides .slide.placeholder{position:relative}.tf-slide-deck-container .me-not-me-container.hide{margin-left:100%;opacity:0;visibility:hidden}.tf-slide-deck-container .me-not-me-container{position:absolute;z-index:1;width:100%;bottom:0;font-size:16px}.tf-slide-deck-container .me,.tf-slide-deck-container .not-me{text-align:center;padding:1% 0;cursor:pointer;margin-bottom:18px}.tf-slide-deck-container .me{background-color:#058fc4;position:relative;width:20%;margin-left:30%;display:inline-block;border-radius:25px 0 0 25px}.tf-slide-deck-container .not-me{position:relative;width:20%;margin-right:30%;display:inline-block;background-color:#cb4e4e;border-radius:0 25px 25px 0}.tf-slide-deck-container .me-not-me-container .not-me:active{background-color:#b44646}.tf-slide-deck-container .me-not-me-container .me:active{background-color:#007a9c}.tf-slide-deck-container .caption{background-color:rgba(0,0,0,.5);padding:15px 0 10px;text-align:center;font-size:28px;position:absolute;width:100%}.tf-slide-deck-container .progress-bar{height:10px;display:block;background-color:rgba(255,255,255,.5);position:absolute;z-index:1;width:100%;-webkit-box-shadow:none;box-shadow:none;-webkit-transition:none;transition:none}.tf-slide-deck-container .progress-bar .progress-bar-inner{width:0;height:10px;background-color:#fff;position:absolute;-webkit-animation-delay:2s;animation-delay:2s;-webkit-transition:width .3s linear;-moz-transition:width .3s linear;-o-transition:width .3s linear;transition:width .3s linear;border-radius:0 5px 5px 0}@media only screen and (min-width:760px){.tf-slide-deck-container .slide .image{height:570px}.tf-slide-deck-container .me-not-me-container{font-size:24px}.tf-slide-deck-container .slide .caption{font-size:32px}}@media only screen and (max-width:760px){.tf-slide-deck-container .me-not-me-container{padding:10px 0;font-size:20px;margin:0 auto}.tf-slide-deck-container .me-not-me-container .me{margin-left:30%}.tf-slide-deck-container .me-not-me-container .not-me{margin-right:30%}}.loading .symbol{width:30px;height:30px;margin:0 auto}.loading .symbol i{margin-left:-15px;width:30px;height:30px;display:inline-block;background:#cb4e4e;border-radius:50%;position:absolute}.loading .symbol i:nth-child(1){-webkit-transform:translate(-50px,0);-webkit-animation:loading-ani1 1s linear infinite}.loading .symbol i:nth-child(2){background:#058fc4;-webkit-transform:translate(50px,0);-webkit-animation:loading-ani2 1s linear infinite}@-webkit-keyframes loading-ani1{25%{z-index:2}50%{-webkit-transform:translate(50px,0) scale(1)}75%{-webkit-transform:translate(0,0) scale(0.75)}100%{-webkit-transform:translate(-50px,0) scale(1)}}@-webkit-keyframes loading-ani2{25%{-webkit-transform:translate(0,0) scale(0.75)}50%{-webkit-transform:translate(-50px,0) scale(1)}75%{z-index:2}100%{-webkit-transform:translate(50px,0) scale(1)}}.small.tf-slide-deck-container .me-not-me-container{font-size:13px}.small.tf-slide-deck-container .slide .caption{font-size:18px}.medium.tf-slide-deck-container .slide .caption{font-size:24px}.medium.tf-slide-deck-container .me-not-me-container{font-size:15px}.phone.tf-slide-deck-container .slide,.phone.tf-slide-deck-container .slide .image{height:100%}.phone.tf-slide-deck-container .progress-bar{background-color:rgba(255,255,255,.5);position:absolute;z-index:2;border:0;height:10px}.phone.tf-slide-deck-container .progress-bar-inner{border-radius:0 5px 5px 0;height:10px}.phone.tf-slide-deck-container .slide.placeholder .caption{z-index:-1}.phone:not(.non-touch).tf-slide-deck-container .caption{font-size:20px;background-color:transparent;position:relative;width:100%;padding-top:20px}.phone.tf-slide-deck-container .slide{padding:0;margin:0;-webkit-transition:width .4s linear;-moz-transition:width .4s linear;-o-transition:width .4s linear;transition:width .4s linear;position:absolute;right:0;top:0;width:0;left:auto}.phone.tf-slide-deck-container .slides .slide.played{right:auto;width:0;left:auto}.phone.tf-slide-deck-container .slides .slide.active{right:0;width:100%;left:auto}.phone.tf-slide-deck-container .slides .slide.active .caption{z-index:2}.phone.tf-slide-deck-container .slides .slide.played .caption{z-index:auto}.phone.tf-slide-deck-container,.phone.tf-slide-deck-container .slide .image,.phone.tf-slide-deck-container .slides{height:100%}.phone:not(.non-touch).tf-slide-deck-container .me-not-me-container{position:absolute;height:100%;top:0;width:100%;overflow:hidden;font-size:40px}.phone:not(.non-touch).tf-slide-deck-container .me-not-me-container .me,.phone:not(.non-touch).tf-slide-deck-container .me-not-me-container .not-me{height:100%;line-height:100%;position:relative}.phone:not(.non-touch).tf-slide-deck-container .me-not-me-container .not-me{background-color:rgba(203,78,78,.35);border-radius:0;width:50%;margin:0}.phone:not(.non-touch).tf-slide-deck-container .me-not-me-container .me{background-color:rgba(5,143,196,.35);border-radius:0;width:50%;margin:0}@media screen and (device-width:320px) and (orientation:landscape){.phone.tf-slide-deck-container .caption{font-size:16px}.phone:not(.non-touch).tf-slide-deck-container .me-not-me-container .me,.phone:not(.non-touch).tf-slide-deck-container .me-not-me-container .not-me{height:160px;line-height:160px}.phone:not(.non-touch).tf-slide-deck-container .progress-bar{background-color:rgba(255,255,255,.5);position:absolute;z-index:2;border:0;height:8px}.phone.tf-slide-deck-container .progress-bar-inner{border-radius:0 4px 4px 0;height:8px}.phone:not(.non-touch).tf-slide-deck-container .me-not-me-container{font-size:40px}.phone.tf-slide-deck-container .cover{width:100%;height:100%;position:absolute;z-index:10}}.non-touch.phone.tf-slide-deck-container .caption{margin-top:10px;padding:10px 0}.non-touch.phone.tf-slide-deck-container .me-not-me-container{border-radius:40px;overflow:hidden;height:50px;padding:0;bottom:10px;top:auto;width:100%;margin-left:0;margin-right:0}.non-touch.phone.tf-slide-deck-container .me-not-me-container .me,.non-touch.phone.tf-slide-deck-container .me-not-me-container .not-me{width:40%;font-size:20px;height:45px;line-height:45px;padding:0}.non-touch.phone.tf-slide-deck-container .me-not-me-container .not-me{background-color:#cb4e4e;margin-right:10%}.non-touch.phone.tf-slide-deck-container .me-not-me-container .me{background-color:#058fc4;margin-left:10%}.non-touch.phone.tf-slide-deck-container .me-not-me-container .not-me:active{background-color:#b44646}.non-touch.phone.tf-slide-deck-container .me-not-me-container .me:active{background-color:#007a9c}@media screen and (orientation:landscape){.non-touch.phone.tf-slide-deck-container .me-not-me-container{height:30px}.non-touch.phone.tf-slide-deck-container .me-not-me-container .me,.non-touch.phone.tf-slide-deck-container .me-not-me-container .not-me{font-size:12px;height:25px;line-height:25px}.non-touch.phone.tf-slide-deck-container .progress-bar,.non-touch.phone.tf-slide-deck-container .progress-bar .progress-bar-inner{height:5px}.non-touch.phone.tf-slide-deck-container .slide .caption{font-size:12px;padding:3px;margin-top:5px}}.ipad.non-touch.phone.tf-slide-deck-container .progress-bar{height:15px}.ipad.non-touch.phone.tf-slide-deck-container .progress-bar .progress-bar-inner{height:15px;border-radius:0 8px 8px 0}.ipad.non-touch.phone.tf-slide-deck-container .slide .caption{margin-top:15px;font-size:25px}.ipad.non-touch.phone.tf-slide-deck-container .me-not-me-container{height:auto}.ipad.non-touch.phone.tf-slide-deck-container .me-not-me-container .me{width:34%;margin-left:16%;font-size:30px;padding:8px 0;border-radius:30px 0 0 30px;height:auto}.ipad.non-touch.phone.tf-slide-deck-container .me-not-me-container .not-me{width:34%;margin-right:16%;font-size:30px;padding:8px 0;border-radius:0 30px 30px 0;height:auto}@media screen and (orientation:landscape){.ipad.non-touch.phone.tf-slide-deck-container .progress-bar{height:10px}.ipad.non-touch.phone.tf-slide-deck-container .slide .caption{margin-top:10px}.ipad.non-touch.phone.tf-slide-deck-container .progress-bar .progress-bar-inner{height:10px}.ipad.non-touch.phone.tf-slide-deck-container .me-not-me-container{height:auto}.ipad.non-touch.phone.tf-slide-deck-container .me-not-me-container .not-me{padding:7px 0;height:auto;bottom:0;top:auto;font-size:15px;width:30%;margin-right:20%}.ipad.non-touch.phone.tf-slide-deck-container .me-not-me-container .me{padding:7px 0;height:auto;bottom:0;top:0;width:30%;font-size:15px;margin-left:20%}}@media screen and (orientation:landscape){.non-touch.phone.android.tf-slide-deck-container .me-not-me-container{height:auto}.non-touch.phone.android.tf-slide-deck-container .caption{font-size:20px;padding:5px 0}.non-touch.phone.android.tf-slide-deck-container .me-not-me-container .me,.non-touch.phone.android.tf-slide-deck-container .me-not-me-container .not-me{font-size:18px;padding:5px 0}.non-touch.phone.android.tf-slide-deck-container .me-not-me-container .me{width:30%;margin-left:20%;height:auto}.non-touch.phone.android.tf-slide-deck-container .me-not-me-container .not-me{width:30%;margin-right:20%;height:auto}}.tf-results{font-family:proxima_nova_light;padding:24px}.tf-results .personality-blend{text-align:center}.tf-results .personality-blend .badges-container{width:400px;margin:0 auto}.tf-results .personality-blend .badges-container .left-badge{width:160px;height:160px;z-index:1;position:relative;background-size:100px 100px;border-radius:50%;border:4px solid;background-repeat:no-repeat;background-position:center;display:inline-block;background-color:rgba(255,255,255,.5)}.tf-results .personality-blend .badges-container .right-badge{width:160px;height:160px;position:relative;background-size:100px 100px;border-radius:50%;border:4px solid;background-repeat:no-repeat;background-position:center;margin-left:-30px;display:inline-block}.tf-results .personality-blend .name{font-size:24px;margin:12px 0}.tf-results .personality-blend .blend-description{width:400px;margin:0 auto;position:relative;text-align:left}.tf-personality-types{font-family:proxima_nova_light}.tf-personality-types .description{width:860px;margin:6px auto 0;padding:24px;text-align:justify}.tf-personality-types .personality-types-container{background-color:#022946;width:100%}.tf-personality-types .personality-types-container .personality-types{position:relative}.tf-personality-types .personality-types-container .personality-types .arrow{text-align:center;width:130px;bottom:-20px;position:absolute;left:0;-webkit-transition:left .2s linear;-moz-transition:left .2s linear;-o-transition:left .2s linear;transition:left .2s linear}.tf-personality-types .personality-types-container .personality-types .arrow .icon{width:0;height:0;border-left:20px solid transparent;border-right:20px solid transparent;border-top:20px solid #022946;margin:0 auto}.tf-personality-types .personality-types-container .personality-types{max-width:910px;margin:0 auto}.tf-personality-types .personality-types-container .personality-types .personality-type{display:inline-block;width:130px;text-align:center;padding:20px 0;cursor:pointer}.tf-personality-types .personality-types-container .personality-types .personality-type .badge{width:60px;margin:18px auto}.tf-personality-types .personality-types-container .personality-types .personality-type .name{text-align:center;margin:0 auto}.tf-personality-types .personality-types-container .personality-types .personality-type .score{color:#fff}</style>';