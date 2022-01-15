const User=require("../models/user")
const bcrypt=require("bcrypt")


module.exports.home=(req,res)=>{
    return res.render('home',{title:"Home || Upload X"}) 
}
exports.signin=(req,res)=>{
    return res.render('sign-in ',{title:"Sign-in || Upload X"})
}

exports.signup=(req,res)=>{
    return res.render('sign-up',{title:"Signup || Upload X"})
}
exports.create =async function(req, res){
    console.log(req.body)
 
    try{
      if(req.body.password!=req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
      }
      else{
          
        const newUser = new User({
            name:req.body.name,
            email: req.body.email,
            password:req.body.password,
          });
          bcrypt.genSalt(10,(err,salt)=>{
             bcrypt.hash(newUser.password,salt,(err,hash)=>{
                 if(err) throw err
                 newUser.password=hash
                 newUser.save().then(user=>{
                     req.flash('success',"Registered")
                     res.redirect('sign-in')
                 })
             })
          })
    
         
      }
      }
      catch(err){
          
      console.log("error")
  }
      
    
}
    

// Sign-in Functionality
exports.createSession =  function(req, res){
    console.log(req.body)
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
   
}
exports.signout=(req,res)=>{
    req.logout()
}
