class Text_Format{
    static HTML = new Text_Format("HTML");
    static Plain = new Text_Format("Plain Text");
    
    constructor(name){
        this.name = name;
    }
}

const Office_Attributes = {
    format : Text_Format.Plain
    , username : "Sean Brady"
    , useremail : "sean.brady.9@us.af.mil"
    , curBody : "Test 2 String"
}





const header_HTML = "<p><b>CUI</b></p><br>";
const header_TEXT = "CUI \n\n";

const CUI_HTML = {
    header : header_HTML
    , signature : "<p><b>Controlled by: <br>Controlled by: <br>CUI Category: <br>Distribution/Dissemination Controls: <br>POC: </p><br><p>CUI</p></b>"

}

const CUI_TEXT = {
    header : header_TEXT
    , signature : "\n\n Controlled by: \n Controlled by: \n CUI Category: \n Distribution/Dissemination Controls: \n POC: \n\n CUI"
}

const PII_HTML = {
    header : header_HTML
    , signature : "<b><p>Controlled by: <br>Controlled by: <br>CUI Category: <br>Distribution/Dissemination Controls: <br>POC: </p><p><center>This e-mail contains Controlled Unclassified Information (CUI) information which must be protected under \
    the Freedom of Information Act (5 U.S.C. 552) and/or the Privacy Act of 1974 (5 U.S.C. 552a). Unauthorized disclosure \
    or misuse of this PERSONAL INFORMATION may result in disciplinary action, criminal and/or civil penalties. Further \
    distribution is prohibited without the approval of the author of this message unless the recipient has a need to know \
    in the performance of official duties. If you have received this message in error, please notify the sender and delete all \
    copies of this message.</center></p><p></p><br><p>CUI</p></b>"
}

const PII_TEXT = {
    header : header_TEXT
    , signature : "\n\n Controlled by: \n Controlled by: \n CUI Category: \n Distribution/Dissemination Controls: \n POC: \n\n \
    This e-mail contains Controlled Unclassified Information (CUI) information which must be protected under \
    the Freedom of Information Act (5 U.S.C. 552) and/or the Privacy Act of 1974 (5 U.S.C. 552a). Unauthorized disclosure \
    or misuse of this PERSONAL INFORMATION may result in disciplinary action, criminal and/or civil penalties. Further \
    distribution is prohibited without the approval of the author of this message unless the recipient has a need to know \
    in the performance of official duties. If you have received this message in error, please notify the sender and delete all \
    copies of this message. \n\n CUI"
}

function PII(){
    alert("Helloworld");2
}


function buildCUIMarkings() { // this function is attached to the hello world button in the taskpane
    
    let state = Office_Attributes;
    let dataValue = "Test 2 String";
    /*var dataValue = result.value; // Get selected data.
    console.log('Selected data is ' + dataValue);
    */

    
        
    //addTextToBody(dataValue, newheader, newsig);
    //addTextToSubject();
    let email = buildMarking(state,dataValue);
    document.write(
        "<!DOCTYPE html>" +
        "<html>" +
            "<head> <h1> Company Registration Form</h1></head>" +
            "<body>" +
            "<form>" +
            "<table>"+
                "<tr> <td> Email Address: </td> <td> <input type=”text” email=””> </td> </tr>" +
                "<tr> <td> Password: </td> <td> <input type=”Password” name=””> </td> </tr>" +
            "</table></form>" +
            "<button class=\"btn\", id=\"piiButton\", onclick=\"PII()\"><strong>Add PII Markings</strong></button>" +
            "</body>" +
        "</html>"
    );    
}

function buildMarking(state,defaultValue){
    let userSig;
    let staticMarkings;
    if(state.format === Text_Format.HTML){
        
        userSig += "<table>";
        userSig += "<tr>";
        userSig += "<td style='padding-left: 5px;'>";
        userSig += "//SIGNED//<br/>";
        userSig += "<strong>" + state.username + "</strong>";
        userSig += "<br/>";
        userSig += "Title: <br/>";
        userSig += "Email: " + state.useremail + "<br/>";
        userSig += "Phone: <br/>";
        userSig += "</td>";
        userSig += "</tr>";
        userSig += "</table>";

        staticMarkings = CUI_HTML;

    }
    else if(state.format === Text_Format.Plain){
        userSig = "\n //Signed// \n " + state.username + " \n Email: " + state.useremail;
        staticMarkings = CUI_TEXT;
    } else {
        //throw error 
    }

    return staticMarkings.header + defaultValue + userSig + staticMarkings.signature;
    

}




function addTextToBody(msgType, newheader, newsig) {

    //Get some User Data to setup new Signature
    var UserName = Office.context.mailbox.userProfile.displayName;
    var UserEmail = Office.context.mailbox.userProfile.emailAddress;

    //Setup the newSignature
    var str = "";
    str += "<table>";
    str += "<tr>";
    str += "<td style='padding-left: 5px;'>";
    str += "//SIGNED//<br/>";
    str += "<strong>" + UserName + "</strong>";
    str += "<br/>";
    str += "Title: <br/>";
    str += "Email: " + UserEmail + "<br/>";
    str += "Phone: <br/>";
    str += "</td>";
    str += "</tr>";
    str += "</table>";
    
    
    //Create new Signature for User
    var htmlSigHeader = str;
    var textSigHeader = "\n //Signed// \n " + UserName + " \n Email: " + UserEmail;
    
    
    if (msgType === Office.MailboxEnums.BodyType.Html) {
        newsig = htmlSigHeader + newsig;
        msgType = "html";
    }
    else {
        newsig = textSigHeader + newsig;
        msgType = "text"
    };

    //Debug
    console.log("This is right before setSignatureAsync is called");

    //SET SIGNATURE or Footer
    try {
        Office.context.mailbox.item.body.setSignatureAsync(
            newsig,
            {
                coercionType: msgType,
                asyncContext: "setSignature"
            },
            //Debug
            setCallback
        );
        
        //SET Header
        Office.context.mailbox.item.body.prependAsync(
            newheader,
            {
                coercionType: msgType,
                asyncContext: "prepend Body"
            },
            //Debug
            setCallback
        );
    }
    catch (err) {
        //If setSignatureAsync is not supported change the body of the message
        //or just add everything to the top and have user copy & paste

        console.log(err.message);
    
        //Set Body of Message instead of Header and Footer
        Office.context.mailbox.item.body.getAsync(
            msgType,
            function (oldBody) {
                Office.context.mailbox.item.body.setAsync(
                    newheader + oldBody.value + newsig,
                    {
                        coercionType: msgType,
                        asyncContext: "Body"
                    },
                    //Debug
                    setCallback
                )
            }
        );
    };
};




// Gets the subject of the item and adds (U) in front of it.
function addTextToSubject() {
    //var subject = Office.context.mailbox.item.subject;

    Office.context.mailbox.item.subject.getAsync(
        function (asyncResult) {
            //Debug
            console.log(asyncResult.value + " Subject was found");
            //Set the Subject
            Office.context.mailbox.item.subject.setAsync(
                "(U) " + asyncResult.value,
                { asyncContext: "Subject"},
                //Debug
                setCallback
            );
        }
    );
    //Calls addInternetHeader Function Next
    addInternetHeader();
    
};

function addInternetHeader() {
    try{
        Office.context.mailbox.item.internetHeaders.setAsync(
        { "x-preferred-fruit": "orange"},
        setCallback
        );
        //Calls killEvent Next
        killCUI();
    }
    catch (err) {
        console.log("Internet Header =" + err.message);
        //Calls killEvent Next
        killCUI();
    }

};

function killCUI(){
    console.log("Finished Marking Command");
};



function buildPIIMarkings() { // this function is attached to the hello world button in the taskpane
    Office.context.mailbox.item.body.setAsync( //adds hello world to email
        "This should build PII markings",
        {
            coercionType: "html", // Write text as HTML
        },

        // Callback method to check that setAsync succeeded
        function (asyncResult) {
            if (asyncResult.status ==
                Office.AsyncResultStatus.Failed) {
                write(asyncResult.error.message);
            }
        }
    );
}

//Debug Success/Error Handler
function setCallback() {
    if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
    console.log("Successfully set Async on " + asyncResult.asyncContext);
    } else {
    console.log("Error setting " + asyncResult.asyncContext + ": " + JSON.stringify(asyncResult.error));
    }
};