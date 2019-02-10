function isChrome() {
  var isChromium = window.chrome,
    winNav = window.navigator,
    vendorName = winNav.vendor,
    isOpera = winNav.userAgent.indexOf("OPR") > -1,
    isIEedge = winNav.userAgent.indexOf("Edge") > -1,
    isIOSChrome = winNav.userAgent.match("CriOS");

  if(isIOSChrome){
    return true;
  } else if(isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
    return true;
  } else {
    return false;
  }
}

function gotoListeningState() {
  const micListening = document.querySelector(".mic .listening");
  const micReady = document.querySelector(".mic .ready");

  micListening.style.display = "block";
  micReady.style.display = "none";
}

function gotoReadyState() {
  const micListening = document.querySelector(".mic .listening");
  const micReady = document.querySelector(".mic .ready");

  micListening.style.display = "none";
  micReady.style.display = "block";
}

function addBotItem(text) {
	
	if(text.includes("false")){
		//alert('2');	
		} else {
		const appContent = document.querySelector(".app-content");
		  appContent.innerHTML += '<div class="item-container item-container-bot"><div class="item"><p>' + text + '</p></div></div>';
		  appContent.scrollTop = appContent.scrollHeight; // scroll to bottom
		}
	}
  

function addUserItem(text) {
	//alert('addUserItem'+text);
	if(text.includes("true") || text.includes("false") || text.includes("not found")){
	//alert('2');	
	} else if(text.includes("dispute"))
		{
		text="dispute";
		const appContent = document.querySelector(".app-content");
		  appContent.innerHTML += '<div class="item-container item-container-user"><div class="item"><p>' + text + '</p></div></div>';
		  appContent.scrollTop = appContent.scrollHeight;
		}else if(text.includes("yes"))
		{
			text="yes";
			const appContent = document.querySelector(".app-content");
			  appContent.innerHTML += '<div class="item-container item-container-user"><div class="item"><p>' + text + '</p></div></div>';
			  appContent.scrollTop = appContent.scrollHeight;
			}
	else
	{
	//alert('2'+text);
	  const appContent = document.querySelector(".app-content");
	  appContent.innerHTML += '<div class="item-container item-container-user"><div class="item"><p>' + text + '</p></div></div>';
	  appContent.scrollTop = appContent.scrollHeight; // scroll to bottom
	}
}

function displayCurrentTime() {
  const timeContent = document.querySelector(".time-indicator-content");
  const d = new Date();
  const s = d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  timeContent.innerHTML = s;
}

function addError(text) {
  addBotItem(text);
  const footer = document.querySelector(".app-footer");
  footer.style.display = "none";
}

function callREST(city,claimAmount,claimType,serviceType)
{
	var res=null;
	//alert('providerName::'+providerName+'claimAmount::'+claimAmount+'providerType::'+providerType);
    var ItemJSON;
   // alert(claimType+serviceType+claimAmount+city);
  //  ItemJSON = {"providerName": +"Amjad","claimAmount": 2000,"providerType": "IN_NETWORK" };
    var amount=400;
    if(claimAmount!=null && claimAmount.includes("$"))
    	{
    	amount=claimAmount.substring(1);
    	}
    //alert('amount1::'+amount);
    if(claimAmount.includes(","))
    	{
    	amount=amount.replace(",","");
    	}
    	
   //alert('amount final'+amount)
   /* var provType= "IN_NETWORK";
    if(providerType == "out network" || providerType =="out Network" || providerType =="Out Network")
    	{
    	//alert('providerType'+providerType);
    	provType="OUT_NETWORK"
    	}*/
    //ItemJSON = {"providerName": providerName,"claimAmount": claimAmount,"providerType": "IN_NETWORK" };
    
    ItemJSON = '{"city":"'+city+'","claimAmount":'+amount+',"claimType":"'+ claimType+'","serviceType":"'+serviceType+'" }';
    
//alert(ItemJSON);
    URL = "http://localhost:8082/claims";  //Your URL

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = callbackFunction(xmlhttp);
    xmlhttp.open("POST", URL, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    //xmlhttp.setRequestHeader('Authorization', 'Basic ' + window.btoa('apiusername:apiuserpassword')); //in prod, you should encrypt user name and password and provide encrypted keys here instead 
    xmlhttp.onreadystatechange = callbackFunction(xmlhttp);
    xmlhttp.send(ItemJSON);
    //alert(xmlhttp.responseText);
    var response=JSON.parse(xmlhttp.responseText);
    console.log(xmlhttp.response);
    //alert('provDetailsReq::'+response.provDetailsReq);
    var provDetailsReq = response.provDetailsReq;
    var deviation=response.deviation;
    console.log("provDetailsReq::"+provDetailsReq);
    //res=provDetailsReq+","+deviation;
   // alert('prvReq::'+response.provDetailsReq+"deviation::"+response.deviation);
    res=response.provDetailsReq+","+response.deviation;
    /*if(provDetailsReq==true)
    	{
    	res="true";
    	}*/
    return res;
    //document.getElementById("div").innerHTML = xmlhttp.statusText + ":" + xmlhttp.status + "<BR><textarea rows='100' cols='100'>" + xmlhttp.responseText + "</textarea>";
}

function getProviderDetails(provId)
{
	//alert('inside getProviderDetails::'+provId);
	 var provDetails=null;
	//alert('providerName::'+providerName+'claimAmount::'+claimAmount+'providerType::'+providerType);

    URL = "http://localhost:8082/provider/providerId/"+provId.toUpperCase();

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = callbackFunction(xmlhttp);
    xmlhttp.open("GET", URL, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    //xmlhttp.setRequestHeader('Authorization', 'Basic ' + window.btoa('apiusername:apiuserpassword')); //in prod, you should encrypt user name and password and provide encrypted keys here instead 
    xmlhttp.onreadystatechange = callbackFunction(xmlhttp);
    xmlhttp.send();
    
    if(xmlhttp.responseText!=null && xmlhttp.responseText.length>0)
	{
    var response=JSON.parse(xmlhttp.responseText);
    //alert(xmlhttp.responseText);
    console.log(xmlhttp.response);
    var provName=response.provName;
    //alert('provDetailsReq::'+provName);
   // alert('response'+response);
    if(provName!=null && provName!== undefined)
    	{
    	provDetails=response.provName+","+response.city+","+response.speciality+","+response.addressLine1+","+response.state+","+response.zip;
    	}
   
	}
   // alert('provDetails::'+provDetails)
   
    console.log("providerObject::"+provDetails);
   
    return provDetails;
    //document.getElementById("div").innerHTML = xmlhttp.statusText + ":" + xmlhttp.status + "<BR><textarea rows='100' cols='100'>" + xmlhttp.responseText + "</textarea>";
}


function getMemberDetails(memberId)
{
	 var memberDetails= null;
	//alert('inside getProviderDetails::'+provId);
/*	var res="false";
	//alert('providerName::'+providerName+'claimAmount::'+claimAmount+'providerType::'+providerType);
    var ItemJSON;
*/    
  //  ItemJSON = {"providerName": +"Amjad","claimAmount": 2000,"providerType": "IN_NETWORK" };
   
  //  ItemJSON = '{"providerName":"'+providerName+'","claimAmount":'+amount+',"providerType":"'+ provType+'" }';
    
//alert(ItemJSON);
  //  URL = "http://localhost:8082/claims";  //Your URL
    URL = "http://localhost:8082/member/memberId/"+memberId.toUpperCase();

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = callbackFunction(xmlhttp);
    xmlhttp.open("GET", URL, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    //xmlhttp.setRequestHeader('Authorization', 'Basic ' + window.btoa('apiusername:apiuserpassword')); //in prod, you should encrypt user name and password and provide encrypted keys here instead 
    xmlhttp.onreadystatechange = callbackFunction(xmlhttp);
    xmlhttp.send();
    
    if(xmlhttp.responseText!=null && xmlhttp.responseText.length>0)
    	{
    	 var response=JSON.parse(xmlhttp.responseText);
    	    //alert(xmlhttp.responseText);
    	    console.log(xmlhttp.response);
    	    
    	    var memberName=response.memberName;
    	    //alert('provDetailsReq::'+provName);
    	   // alert('response'+response);
    	    if(memberName!=null && memberName!== undefined)
    	    	{
    	    	 memberDetails=response.memberName+","+response.city+","+response.addressLine1+","+response.state+","+response.zip;
    	    	}
    	  
    	}
   
  
   // alert('provDetails::'+provDetails)
   
    console.log("providerObject::"+memberDetails);
   
    return memberDetails;
    //document.getElementById("div").innerHTML = xmlhttp.statusText + ":" + xmlhttp.status + "<BR><textarea rows='100' cols='100'>" + xmlhttp.responseText + "</textarea>";
}

function callbackFunction(xmlhttp) 
{
    //alert(xmlhttp.responseXML);
}



document.addEventListener("DOMContentLoaded", function(event) {

//Added claim object
	var claim = new Object();

  displayCurrentTime();

  // check for Chrome
  if (!isChrome()) {
    addError("This demo only works in Google Chrome.");
    return;
  }

  if (!('speechSynthesis' in window)) {
    addError("Your browser doesn’t support speech synthesis. This demo won’t work.");
    return;
  }

  if (!('webkitSpeechRecognition' in window)) {
    addError("Your browser cannot record voice. This demo won’t work.");
    return;
  }

  // Now we’ve established that the browser is Chrome with proper speech API-s.

  // api.ai client
  //https://bot.dialogflow.com/9901bf0b-ece5-450a-8050-5bdd467d32d8
  const apiClient = new ApiAi.ApiAiClient({accessToken: 'b259b98221674057926adda7f30a9cce'});

  // Initial feedback message.
  addBotItem("Welcome! I am Helfer the Voice Bot just say Hi to start conversation");
  
  //Initial Feeback voice
  var msg = new SpeechSynthesisUtterance("Hi! I’m voicebot. What is your name?");
  msg.addEventListener("end", function(ev) {
      window.clearTimeout(timer);
      startListening();
    });
    msg.addEventListener("error", function(ev) {
      window.clearTimeout(timer);
      startListening();
    });
 // window.speechSynthesis.speak(msg);

  var recognition = new webkitSpeechRecognition();
  var recognizedText = null;
  var providerName= null;
  var claimAmount=null;
  var providerType=null;
  var providerId= null;
  var city =null;
  var speciality=null;
  var claimType=null;
  var serviceType=null;
  var address_1=null;
  var state=null;
  var zip=null;
  var practiceAddress=null;
  var providerSearchRequired=null;
  var memberSearchRequired=null;
  var memberName=null;
  var memberCity=null
  var memberState=null;
  var memberAddress_1=null;
  var memberState=null;
  var claimValidation=null;
  var claimTypeValidation=null;
  var typeOfServiceValidation=null;
  var claimAmountValidation=null;
  var deviationValidation=null;
  var claimSubmissionValidation=null;
  var stopTransaction=null;
  
  recognition.continuous = false;
  recognition.onstart = function() {
    recognizedText = null;
  };
  recognition.onresult = function(ev) {
    recognizedText = ev["results"][0][0]["transcript"];
   // alert('line no 315::'+recognizedText);
    
    if(claimValidation=="YES" && recognizedText!=null && recognizedText.length>0)
    	{
    	//alert('insdie claim validation'+recognizedText);
    		if(recognizedText.includes("file a claim") || recognizedText.includes("process a claim") || recognizedText.includes("register a claim"))
    			{
    			claimValidation=null;
    			} else
    				{
    				//alert('insdie claim validation else condition::'+recognizedText);
    				 
    				recognizedText=recognizedText+" service not found ";
    				}
    	}
   /* if(recognizedText.includes("dr."))
	 {
	 providerName = recognizedText;
	 }*/
    if(claimAmountValidation=="YES")
    	{
    	//alert('insdie claimAmountValidation'+claimAmountValidation+"text::"+recognizedText);
    	if(recognizedText.includes("$"))
    	{
    		claimAmountValidation=null;
    	 claimAmount = recognizedText;
    	 
    	} else
    		{
    		recognizedText=recognizedText+" claimamount not found";
    		}
    	}

/*if(recognizedText.includes("in network") || recognizedText.includes("out network") || recognizedText.includes("out Network"))
	{
	 providerType = recognizedText;
	}*/

if(providerSearchRequired=="YES" && recognizedText!=null)
	{
	//alert('1');
if(recognizedText.includes("P1258") || recognizedText.includes("p1258") || recognizedText.includes("4589") || recognizedText.includes("p4589") || recognizedText.includes("7489") || recognizedText.includes("p7489"))
{
	//alert('2');
	if(recognizedText=="4589")
		{
		recognizedText="P"+recognizedText;
		}
	if(recognizedText=="7489")
	{
	recognizedText="P"+recognizedText;
	}
}
	providerId=recognizedText.toUpperCase();
	 console.log("providerId::"+providerId);
	//alert('providerId'+providerId);
var prov= getProviderDetails(recognizedText);
//alert("prov::"+prov);
if(prov!=null && prov !== undefined){
var provList=prov.split(",");
//alert('provList'+provList);
providerName=provList[0];
city=provList[1];
speciality= provList[2];
address_1=provList[3];
state=provList[4];
zip=provList[5];
// false prov Ajay and $3000 and 123 peachtree st Atlanta GA 30330 and Dr. Ajay
practiceAddress = address_1+" "+city+" "+state+" "+zip;
providerSearchRequired=null;
//alert('3');
// alert(providerName+'::city::'+city+'spc::'+speciality);
} else {
	//alert('4');
	recognizedText=recognizedText+" not found";
	//alert('5');
}

}
	
if(memberSearchRequired=="YES" && recognizedText!=null)
	{
	//alert('1'+recognizedText);
	var member= getMemberDetails(recognizedText);
	//alert("member::"+member);
	if(member!=null && member !== undefined){
		//alert('2');
	var memberList=member.split(",");
	//alert('provList'+provList);
	memberName=memberList[0];
	memberCity=memberList[1];
	memberAddress_1=memberList[2];
	memberState=memberList[3];
	memberZip=memberList[4];
	memberSearchRequired=null;
	//alert('3'+recognizedText);
	} else{
		//alert('4');
		recognizedText=recognizedText+" id not found";
	}
	//false prov Ajay and $3000 and 123 peachtree st Atlanta GA 30330 and Dr. Ajay
	}
if(claimTypeValidation=="YES" && recognizedText!=null)
	{
if(recognizedText.includes("Medical"))
	{
	claimTypeValidation=null;
	claimType=recognizedText;
	} else
		{
		recognizedText=recognizedText+" claimtype not found";
		}
  }
if(typeOfServiceValidation=="YES" && recognizedText!=null)
	{
	if(recognizedText.includes("angiography"))
	{
		typeOfServiceValidation=null;
	serviceType="Angiography";
	
	} else
		{
		recognizedText=recognizedText+" selectedservice not found";
		}
	}

if(deviationValidation=="YES" && recognizedText!=null)
{
if(recognizedText.includes("dispute") || recognizedText.includes("submit a claim"))
{
	deviationValidation=null;
} else
	{
	recognizedText=recognizedText+" deviation not found";
	}
}

if(claimSubmissionValidation=="YES" && recognizedText!=null)
{
if(recognizedText.includes("yes") || recognizedText.includes("YES"))
{
	claimSubmissionValidation=null;
} else
	{
	recognizedText=recognizedText+" seletedsubmission not found";
	}
}
if(stopTransaction=="YES")
	{
	if(recognizedText=="hi" || recognizedText=="Hi" || recognizedText=="Hello")
		{
		stopTransaction=null;
		} else{
			recognizedText=recognizedText+" endcovflow not found";
		}
	}

if(recognizedText.includes("dispute"))
	{
	var ticket="T"+Math.floor((Math.random() * 1000) + 1);
	recognizedText=recognizedText+" "+ticket;
	}
if(recognizedText.includes("yes") || recognizedText.includes("Yes"))
{
var ticket="C"+Math.floor((Math.random() * 1000) + 1);
recognizedText=recognizedText+" "+ticket;
}
//alert('before handleRecognizeText'+recognizedText);
    handleRecognizeText(recognizedText);
  //alert('7'+recognizedText);
    
   
   /* console.log("onresult | recognizedText: ", recognizedText);
    
    claim.clientName = recognizedText;
     console.log("onresult | claim Object: ", claim);
    addUserItem(recognizedText);
    ga('send', 'event', 'Message', 'add', 'user');

    let promise = apiClient.textRequest(recognizedText);

    promise
        .then(handleResponse)
        .catch(handleError);*/

function handleRecognizeText(recognizedText)
{
	//alert('inside handleRecognizeText'+recognizedText);
	 claim.clientName = recognizedText;	 
     console.log("onresult | claim Object: ", claim);
    addUserItem(recognizedText);
    ga('send', 'event', 'Message', 'add', 'user');

    let promise = apiClient.textRequest(recognizedText);

    promise
        .then(handleResponse)
        .catch(handleError);
}
    
    function handleResponse(serverResponse) {

    	 
      // Set a timer just in case. so if there was an error speaking or whatever, there will at least be a prompt to continue
      var timer = window.setTimeout(function() { startListening(); }, 5000);

      const speech = serverResponse["result"]["fulfillment"]["speech"];
      var msg = new SpeechSynthesisUtterance(speech);
     // alert(speech);
     
      
      console.log("handleResponse | serverResponse: ", speech);
      addBotItem(speech);
      ga('send', 'event', 'Message', 'add', 'bot');
      
      //alert('1'+speech);
     /* alert('2::'+speech.includes("Welcome! I am Helfer the Voice BotWelcome! I am Helfer the Voice Bot. To get started say 'File a Claim'"));
      alert('3::'+speech.includes("Welcome! I am Helfer the Voice BotWelcome! I am Helfer the Voice Bot."));
      alert('3::'+speech.includes("Welcome"));*/
      
      if(speech.includes("To get started say"))
	  {
    	 // alert('2 inside welcome::'+speech);
    	  //addBotItem("inside first bot message::"+speech);
    	  claimValidation="YES";
	  }
      //
      if(speech.includes("Please select the following options for the type of claim"))
	  {
    	 // alert('2 inside welcome::'+speech);
    	  //addBotItem("inside first bot message::"+speech);
    	  claimTypeValidation="YES";
	  }
      if(speech.includes("We found some anomaly in the claim amount submitted"))
	  {
    	  //alert('2 inside welcome::'+speech);
    	  //addBotItem("inside first bot message::"+speech);
    	  deviationValidation="YES";
	  }
      //Please confirm whether the claim needs to be submitted
      if(speech.includes("Please confirm whether the claim needs to be submitted"))
	  {
    	  //alert('2 inside welcome::'+speech);
    	  //addBotItem("inside first bot message::"+speech);
    	  claimSubmissionValidation="YES";
	  }
      if(speech=="Please provide the type of service Availed by the member")
	  {
    	  //alert('2 inside welcome::'+speech);
    	  //addBotItem("inside first bot message::"+speech);
    	  typeOfServiceValidation="YES";
	  }
      //Please provide the type of service Availed by the member
      if(speech.includes("May i Know the Member ID for whom Claim is raised") || speech.includes("Member id not found Please provide another member ID"))
    	  {
    	  memberSearchRequired="YES";
    	  }
      
      if(speech.includes("Please provide the provider ID") || speech.includes("Provider ID not found Please provide another provider ID"))
	  {
    	 // alert('8'+speech);
	  providerSearchRequired="YES";
	  }
      
      if(speech=="Please provide the claim amount")
	  {
    	  //alert('2 inside welcome::'+speech);
    	  //addBotItem("inside first bot message::"+speech);
    	  claimAmountValidation="YES";
	  }
      
      if(speech.includes("Investigative Case Management System") || speech.includes("Your claim has been submitted"))
    	  {
    	  stopTransaction="YES";
    	  }
      
      if(speech.includes("Please Standby as we analyze your claims"))
		{
  	  //alert('hi');
  	  var response=callREST(city,claimAmount,claimType,serviceType);
  	  //alert('response::'+response);
  	 var responseReceived=response.split(",");
  	//alert('responseReceived::'+responseReceived[0]);
  	//alert('provId::'+providerId);
  	if(providerId!=null && responseReceived[0]=="false")
  			{
  		//alert('inside false::'+providerId+", "+responseReceived[0]);
  		//handleRecognizeText("false Roma and "+providerName+" and "+claimAmount+" and "+practiceAddress);
  		if(claimAmount.includes(","))
  			{
  			claimAmount=claimAmount.replace(",","");
  			}
  		handleRecognizeText("false prov "+memberName+" and "+claimAmount+" and "+practiceAddress+" and "+providerName);
  		//P1258 false mName and provName and claimAmount and address
  		//handleRecognizeText("P1258 "+responseReceived[0]);
  	  console.log("providerId::"+providerId);
  			} else if(providerId!=null && responseReceived[1] !="0" && responseReceived[0]=="true")
  				{
  			  console.log("inside true::"+providerId+", "+responseReceived[0]+","+responseReceived[1]);
  				//alert('inside true::'+providerId+", "+responseReceived[0]+","+responseReceived[1]);
  				if(city=="Atlanta")
  	  			{
  	  			claimAmount="$3500";
  	  			} else if(city=="Miami")
  	  				{
  	  			claimAmount="$4500";
  	  				} else if(city=="Charlotte")
  	  					{
  	  				claimAmount="$5000";
  	  					}
  				//handleRecognizeText("P1258 "+responseReceived[0]+" deviation is "+responseReceived[1]);
  				handleRecognizeText("true prov "+city+" and "+claimAmount+" and "+responseReceived[1]);
  				}
  	
  	
		}
      if(speech.includes("false"))
    	  {
    	  if(claimAmount.includes(","))
			{
			claimAmount=claimAmount.replace(",","");
			}
		handleRecognizeText("false prov Ajay and "+claimAmount+" and "+practiceAddress+" and "+providerName);
    	  
    	  }
      
      msg.addEventListener("end", function(ev) {
        window.clearTimeout(timer);
        startListening();
      });
      msg.addEventListener("error", function(ev) {
        window.clearTimeout(timer);
        startListening();
      });

      window.speechSynthesis.speak(msg);
    }
    function handleError(serverError) {
      console.log("Error from api.ai server: ", serverError);
    }
  };

  recognition.onerror = function(ev) {
    console.log("Speech recognition error", ev);
  };
  recognition.onend = function() {
    gotoReadyState();
  };

  function startListening() {
    gotoListeningState();
    recognition.start();
  }

  const startButton = document.querySelector("#start");
  startButton.addEventListener("click", function(ev) {
    ga('send', 'event', 'Button', 'click');
    startListening();
    ev.preventDefault();
  });

  // Esc key handler - cancel listening if pressed
  // http://stackoverflow.com/questions/3369593/how-to-detect-escape-key-press-with-javascript-or-jquery
  document.addEventListener("keydown", function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key == "Escape" || evt.key == "Esc");
    } else {
        isEscape = (evt.keyCode == 27);
    }
    if (isEscape) {
        recognition.abort();
    }
  });


});
