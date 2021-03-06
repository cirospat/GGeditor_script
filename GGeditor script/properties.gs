/* persistent data */
function getUserProperties(){
  //Caution: user properties always key = JSON encoded object
  // before 2017/1/4
  //   var keys = ['githubBindings','githubCredentials']
  // after 2017/1/4
  //   var keys = ['githubBindings','credentialsArray']
  //   resetProperties()
  // after 2018/1/23
  //   githubBindings no more used, will use document property to store githubBinding
  //   because githubBindings too big to save in user property
  //
  var properties = PropertiesService.getUserProperties().getProperties()
  var doc = DocumentApp.getActiveDocument()
  var obj = {
    doc:{
      id: doc.getId(),
      name: doc.getName()
    }
  }
  for (var key in properties){
    obj[key] = JSON.parse(properties[key]) 
  }
  //setup initial value
  
  /* handle githubBinding starts */
  var githubBinding
  if (obj['githubBindings']) {
    githubBinding = obj['githubBindings'][obj.doc.id]
    delete obj['githubBindings']
  }
  
  docProp = PropertiesService.getDocumentProperties()
  var key = 'githubBinding'
  if (githubBinding){
    // save githubBinding from user-property to doc-property
    docProp.setProperty(key,JSON.stringify(githubBinding))
    setUserProperty('githubBindings',null,obj.doc.id)
  }
  else{
    docProp = PropertiesService.getDocumentProperties()
    githubBinding = docProp.getProperty(key)
    if (githubBinding) {
      githubBinding = JSON.parse(githubBinding)
    }
    else {
      githubBinding = {}
    }
  }
  
  obj[key] = githubBinding
  /* handle githubBinding ended */
  
  // convert single credential to multiple credentials
  if (obj['credentialsArray']){
    //already upgraded
  }
  else{
    obj['credentialsArray'] = []
    if (obj['githubCredentials']) {
      if (obj['githubCredentials'].username){
        obj['credentialsArray'].push(obj['githubCredentials'])
      }
    }
  }
  /*
  else{
    // productive mode
    obj['credentialsArray'] = []
    if (obj['githubCredentials']) {
      if (obj['githubCredentials'].username){
        obj['credentialsArray'].push(obj['githubCredentials'])
      }
      setUserProperty('githubCredentials',null)
    }
    setCredentialsArray(obj['credentialsArray'])
  }
  */
  var docPreferences
  if (obj['docPreferences']){
    docPreferences = obj['docPreferences'][obj.doc.id]
    delete obj['docPreferences']
  }
  if (!docPreferences){
    docPreferences = {
      htmlTable: false
    }
  }
  obj.doc.preferences = docPreferences
  
  return obj
}
function dumpUserProperty(){
   var userProp = PropertiesService.getUserProperties()
   Logger.log(userProp.getProperties())
}
function setUserProperty(key,obj,subkey){
   var userProp = PropertiesService.getUserProperties()
   var deleteAllOthers = false
   if (subkey){
     var value = userProp.getProperty(key)
     value = value ? JSON.parse(value) : null;
     // case of bindings
     if (obj){
       if (!value) value = {}
       value[subkey] = obj
     }
     else{
       if (value) delete value[subkey]
     }
     userProp.setProperty(key,JSON.stringify(value))
   }
   else{
     // case of credential
     if (obj){
       userProp.setProperty(key, JSON.stringify(obj))
     }
     else{
       userProp.deleteProperty(key)
     }
   }
}
function setGithubCredentials(githubCredentials){
  if (githubCredentials && githubCredentials.username){
    setUserProperty('githubCredentials',githubCredentials)
  }
  else {
    setUserProperty('githubCredentials',null)
  }
}
function setCredentialsArray(credentialsArray){
  setUserProperty('credentialsArray',credentialsArray)
}
function setDocPreferences(docPreferences){
  return setUserProperty('docPreferences',docPreferences,DocumentApp.getActiveDocument().getId())
}
function resetGithubBinding(){
  var docId = DocumentApp.getActiveDocument().getId()
  setUserProperty('docPreferences',null,docId)
  setUserProperty('githubBindings',null,docId)
  var key = 'githubBinding'
  PropertiesService.getDocumentProperties().deleteProperty(key)
  return true
}
function resetProperties(){
  PropertiesService.getDocumentProperties().deleteAllProperties()
  PropertiesService.getUserProperties().deleteAllProperties()
}
function setGithubBinding(githubBinding){
  var obj = githubBinding
  var key = 'githubBinding'
  var docProp = PropertiesService.getDocumentProperties()
  docProp.setProperty(key, JSON.stringify(obj))
}


/* obsoleted
function setGithubBinding(githubBinding){
  return setUserProperty('githubBindings',githubBinding,DocumentApp.getActiveDocument().getId())
}
function testSetProperties(){
  var githubBinding = {
    name:"DocStructure.rst",
    path:"docs",
    repo:"GGeditor",
    repoUrl:"https://api.github.com/repos/iapyeh/GGeditor"  
  }
  setGithubBinding(githubBinding)
}
*/
